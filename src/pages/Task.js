import './task.css'
import { useEffect, useState } from 'react'
import { withRouter } from "react-router"
import { Link } from 'react-router-dom'
import UserMention from '../components/UserMention'
import TaskStatus from '../components/TaskStatus'
import withData from "../components/withData"
import Api from '../utils/api'
import EstimationPoints from "../components/EstimationPoints"
import EditableField from '../components/EditableField'
import EditableHeader from "../components/EditableHeader"
import TaskTimeline from '../components/TaskTimeline'

const Task = ( { task, onDataTouched }) => {
  const [ errors, setErrors ] = useState({})

  const [ isEditing, setIsEditing ] = useState(false)
  const [ estimationEditStatus, setEstimationEditStatus ] = useState({ status: 'normal', error: null})
  const [ statusEditStatus, setStatusEditStatus ] = useState({ status: 'normal', error: null})
  const [ assigneeEditStatus, setAssigneeEditStatus ] = useState({ status: 'normal', error: null})

  const statusOptions = [ "TODO", "INPROGRESS", "DONE", "TESTED", "SPRINT", "DELETED", "CREATED" ]
  const [ possibleAssignees, setPossibleAssignees ] = useState([])

  useEffect(function() {
    async function requestGroupMembers() {
      Api.get(`/groups/${task.backlog.group.id}`)
        .then(data => setPossibleAssignees(data.members))
        .catch(() => {})
    }
    if(task?.backlog?.group?.id) {
      requestGroupMembers()
    }    
  }, [task])

  // NAME EDIT
  // --------------------------------------------------------------
  function handleNameChange(newName) {
    var requestBody = {
      name: newName
    }
    Api.patch(`/tasks/${task.id}`, requestBody)
      .then(data => {     
        onDataTouched()
        setIsEditing(false)
      })
      .catch(error => {
        setErrors({ editName: error?.details?.message || 'Unknown error' })
      })
  }

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
  return (
    <div>
      <div className="task-header">
        <Link className="task-header__key" to={`/tasks/${task.id}`}>{task.id}</Link>
        <span> - </span>
        <div className="task-header__name">
          <EditableHeader
                  title={task.name}              
                  isEditing={isEditing}
                  error={errors?.editName}
                  fieldLabel="Name"
                  fieldValidationMessage="Please enter a valid name"
                  onEditing={(isEditing) => setIsEditing(isEditing)}
                  onChange={handleNameChange}
                />
        </div>        
      </div>
      <div>
        <div>Reporter: <UserMention user={task.reporter} /></div>
        <div>Created at: {new Date(task.createdAt).toLocaleDateString()}</div>
        <div>
          Assignee: <EditableField
            fieldView={ task.assignee ? <UserMention user={task.assignee} /> : '-' }
            as="select"
            status={assigneeEditStatus.status}
            error={assigneeEditStatus.error}
            value={task.assignee?.username}
            onChange={handleAssigneeChange}>
              {
                possibleAssignees
                  .map(user => user.username)
                  .map(option => (<option key={option} value={option}>{option}</option>))
              }
            </EditableField>
        </div>
        <div>
          Estimation: <EditableField
            fieldView={(task.estimationPoints ? <EstimationPoints estimationPoints={task.estimationPoints} /> : '-')}
            status={estimationEditStatus.status}
            error={estimationEditStatus.error}
            value={task.estimationPoints}
            onChange={handleEstimationChange} />
        </div>
        <div>
          Status: <EditableField
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
      </div>
      <div>
        <h3>History</h3>
        <TaskTimeline taskId={task.id} />
      </div>   
    </div>
  ) 
}

const TaskWithData = withData(
  Task,
  'task',
  (props) => Api.get(`/tasks/${props.match.params.taskId}`))

export default withRouter(TaskWithData)