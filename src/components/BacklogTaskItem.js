import './backlog-task-item.css'
import { Link } from 'react-router-dom'

const BacklogTaskItem = ({ task }) => {
  return (
    <div className="backlog-task-item">
      <Link to={`/tasks/${task.id}`}>{task.id}</Link> - {task.name}
    </div>
  )
}

export default BacklogTaskItem