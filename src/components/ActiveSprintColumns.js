import './active-sprint-columns.css'
import ColumnTaskItem from "./ColumnTaskItem"
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const possibleStatus = ["CREATED", "TODO", "INPROGRESS", "TESTED", "DONE", "DELETED"]

function initColumns(tasks) {
  var columns = {}
  possibleStatus.forEach(status => {
    columns[status] = { tasks: [] }
  })
  tasks.forEach(task => {
    if(columns[task.status]) {
      columns[task.status].tasks.push(task)
    }    
  })
  return columns
}
const ActiveSprintColumns = ({ sprint, tasks, onDataTouched, onStatusChange }) => {

  const columns = initColumns(tasks)

  function beautifulOnDragEnd(result) {
    const { destination, source, draggableId } = result;
    if(!destination) {
      return;
    }
    if(destination.droppableId === source.droppableId &&
      destination.index === source.index) {
      return;
    }
    
    if(source.droppableId === destination.droppableId) {
      // Ignore sorting
      return;
    }

    const draggedTaskId = draggableId.split('-')[2]
    onStatusChange(draggedTaskId, destination.droppableId)
  }
  
  if(!sprint || sprint.status !== 'ACTIVE') {
    return <p>There is no active sprint.</p>
  }

  return (    
    <div className="active-sprint-columns">
      <h4>{sprint.name}</h4>
      <p>{new Date(sprint.startDate).toLocaleDateString()} - {new Date(sprint.endDate).toLocaleDateString()}</p>
      <div className="active-sprint-columns__columns">
        <DragDropContext onDragEnd={beautifulOnDragEnd}>
        {
          Object.keys(columns).map(columnKey => (
            <div key={columnKey} className="active-sprint-columns__column">
              <h5 className="active-sprint-columns__title">{columnKey}</h5>
              <Droppable droppableId={columnKey}>
                {
                  (provided, snapshot) => (
                    <div ref={provided.innerRef}
                      className={`active-sprint-columns__list
                                ${snapshot.isDraggingOver ? 'active-sprint-columns__list--drag-over' : null }`}
                      {...provided.droppableProps} >
                      {
                        columns[columnKey].tasks.map((task, index) => {
                          return (
                            <Draggable draggableId={`column-task-${task.id}`} index={index} key={task.id}>
                              {
                                (provided) => (
                                  <div ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}>
                                    <ColumnTaskItem key={task.id} task={task} />
                                  </div>
                                )
                              }
                            </Draggable>
                            
                          )
                        })              
                      }
                      {provided.placeholder}
                    </div>
                  )
                }
              </Droppable>
            </div>
          ))
        }
        </DragDropContext>
      </div>      
    </div>
  )
}

export default ActiveSprintColumns