import { Link } from 'react-router-dom'
import CoursesList from '../../components/CoursesList'
import Restricted from '../../components/Restricted'

const CoursesHome = () => {
  return (
    <Restricted allowed={["PROFESSOR", "ADMIN"]} fallback={(<p>You don't have access to here.</p>)}>
      <div>
        <h2>Courses</h2>
        <div>
          <Restricted allowed={["PROFESSOR"]}>
            <Link to="/courses/create">New course</Link>
          </Restricted>
          <CoursesList />
        </div>
      </div>
    </Restricted>
  )
}

export default CoursesHome