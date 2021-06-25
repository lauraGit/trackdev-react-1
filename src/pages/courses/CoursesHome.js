import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import CoursesList from '../../components/CoursesList'
import Restricted from '../../components/Restricted'

const CoursesHome = () => {
  return (
    <Fragment>
      <h2>Courses</h2>
      <div>
        <Restricted allowed={["PROFESSOR"]}>
          <Link to="/courses/create">New course</Link>
        </Restricted>
        <CoursesList />
      </div>
    </Fragment>
  )
}

export default CoursesHome