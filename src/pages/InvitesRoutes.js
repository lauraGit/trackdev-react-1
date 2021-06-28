import { Fragment } from 'react'
import { Switch, Route } from 'react-router-dom'
import InvitesHome from './invites/InvitesHome'
import CreateInvite from './invites/CreateInvite'
import NotFoundPage from './shared/NotFoundPage'

const InvitesRoutes = () => {
  return (
    <Fragment>
      <Switch>
        <Route exact path="/invites/create">
          <CreateInvite />
        </Route>
        <Route exact path="/invites">
          <InvitesHome />
        </Route>
        <Route path="/invites/*">
          <NotFoundPage />
        </Route>
      </Switch>
    </Fragment>
  )
}

export default InvitesRoutes