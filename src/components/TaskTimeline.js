import './task-timeline.css'
import withData from './withData'
import Api from '../utils/api'
import UserMention from './UserMention'
import TaskStatus from './TaskStatus'
import EstimationPoints from './EstimationPoints'

const TaskTimeline = ({ changes }) => {
  if(!changes) {
    return null
  }

  function getChangeIcon(type) {
    let value = 'unknown'
    switch(type) {
      case "name_change":
        value = '📝'
        break;
      case "status_change":
        value = '📊'
        break;
      case "assignee_change":
        value = '🙋‍♀️'
        break;
      case "estimation_points_change":
        value = '🃏'
        break;
      case "rank_change":
        value = '🥈'
        break;
    }

    return value
  }

  function getChangeText(type) {
    let value = 'unknown'
    switch(type) {
      case "name_change":
        value = 'name'
        break;
      case "status_change":
        value = 'status'
        break;
      case "assignee_change":
        value = 'assignee'
        break;
      case "estimation_points_change":
        value = 'estimation points'
        break;
      case "rank_change":
        value = 'rank'
        break;
    }

    return value
  }

  function getChangeComponent(change) {
    let value = 'unknown'
    switch(change.type) {
      case "name_change":
        value = (<em>{change.name}</em>)
        break;
      case "status_change":
        value = (<TaskStatus status={change.status} />)
        break;
      case "assignee_change":
        value = change.assignee ? (<UserMention user={change.assignee} />) : '-'
        break;
      case "estimation_points_change":
        value = change.estimationPoints ? (<EstimationPoints estimationPoints={change.estimationPoints} />) : '-'
        break;
      case "rank_change":
        value = change.rank ? (<em>#{change.rank}</em>) : '-'
        break;
    }

    return value
  }

  function formatDateTime(changedAt) {
    const date = new Date(changedAt)
    return `${date.toLocaleString()}`

  }

  return (
    <div className="task-timeline">
      {
        changes.map(change =>  
          (
            <div className="task-timeline__item" key={change.id}>
              <span className="task-timeline__icon">{getChangeIcon(change.type)}</span>
              <UserMention user={change.author} />
              <span className="task-timeline__text"> on </span>
              {formatDateTime(change.changedAt)}
              <span className="task-timeline__text"> changed </span>
              {getChangeText(change.type)}
              <span className="task-timeline__text"> to </span>
              { getChangeComponent(change) }
            </div>
          ))
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