import { Fragment } from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import Register from './Register'
import InvitesRoutes from './InvitesRoutes'
import CoursesRoutes from './CoursesRoutes'
import NotFoundPage from './shared/NotFoundPage'
import EnsureLoggedIn from '../components/EnsureLoggedIn'

const MainRoutes = () => {
  return (
    <Fragment>
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route path="/invites">
          <EnsureLoggedIn>
            <InvitesRoutes />
          </EnsureLoggedIn>
        </Route>
        <Route path="/courses">
          <EnsureLoggedIn>
            <CoursesRoutes />
          </EnsureLoggedIn>
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="*">
          <NotFoundPage />
        </Route>
      </Switch>
    </Fragment>
  )
}

export default MainRoutes