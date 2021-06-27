import './course-groups-list.css';

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
              <div className="group-card">
                <strong>{group.name}</strong>
                <div>
                  {
                    group.members?.map(member => (<span>@{member.username}</span>))
                  }
                </div>
              </div>
            </div>
          ))
        }
    </div>
  )
}

export default CourseGroupsList