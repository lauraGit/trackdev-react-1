import './backlog-task-item.css'
import { Link } from 'react-router-dom'
import EstimationPoints from './EstimationPoints'
import TaskStatus from './TaskStatus'

const BacklogTaskItem = ({ task, menuActions }) => {
  return (
    <div className="backlog-task-item">
      <div className="backlog-task-item__description">
        <span><Link to={`/tasks/${task.id}`}>{task.id}</Link> - {task.name}</span> 
        <span className="sr-only">Estimation points</span>
        <TaskStatus status={task.status} />
        <EstimationPoints estimationPoints={task.estimationPoints} />
        <span>{task.rank ? '#'+task.rank : null }</span>
      </div> 
      <div className="backlog-task-item__menu-actions">
        {menuActions}
      </div>
    </div>
  )
}

export default BacklogTaskItem