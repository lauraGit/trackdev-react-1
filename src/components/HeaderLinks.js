import './header-links.css';
import { useContext, Fragment } from 'react'
import UserContext from '../contexts/UserContext'
import LogoutButton from './LogoutButton'
import { Link } from 'react-router-dom'

const HeaderLinks = () => {
  const {user} = useContext(UserContext)

  if(user && user.isLoggedIn) {
    return (
      <Fragment>
        <nav>
          <Link to="/invites">Invites</Link>
          <Link to="/courses">Courses</Link>    
        </nav>
        <div>
            <span>{user.username}</span>
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