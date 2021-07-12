import { withRouter } from "react-router"
import withData from "../components/withData"
import Api from '../utils/api'

const Task = ( { task }) => {
  if(!task) {
    return null
  }
  return (
    <div>
      <h2>{task.id} - {task.name}</h2>
      <p>Reporter: {task.reporter.username}</p>
      <p>Created at: {new Date(task.createdAt).toLocaleDateString()}</p>
    </div>
  ) 
}

const TaskWithData = withData(
  Task,
  'task',
  (props) => Api.get(`/tasks/${props.match.params.taskId}`))

export default withRouter(TaskWithData)