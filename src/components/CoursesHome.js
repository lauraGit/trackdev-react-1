import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import CoursesList from './CoursesList'

const CoursesHome = () => {
  return (
    <Fragment>
      <h2>Courses</h2>
      <div>
        <Link to="/courses/create">New course</Link>
        <CoursesList />
      </div>
    </Fragment>
  )
}

export default CoursesHome