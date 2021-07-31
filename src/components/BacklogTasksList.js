import './backlog-tasks-list.css'
import { useEffect, useState } from 'react'
import AddBacklogTask from './AddBacklogTask'
import BacklogTaskItem from "./BacklogTaskItem"
import CreateSprint from './CreateSprint'
import Api from '../utils/api'

const BacklogTasksList = ({ backlog }) => {
  const [sprints, setSprints] = useState(null)
  const [sprintTasks, setSprintTasks] = useState([])
  const [backlogTasks, setBacklogTasks] = useState([])

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

  function onDataTouched() {
    requestBacklogTasks(backlog.id)
  }

  function onSprintDataTouched() {
    requestSprintTasks(backlog.id, sprints[0].id)
  }

  function onSprintsTouched() {
    requestSprints()
  }

  if(!backlog || !backlogTasks || !sprints) {
    return null
  }

  var firstSprint = sprints != null && sprints.length > 0 ? sprints[0] : null
  return (
    <div>
      {
        firstSprint
          ? (
            <div>
              <h4>Sprint {firstSprint.name}</h4>
              <div className="backlog-tasks-list__sprint-tasks">
                {
                  sprintTasks && sprintTasks.length > 0
                    ? sprintTasks.map(task => (
                      <BacklogTaskItem key={task.id} task={task} onDataTouched={onSprintDataTouched} totalCount={sprintTasks.length} />
                    ))
                    : null
                }
              </div>
            </div>
          )
          : null
      }
      <AddBacklogTask backlogId={backlog.id} onDataTouched={onDataTouched} />
      <CreateSprint backlogId={backlog.id} onDataTouched={onSprintsTouched} />
      <div className="backlog-tasks-list__backlog-tasks">
        { 
          backlogTasks.length == 0
            ? (<p>You don't have any tasks yet.</p>)
            : backlogTasks.map(task => (
                <BacklogTaskItem key={task.id} task={task} onDataTouched={onDataTouched} totalCount={backlogTasks.length} />
              ))
        }
      </div>
    </div>
  )
}

export default BacklogTasksList