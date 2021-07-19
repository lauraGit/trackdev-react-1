import './backlog-task-item.css'
import { Link } from 'react-router-dom'
import EstimationPoints from './EstimationPoints'

const BacklogTaskItem = ({ task }) => {
  return (
    <div className="backlog-task-item">
      <Link to={`/tasks/${task.id}`}>{task.id}</Link> - {task.name} 
      <span className="sr-only">Estimation points</span>
      <EstimationPoints estimationPoints={task.estimationPoints} />
    </div>
  )
}

export default BacklogTaskItem