import './task-timeline.css'
import withData from './withData'
import Api from '../utils/api'
import UserMention from './UserMention'
import TaskStatus from './TaskStatus'
import EstimationPoints from './EstimationPoints'

function formatDateTime(changedAt) {
  const date = new Date(changedAt)
  return `${date.toLocaleString()}`

}

function formatConcreteChange(change) {
  let prettyChange = { icon: 'unknown', text: 'unknown', value: 'unknown' }
  switch(change.type) {
    case "name_change":        
      prettyChange = {
        icon: '📝',
        text: 'name',
        value: (<em>{change.name}</em>)
      }
      break;
    case "status_change":
      prettyChange = {
        icon: '📊',
        text: 'status',
        value: (<TaskStatus status={change.status} />)
      }
      break;
    case "assignee_change":
      prettyChange = {
        icon: '🙋‍♀️',
        text: 'assignee',
        value: change.assignee ? (<UserMention user={change.assignee} />) : '-'
      }
      break;
    case "estimation_points_change":
      prettyChange = {
        icon: '🃏',
        text: 'estimation points',
        value: change.estimationPoints ? (<EstimationPoints estimationPoints={change.estimationPoints} />) : '-'
      }
      break;
    case "rank_change":
      prettyChange = {
        icon: '🥈',
        text: 'rank',
        value: change.rank ? (<em>#{change.rank}</em>) : '-'
      }
      break;
    case "active_sprint_change":
      prettyChange = {
        icon: '🔄',
        text: 'active sprint',
        value: change.activeSprint ? (<em>{change.activeSprint.name}</em>) : '-'
      }
      break;
  }
  return prettyChange
}

const TaskTimeline = ({ changes }) => {
  if(!changes) {
    return null
  }

  return (
    <div className="task-timeline">
      {
        changes.map(change => {
          const concreteChange = formatConcreteChange(change)
          return (
            <div className="task-timeline__item" key={change.id}>
              <span className="task-timeline__icon">{concreteChange.icon}</span>
              <UserMention user={change.author} />
              <span className="task-timeline__text"> on </span>
              {formatDateTime(change.changedAt)}
              <span className="task-timeline__text"> changed </span>
              {concreteChange.text}
              <span className="task-timeline__text"> to </span>
              {concreteChange.value }
            </div>
          )
        })
      }
    </div>
  )
}

const TaskTimelineWithData = withData(
  TaskTimeline,
  'changes',
  (props) => Api.get(`/tasks/${props.taskId}/history`)
)

export default TaskTimelineWithData