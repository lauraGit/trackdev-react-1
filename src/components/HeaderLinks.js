import './header-links.css';
import { useContext, Fragment } from 'react'
import UserContext from '../contexts/UserContext'
import LogoutButton from './LogoutButton'
import { Link } from 'react-router-dom'
import Restricted from './Restricted'

const HeaderLinks = () => {
  const {user} = useContext(UserContext)

  if(!user) {
    return null
  }

  if(user.isLoggedIn) {
    return (
      <Fragment>
        <nav>
          <Link to="/invites">Invites</Link>
          <Restricted allowed={["PROFESSOR", "ADMIN"]}>
            <Link to="/courses">Courses</Link>
          </Restricted>
          <Restricted allowed={["STUDENT"]}>
            <Link to="/courses/years">Courses</Link>
          </Restricted>
        </nav>
        <div>
            <span>{user.profile?.username}</span>
            <LogoutButton />
        </div>  
      </Fragment>
    )
  }
  return (
    <nav>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </nav>
  )
}

export default HeaderLinks