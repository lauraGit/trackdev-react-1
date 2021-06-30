import { Fragment } from 'react'
import { Switch, Route } from 'react-router-dom'
import CoursesHome from './courses/CoursesHome'
import Course from './courses/Course'
import CreateGroup from './courses/CreateGroup'
import CourseYear from './courses/CourseYear'
import CreateCourse from './courses/CreateCourse'
import CourseYears from './courses/CourseYears'
import NotFoundPage from './shared/NotFoundPage'

const CoursesRoutes = () => {
  return (
    <Fragment>
      <Switch>
        <Route exact path="/courses/create">
          <CreateCourse />
        </Route>
        <Route exact path="/courses/years/:courseYearId/groups/create">
          <CreateGroup />
        </Route>
        <Route exact path="/courses/years/:courseYearId">
          <CourseYear />
        </Route>
        <Route exact path="/courses/years">
          <CourseYears />
        </Route>
        <Route exact path="/courses/:courseId">
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