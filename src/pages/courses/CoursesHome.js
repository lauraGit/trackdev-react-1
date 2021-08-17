import CoursesList from '../../components/CoursesList'
import Restricted from '../../components/Restricted'
import { Button } from 'react-bootstrap'

const CoursesHome = () => {
  return (
    <Restricted allowed={["PROFESSOR", "ADMIN"]} fallback={(<p>You don't have access to here.</p>)}>
      <div>
        <h2>Courses</h2>
        <div>
          <Restricted allowed={["PROFESSOR"]}>
            <Button href="/courses/create" size="sm" className="mb-3">New course</Button>
          </Restricted>
          <CoursesList />
        </div>
      </div>
    </Restricted>
  )
}

export default CoursesHome