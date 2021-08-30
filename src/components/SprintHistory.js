import { useEffect, useReducer } from 'react'
import Api from '../utils/api'
import BacklogTaskItem from './BacklogTaskItem'
import SprintStatus from './SprintStatus'
import SprintTimeline from './SprintTimeline';

function init(sprint) {
  return { sprintId: sprint.id, expanded: false, tasks: null, changes: null }
}

function reducer(state, action) {
  switch(action.type) {
    case 'toggleSprint':
      return {...state, expanded: !state.expanded}
    case 'fetchedSprintTasks':
      return {...state, tasks: action.payload.data}
    case 'fetchedSprintChanges':
      return {...state, changes: action.payload.data}
    case 'sprintChange':
      if(action.payload.sprint && action.payload.sprint.id !== state.sprintId) {
        return init(action.payload.sprint)
      }
      return state
    default:
      throw new Error();
  }
}

const SprintHistory = ({backlogId, sprint}) => {
  const [state, dispatch] = useReducer(reducer, sprint, init)

  useEffect(function() {
    dispatch({ type: 'sprintChange', payload: { sprint: sprint }})
  }, [sprint])

  function toggleCollapse() {
    dispatch({ type: 'toggleSprint'})
    if(!state.tasks && !state.changes) {
      requestSprintData()
    }
  }

  function requestSprintData() {
    requestTasks(sprint.id)
    requestSprintChanges(sprint.id)
  }

  function requestTasks(sprintId) {
    Api.get(`/backlogs/${backlogId}/tasks?search=activeSprintId:${sprintId}`)
      .then(data => { 
        dispatch( { type: 'fetchedSprintTasks', payload: { sprintId: sprintId, data: data }})
      })
      .catch(error => {})
  }
  
  function requestSprintChanges(sprintId) {
    Api.get(`/sprints/${sprintId}/history`)
      .then(data => { 
        for(var i = 0; i< data.length; i++) {
          var change = data[i]
          if(change.task) {
            if(Number.isInteger(change.task)) {
              var taskId = change.task
              var changeWithTask = data.find(c => c.task instanceof Object && c.task.id == taskId)
              change.task = changeWithTask.task
            } 
          }
        }
        dispatch( { type: 'fetchedSprintChanges', payload: { sprintId: sprintId, data: data }})
      })
      .catch(error => {})
  }

  function handleToggleClick(e) {
    toggleCollapse()
  }

  function handleToggleKeyDown(e) {
    if(e.key === 'Enter' || e.key === ' ') {
      toggleCollapse()
    }
  }

  const collapseId = `sprints-history-collapse-${sprint.id}`
  return (
    <div className="sprint-history">
      <div className="sprint-history__toggle" tabIndex="0"
          onClick={handleToggleClick} onKeyDown={handleToggleKeyDown}
          aria-expanded={state.expanded} aria-controls={collapseId}>
          <span className="sprint-history__toggle-icon">{state.expanded ? 'v' : '>'}</span>
          <h5 className="sprint-history__toggle-title">
            {sprint.name} <SprintStatus status={sprint.status} isTitle={true} />
          </h5>                    
      </div>
      {
        state.expanded ? 
          (
            <div id={collapseId} className="sprint-history__collapse">
              {new Date(sprint.startDate).toLocaleDateString()} - {new Date(sprint.endDate).toLocaleDateString()}
              {
                state.tasks && state.changes
                  ? (
                    <div>
                      <h6>Tasks</h6>
                      {
                        state.tasks.map(task => (
                          <BacklogTaskItem task={task} />
                        ))
                      }
                      <h6>History</h6>
                      <SprintTimeline changes={state.changes} />
                    </div>
                  )
                  : (<p>Loading...</p>)
              }
            </div>
          ) 
          : null
      }
      
    </div>
  )
  
}

export default SprintHistory