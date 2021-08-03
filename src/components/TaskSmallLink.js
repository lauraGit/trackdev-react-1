import "./task-small-link.css"
import { Link } from 'react-router-dom'

const TaskSmallLink = ({ task }) => {
  return (
    <span className="task-small-link">
      <Link to={`/tasks/${task.id}`}>{task.id}</Link> {task.name}
    </span>
  )
}

export default TaskSmallLink