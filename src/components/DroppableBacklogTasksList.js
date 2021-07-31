import BacklogTaskItem from "./BacklogTaskItem"
import { Droppable, Draggable } from 'react-beautiful-dnd'

const DroppableBacklogTasksList = ({listId, tasks, onDataTouched}) => {
  return (
    <Droppable droppableId={listId}>
      {
        (provided, snapshot) => (
          <div
            ref={provided.innerRef}
            className={`backlog-tasks-list__tasks
                      ${snapshot.isDraggingOver ? ' backlog-tasks-list__tasks--drag-over' : null}`}
            {...provided.droppableProps} >
            {
              tasks && tasks.length > 0
                ? tasks.map((task, index) => (
                  <Draggable draggableId={`backlog-task-${task.id}`} index={index} key={task.id}>
                    {
                      (provided) => (
                        <div ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}>
                          <BacklogTaskItem task={task} onDataTouched={onDataTouched} minRank={tasks[0].rank} maxRank={tasks[tasks.length-1].rank} />
                        </div>                                    
                      )
                    }
                  </Draggable>
                ))
                : null
            }
            {provided.placeholder}
          </div>
        )
      }
    </Droppable>
  )
}

export default DroppableBacklogTasksList