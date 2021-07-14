import { withRouter } from "react-router"
import UserMention from '../components/UserMention'
import TaskStatus from '../components/TaskStatus'
import withData from "../components/withData"
import Api from '../utils/api'
import EstimationPoints from "../components/EstimationPoints"

const Task = ( { task }) => {
  if(!task) {
    return null
  }
  return (
    <div>
      <h2>{task.id} - {task.name}</h2>
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