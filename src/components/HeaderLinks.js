import { useContext } from 'react'
import UserContext from '../contexts/UserContext'
import Restricted from './Restricted'
import { NavLink } from 'react-router-dom'
import { Nav } from 'react-bootstrap'

const HeaderLinks = () => {
  const {user} = useContext(UserContext)
  if(!user || !user.isLoggedIn) {
    return null
  }

  if(user.isLoggedIn) {
    return (
        <Nav className="mr-auto">
          <NavLink className="nav-link" to="/invites">Invites</NavLink>
          <Restricted allowed={["PROFESSOR", "ADMIN"]}>
            <NavLink className="nav-link" to="/courses">Courses</NavLink>
          </Restricted>
          <Restricted allowed={["STUDENT"]}>
            <NavLink className="nav-link" to="/courses/years">Courses</NavLink>
          </Restricted>
        </Nav>        
    )
  }
}

export default HeaderLinks