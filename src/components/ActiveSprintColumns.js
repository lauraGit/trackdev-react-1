import './active-sprint-columns.css'
import ColumnTaskItem from "./ColumnTaskItem"

const possibleStatus = ["CREATED", "TODO", "INPROGRESS", "TESTED", "DONE", "DELETED"]

const ActiveSprintColumns = ({ sprint, tasks, onDataTouched }) => {

  var columns = {}
  possibleStatus.forEach(status => {
    columns[status] = { tasks: [] }
  })
  tasks.forEach(task => {
    if(columns[task.status]) {
      columns[task.status].tasks.push(task)
    }    
  })

  return (
    <div className="active-sprint-columns">
      {
        Object.keys(columns).map(columnKey => (
          <div key={columnKey} className="active-sprint-columns__column">
            <h5 className="active-sprint-columns__title">{columnKey}</h5>
            <div className="active-sprint-columns__list">
              {              
                columns[columnKey].tasks.map(task => {
                  return (<ColumnTaskItem key={task.id} task={task} />)
                })              
              }
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default ActiveSprintColumns