import AddBacklogTask from './AddBacklogTask'
import BacklogTaskItem from "./BacklogTaskItem"
import withData from './withData'
import Api from '../utils/api'

const BacklogTasksList = ({ backlog, tasks, onDataTouched }) => {

  if(!tasks) {
    return null
  }
  return (
    <div>
      <AddBacklogTask backlogId={backlog.id} onDataTouched={onDataTouched} />
      <div>
        { 
          tasks.length == 0
            ? (<p>You don't have any tasks yet.</p>)
            : tasks.map(task => (
                <BacklogTaskItem key={task.id} task={task} onDataTouched={onDataTouched} totalCount={tasks.length} />
              ))
        }
      </div>
    </div>
  )
}

const BacklogTasksListWithData = withData(
  BacklogTasksList,
  'tasks',
  (props) => Api.get(`/backlogs/${props.backlog.id}/tasks`)
)

export default BacklogTasksListWithData