import { Link } from 'react-router-dom'
import EstimationPoints from './EstimationPoints'

const ColumnTaskItem = ({ task }) => {
  return (
    <div className="backlog-task-item">
      <div>
        <Link to={`/tasks/${task.id}`}>{task.id}</Link> - {task.name} 
        <span className="sr-only">Estimation points</span>
        <EstimationPoints estimationPoints={task.estimationPoints} />
      </div>
    </div>
  )
}

export default ColumnTaskItem