import './task-fields.css'
import { useState } from 'react'
import UserMention from '../components/UserMention'
import TaskStatus from '../components/TaskStatus'
import Api from '../utils/api'
import EstimationPoints from "../components/EstimationPoints"
import EditableField from '../components/EditableField'

const TaskFields = ( { task, group, onDataTouched }) => {
  const [ estimationEditStatus, setEstimationEditStatus ] = useState({ status: 'normal', error: null})
  const [ statusEditStatus, setStatusEditStatus ] = useState({ status: 'normal', error: null})
  const [ assigneeEditStatus, setAssigneeEditStatus ] = useState({ status: 'normal', error: null})

  // ESTIMATION EDIT
  // --------------------------------------------------------------
  function handleEstimationChange(newEstimation) {
    var requestBody = {
      estimationPoints: newEstimation === '' ? null : newEstimation
    }
    setEstimationEditStatus({ status: 'saving' })
    Api.patch(`/tasks/${task.id}`, requestBody)
      .then(data => {     
        onDataTouched()
        setEstimationEditStatus({ status: 'saved' })
      })
      .catch(error => {
        console.log('setting new status to error')
        setEstimationEditStatus({ status: 'error', error: error?.details?.message || 'Unknown error' })
      })
  }

  // STATUS EDIT
  // --------------------------------------------------------------
  function handleStatusChange(newStatus) {
    var requestBody = {
      status: newStatus
    }
    setStatusEditStatus({ status: 'saving' })
    Api.patch(`/tasks/${task.id}`, requestBody)
      .then(data => {     
        onDataTouched()
        setStatusEditStatus({ status: 'saved' })
      })
      .catch(error => {
        setStatusEditStatus({ status: 'error', error: error?.details?.message || 'Unknown error' })
      })
  }

  // ASSIGNEE EDIT
  // --------------------------------------------------------------
  function handleAssigneeChange(newAssignee) {
    var requestBody = {
      assignee: newAssignee === '' ? null : newAssignee
    }
    setAssigneeEditStatus({ status: 'saving' })
    Api.patch(`/tasks/${task.id}`, requestBody)
      .then(data => {     
        onDataTouched()
        setAssigneeEditStatus({ status: 'saved' })
      })
      .catch(error => {
        setAssigneeEditStatus({ status: 'error', error: error?.details?.message || 'Unknown error' })
      })
  }    

  // RENDER
  if(!task) {
    return null
  }

  const groupMembers = group != null ? group.members : []
  const possibleAssignees = groupMembers
        .map(user => { return {value: user.username, text: user.username }})
  possibleAssignees.push({value: '', text: 'Unassigned'})
  
  let statusOptions = []
  let statusEditable = false
  if(task.status === "CREATED") {
    statusOptions = ["CREATED", "TODO"]
    statusEditable = true
  } else {
    statusOptions = ["TODO", "INPROGRESS", "TESTED", "DONE" ]
    statusEditable = statusOptions.some(x => x === task.status)
  }

  const notEditableText = "Field not editable"
  const editableText = "Edit field"

  return (
    <div className="task-fields">
      <div className="task-field">
        <div className="task-field__name">Reporter:</div>
        <div title={notEditableText}><UserMention user={task.reporter} /></div>
      </div>
      <div className="task-field">
        <div className="task-field__name">Created at:</div>
        <div title={notEditableText}>{new Date(task.createdAt).toLocaleDateString()}</div>
      </div>
      <div className="task-field">
        <div className="task-field__name">Assignee:</div>
        <div title={editableText}>
          <EditableField
            fieldView={ task.assignee ? <UserMention user={task.assignee} /> : '-' }
            as="select"
            status={assigneeEditStatus.status}
            error={assigneeEditStatus.error}
            value={task.assignee?.username || ''}
            onChange={handleAssigneeChange}>
              {
                possibleAssignees.map(option => (<option key={option.value} value={option.value}>{option.text}</option>))
              }
          </EditableField>
        </div>
      </div>
      <div className="task-field">
        <div className="task-field__name">Estimation:</div>
        <div title={editableText}>
          <EditableField
            fieldView={(task.estimationPoints ? <EstimationPoints estimationPoints={task.estimationPoints} /> : '-')}
            status={estimationEditStatus.status}
            error={estimationEditStatus.error}
            value={task.estimationPoints}
            onChange={handleEstimationChange} />
        </div>
      </div>
      <div className="task-field">
        <div className="task-field__name">Status:</div>
        
          {
            statusEditable ?
              (
                <div title={editableText}>
                  <EditableField
                    fieldView={(<TaskStatus status={task.status}/>)}
                    as="select"
                    status={statusEditStatus.status}
                    error={statusEditStatus.error}
                    value={task.status}
                    options={statusOptions}
                    onChange={handleStatusChange}>
                      {
                          statusOptions.map(option => (<option key={option} value={option}>{option}</option>))
                      }
                    </EditableField>
                  </div>
              )
              : (
                <div title={notEditableText}>
                  <TaskStatus status={task.status}/>
                </div>
              )
          }
      </div>
    </div>
  ) 
}

export default TaskFields