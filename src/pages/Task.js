import './task.css'
import { useEffect, useState } from 'react'
import { withRouter } from "react-router"
import { Link } from 'react-router-dom'
import withData from "../components/withData"
import Api from '../utils/api'
import EditableHeader from "../components/EditableHeader"
import TaskSubtasks from '../components/TaskSubtasks'
import TaskFields from '../components/TaskFields'
import TaskTimeline from '../components/TaskTimeline'
import Breadcrumbs from '../components/Breadcrumbs'

const Task = ( { task, onDataTouched }) => {
  const [ errors, setErrors ] = useState({})
  const [ isEditing, setIsEditing ] = useState(false)  
  const [ group, setGroup ] = useState(null)

  useEffect(function() {
    async function requestGroupMembers() {
      Api.get(`/groups/${task.backlog.group.id}`)
        .then(data => setGroup(data))
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

  // RENDER
  if(!task) {
    return null
  }

  let links = [];
  if(group != null) {
    links.push({ text: group.name, href: `/groups/${group.id}`});
    links.push({ text: `${task.id} - ${task.name}` });
  }

  return (
    <div>
      <Breadcrumbs links={links} />
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
        <TaskFields task={task} group={group} onDataTouched={onDataTouched} />
      </div>
        <div>
        <h3>Subtasks</h3>
        <TaskSubtasks task={task} onDataTouched={onDataTouched} />
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