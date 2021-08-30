import { Fragment } from 'react'
import Breadcrumbs from '../../components/Breadcrumbs'
import CourseYearsList from '../../components/CourseYearsList'
import withData from '../../components/withData'
import Api from '../../utils/api'

const EnrolledCourseYearsList = withData(
  CourseYearsList,
  'courseYears',
  () => Api.get('/courses/years'))

const CourseYears = () => {
  let links = [];
  links.push({ text: "Home", href: '/'});
  links.push({ text: "Courses" });

  return (
    <Fragment>
      <Breadcrumbs links={links} />
      <h2>Courses</h2>
      <div>
        <EnrolledCourseYearsList />
      </div>
    </Fragment>
  )
}

export default CourseYears