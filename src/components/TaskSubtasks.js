import BacklogTaskItem from "./BacklogTaskItem"
import AddSubtask from "./AddSubtask"

const TaskSubtasks = ({ task, onDataTouched }) => {
  if(!task && !task.childTasks) {
    return null
  }
  return (
    <div>
      <AddSubtask taskId={task.id} onDataTouched={onDataTouched} />
      {
        task.childTasks.length > 0
          ?
            task.childTasks.map(subtask => (
              <BacklogTaskItem key={subtask.id} task={subtask} />
            ))
          : (<p>No subtasks.</p>)
      }
    </div>
  )
}

export default TaskSubtasks