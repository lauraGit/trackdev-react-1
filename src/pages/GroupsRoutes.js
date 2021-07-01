import { Fragment } from 'react'
import { Switch, Route } from 'react-router-dom'
import Group from './groups/Group'
import EditGroup from './groups/EditGroup'
import NotFoundPage from './shared/NotFoundPage'

const CoursesRoutes = () => {
  return (
    <Fragment>
      <Switch>
        <Route exact path="/groups/:groupId/edit">
          <EditGroup />
        </Route>
        <Route exact path="/groups/:groupId">
          <Group />
        </Route>
        <Route path="/groups/*">
          <NotFoundPage />
        </Route>
      </Switch>
    </Fragment>
  )
}

export default CoursesRoutes