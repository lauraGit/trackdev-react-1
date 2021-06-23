import { Switch, Route } from 'react-router-dom'
import CoursesHome from './CoursesHome'
import Course from './Course'
import CourseYear from './CourseYear'
import CreateCourse from './CreateCourse'
import NotFoundPage from './NotFoundPage'

const Courses = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/courses/create">
          <CreateCourse />
        </Route>
        <Route path="/courses/years/:courseYearId">
          <CourseYear />
        </Route>
        <Route path="/courses/:courseId">
          <Course />
        </Route>
        <Route exact path="/courses">
          <CoursesHome />
        </Route>
        <Route path="/courses/*">
          <NotFoundPage />
        </Route>
      </Switch>
    </div>
  )
}

export default Courses