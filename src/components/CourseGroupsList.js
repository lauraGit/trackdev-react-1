import './course-groups-list.css';
import GroupCard from './GroupCard'

const CourseGroupsList = ({ groups }) => {
  // Render
  if(groups == null) {
    return null
  }
  if(groups.length === 0) {
    return <p>You don't have any groups for this course year.</p>
  }
  return (
    <div className="course-groups-list">
        {
          groups.map(group => (
            <div key={group.id}>
              <GroupCard group={group} />
            </div>
          ))
        }
    </div>
  )
}

export default CourseGroupsList