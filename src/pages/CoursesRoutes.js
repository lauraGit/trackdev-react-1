import { Fragment } from 'react'
import { Switch, Route } from 'react-router-dom'
import CoursesHome from './courses/CoursesHome'
import Course from './courses/Course'
import CourseYear from './courses/CourseYear'
import CreateCourse from './courses/CreateCourse'
import NotFoundPage from './shared/NotFoundPage'

const CoursesRoutes = () => {
  return (
    <Fragment>
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
    </Fragment>
  )
}

export default CoursesRoutes