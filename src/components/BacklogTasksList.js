import './backlog-tasks-list.css'
import { useEffect, useState } from 'react'
import AddBacklogTask from './AddBacklogTask'
import DroppableBacklogTasksList from "./DroppableBacklogTasksList"
import CreateSprint from './CreateSprint'
import EditSprint from './EditSprint'
import ActiveSprintColumns from './ActiveSprintColumns'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Toast from 'react-bootstrap/Toast'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Api from '../utils/api'
import { DragDropContext } from 'react-beautiful-dnd'

const BacklogTasksList = ({ backlog }) => {
  const [sprints, setSprints] = useState(null)
  const [sprintTasks, setSprintTasks] = useState([])
  const [backlogTasks, setBacklogTasks] = useState([])
  const [error, setError] = useState(null)

  useEffect(function() {    
    if(backlog?.id) {
      requestSprints(backlog.id)
      requestBacklogTasks(backlog.id)
    }
  }, [backlog])

  useEffect(function() {
    if(backlog?.id && sprints != null && sprints.length > 0) {
      let sprintId = sprints[0].id
      requestSprintTasks(backlog.id, sprintId)
    }
  }, [sprints])

  useEffect(function() {
    if(error) {
      const timer = setTimeout(() => setError(null), 4000)
      return () => clearTimeout(timer)
    }
  }, [error])

  async function requestSprints(backlogId) {
    Api.get(`/backlogs/${backlogId}/sprints`)
      .then(data => setSprints(data))
      .catch(() => {})
  }

  async function requestBacklogTasks(backlogId) {
    Api.get(`/backlogs/${backlogId}/tasks?search=activeSprintId:NULL AND parentTaskId:NULL`)
      .then(data => setBacklogTasks(data))
      .catch(() => {})
  }

  async function requestSprintTasks(backlogId, sprintId) {
    Api.get(`/backlogs/${backlogId}/tasks?search=activeSprintId:${sprintId}`)
      .then(data => setSprintTasks(data))
      .catch(() => {})
  }

  function onBacklogDataTouched() {
    requestBacklogTasks(backlog.id)
  }

  function onSprintDataTouched() {
    requestSprintTasks(backlog.id, sprints[0].id)
  }

  function onSprintsTouched() {
    requestSprints(backlog.id)
  }

  function toggleToast() {
    setError(null)
  }

  function newTasksListOrdered(tasks, taskId, sourceIndex, destinationIndex) {
    const movedTask = tasks.find(t => t.id == taskId)
    const newTasks = Array.from(tasks)
    newTasks.splice(sourceIndex, 1)
    newTasks.splice(destinationIndex, 0, movedTask)
    return newTasks
  }


  function resolveDestinationRank(source, destination) {
    let rank = destination.index
    if(destination.droppableId.startsWith("backlog-tasks")) {
      if(backlogTasks.length > 0) {
        rank+= backlogTasks[0].rank
      } else if (sprintTasks.length > 0) {
        rank+= sprintTasks[sprintTasks.length - 1].rank + 1
      }
      if(source.droppableId !== destination.droppableId
        && source.droppableId.startsWith("sprint-tasks-")) {
        rank--
      }
    } else if (destination.droppableId.startsWith("sprint-tasks-")) {
      if(sprintTasks.length > 0) {
        rank+= sprintTasks[0].rank
      } else {
        rank++
      }
    }
    return rank
  }

  function beautifulOnDragEnd(result) {
    const { destination, source, draggableId } = result;
    if(!destination) {
      return;
    }
    if(destination.droppableId === source.droppableId &&
      destination.index === source.index) {
      return;
    }

    const draggedTaskId = draggableId.split('-')[2]
    const rank = resolveDestinationRank(source, destination)
    if(source.droppableId === destination.droppableId) {
      // Just re-order.
      // Optimistically save new order in local state
      if(source.droppableId.startsWith("backlog-tasks")) {
        const newTasks = newTasksListOrdered(backlogTasks, draggedTaskId, source.index, destination.index)
        setBacklogTasks(newTasks)         
      } else if (source.droppableId.startsWith("sprint-tasks-")) {
        const newTasks = newTasksListOrdered(sprintTasks, draggedTaskId, source.index, destination.index)
        setSprintTasks(newTasks)
      }
      // Update to server
      updateTask(draggedTaskId, { rank: rank }) 

    } else if(destination.droppableId.startsWith('sprint-tasks-') 
      && source.droppableId.startsWith('backlog-tasks')) {        
        // Add to sprint

        // In local state
        const movedTask = backlogTasks.find(t => t.id == draggedTaskId)
        const newBacklogTasks = Array.from(backlogTasks)
        newBacklogTasks.splice(source.index, 1)
        setBacklogTasks(newBacklogTasks)

        const newSprintTasks = Array.from(sprintTasks)
        newSprintTasks.splice(destination.index, 0, movedTask)
        setSprintTasks(newSprintTasks)
        
        // Update to server
        const sprintId = destination.droppableId.split('-')[2]
        updateTask(draggedTaskId, { activeSprint: sprintId, rank: rank })

    } else if(destination.droppableId.startsWith('backlog-tasks')
      && source.droppableId.startsWith('sprint-tasks-')) {
        // Remove from sprint

        // In local state
        const movedTask = sprintTasks.find(t => t.id == draggedTaskId)        
        const newSprintTasks = Array.from(sprintTasks)
        newSprintTasks.splice(source.index, 1)
        setSprintTasks(newSprintTasks)

        const newBacklogTasks = Array.from(backlogTasks)
        newBacklogTasks.splice(destination.index, 0, movedTask)
        setBacklogTasks(newBacklogTasks)

        // Update to server        
        updateTask(draggedTaskId, { activeSprint: null, rank: rank })        
    }
    // Move from sprint to another sprint not supported
  }
  
  function updateTask(taskId, changes) {
    Api.patch(`/tasks/${taskId}`, changes)
    .then(data => {
    })
    .catch(error => {
      setError(error?.details?.message || 'Unknown error')
    })
    .finally(() => {
      // refresh data
      onBacklogDataTouched()
      onSprintDataTouched()
    })
  }

  function onStatusChange(taskId, newStatus) {
    // Update in local to ensure smooth drag & drop
    const newList = Array.from(sprintTasks)    
    const updatedTask = newList.find(t => t.id == taskId)
    updatedTask.status = newStatus
    setSprintTasks(newList)
    
    // Save to server
    updateTask(taskId, {status: newStatus})
  }

  if(!backlog || !backlogTasks || !sprints) {
    return null
  }

  var firstSprint = sprints != null && sprints.length > 0 ? sprints[0] : null

  const backlogView = (
    <DragDropContext onDragEnd={beautifulOnDragEnd}>
      {
        firstSprint
          ? (
            <div>
              <Row>
                <Col>
                  <h4>{firstSprint.name}</h4>
                  <p>{new Date(firstSprint.startDate).toLocaleDateString()} - {new Date(firstSprint.endDate).toLocaleDateString()}</p>
                </Col>
                <Col xs="auto">
                  <EditSprint sprint={firstSprint} backlogId={backlog.id} onDataTouched={onSprintsTouched} />
                </Col>
              </Row>
              <DroppableBacklogTasksList listId={`sprint-tasks-${firstSprint.id}`} tasks={sprintTasks} onDataTouched={onSprintDataTouched} />                
            </div>
        )
        : null
      }      
      <AddBacklogTask backlogId={backlog.id} onDataTouched={onBacklogDataTouched} />
      <CreateSprint backlogId={backlog.id} onDataTouched={onSprintsTouched} />
      <DroppableBacklogTasksList listId="backlog-tasks" tasks={backlogTasks} onDataTouched={onBacklogDataTouched}/>
    </DragDropContext>
  )

  const activeSprintView = (
      <ActiveSprintColumns sprint={firstSprint} tasks={sprintTasks} onDataTouched={onSprintDataTouched} onStatusChange={onStatusChange} />
  )

  return (
    <div>
      <Tabs defaultActiveKey="backlogView" transition={false}>
        <Tab eventKey="backlogView" title="Backlog">
          <div className="backlog-tasks-list__tab">
            {backlogView}
          </div>          
        </Tab>
        <Tab eventKey="activeSprintView" title="Active Sprint">
          <div className="backlog-tasks-list__tab">
            {activeSprintView}
          </div>          
        </Tab>
      </Tabs>
      {
        error
          ? (
            <div aria-live="polite" style={{position:'fixed', bottom: '30px', right: '30px', zIndex: 5}}>
              <Toast onClose={toggleToast} delay={4000} autohide className="bg-danger text-white" animation={false}>
                <Toast.Header><span className="mr-auto">Error editing tasks</span></Toast.Header>
                <Toast.Body>{error}</Toast.Body>
              </Toast>
            </div>
          )
          : null
      }           
    </div>
  )
}

export default BacklogTasksList