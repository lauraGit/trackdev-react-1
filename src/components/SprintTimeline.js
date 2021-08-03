import { Fragment } from 'react'
import UserMention from './UserMention'
import SprintStatus from './SprintStatus'
import TaskSmallLink from './TaskSmallLink'

function formatDateTime(changedAt) {
  const date = new Date(changedAt)
  return `${date.toLocaleString()}`
}

function formatConcreteChange(change) {
  let prettyChange = { icon: 'unknown', verb: 'unknown', text: 'unknown', details: 'unknown' }
  switch(change.type) {
    case "name_change":        
      prettyChange = {
        icon: '📝',
        verb: 'changed',
        text: 'name',
        details: (<Fragment> to <em>{change.name}</em></Fragment>)
      }
      break;
    case "start_date_change":
      prettyChange = {
        icon: '📅',
        verb: 'changed',
        text: 'start date',
        details: (<Fragment> to <span>{formatDateTime(change.startDate)}</span></Fragment>)
      }
      break;
    case "end_date_change":
      prettyChange = {
        icon: '📅',
        verb: 'changed',
        text: 'end date',
        details: (<Fragment> to <span>{formatDateTime(change.endDate)}</span></Fragment>)
      }
      break;
    case "status_change":
      prettyChange = {
        icon: '📊',
        verb: 'changed',
        text: 'status',
        details: (<Fragment> to <SprintStatus status={change.status} /></Fragment>)
      }
      break;
    case "task_added":
      prettyChange = {
        icon: '➕',
        verb: 'added',
        text: 'task',
        details: (<TaskSmallLink task={change.task} />)
      }
      break;
    case "task_removed":
      prettyChange = {
        icon: '➖',
        verb: 'removed',
        text: 'task',
        details: (<TaskSmallLink task={change.task} />)
      }
      break;
  }
  return prettyChange
}

const SprintTimeline = ({ changes }) => {
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
                <span className="task-timeline__text"> {concreteChange.verb} </span>
                {concreteChange.text} {concreteChange.details}
            </div>
          )
        })
      }
    </div>
  )
}

export default SprintTimeline