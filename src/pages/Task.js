import './task.css'
import { useState } from 'react'
import { withRouter } from "react-router"
import { Link } from 'react-router-dom'
import UserMention from '../components/UserMention'
import TaskStatus from '../components/TaskStatus'
import withData from "../components/withData"
import Api from '../utils/api'
import EstimationPoints from "../components/EstimationPoints"
import EditableHeader from "../components/EditableHeader"

const Task = ( { task, onDataTouched }) => {
  const [ errors, setErrors ] = useState({})
  const [ isEditing, setIsEditing ] = useState(false)

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
      
      <p>Reporter: <UserMention user={task.reporter} /></p>
      <p>Created at: {new Date(task.createdAt).toLocaleDateString()}</p>
      <p>
        Assignee: { task.assignee ? <UserMention user={task.assignee} /> : '-' }
      </p>
      <p>
        Estimation: { task.estimationPoints ? <EstimationPoints estimationPoints={task.estimationPoints} /> : '-'}
      </p>
      <p>Status: <TaskStatus status={task.status}/></p>
    </div>
  ) 
}

const TaskWithData = withData(
  Task,
  'task',
  (props) => Api.get(`/tasks/${props.match.params.taskId}`))

export default withRouter(TaskWithData)