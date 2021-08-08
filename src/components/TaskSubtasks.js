import BacklogTaskItem from "./BacklogTaskItem"

const TaskSubtasks = ({ task, onDataTouched }) => {
  if(!task && !task.childTasks) {
    return null
  }
  if(task.childTasks.length === 0) {
    return <p>No subtasks</p>
  } 
  return (
    <div>
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