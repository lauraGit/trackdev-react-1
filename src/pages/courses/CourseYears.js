import { Fragment } from 'react'
import CourseYearsList from '../../components/CourseYearsList'
import withData from '../../components/withData'
import Api from '../../utils/api'

const EnrolledCourseYearsList = withData(
  CourseYearsList,
  'courseYears',
  () => Api.get('/courses/years'))

const CourseYears = () => {
  return (
    <Fragment>
      <h2>Courses</h2>
      <div>
        <EnrolledCourseYearsList />
      </div>
    </Fragment>
  )
}

export default CourseYears