import { useContext, useState, Fragment } from 'react'
import UserContext from '../contexts/UserContext'
import { NavLink } from 'react-router-dom'
import { Nav, Dropdown, Toast } from 'react-bootstrap'
import Api from '../utils/api'

const HeaderLinks = () => {
  const {user, setUser} = useContext(UserContext)
  const [error, setError] = useState(null)

  function handleLogoutClick(e) {
    requestLogout()
  }

  function requestLogout() {
      Api.post('/auth/logout', null)
        .then(data => {
          setUser({ isLoggedIn: false, profile: null })
        })
        .catch(error => {
          setError(error?.details?.message || 'Unknown error')
        })
  }

  function toggleToast() {
    setError(null)
  }

  if(!user) {
    return null
  }

  if(user.isLoggedIn) {
    return (
      <Fragment>        
        <Nav>
          <Dropdown className="nav-item" alignRight>
            <Dropdown.Toggle className="nav-link" variant="">{user.profile?.username}</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={handleLogoutClick}>Logout</Dropdown.Item>
            </Dropdown.Menu>              
          </Dropdown>
        </Nav>
        {
          error
            ? (
              <div aria-live="polite" style={{position:'fixed', bottom: '30px', right: '30px', zIndex: 5}}>
                <Toast onClose={toggleToast} delay={4000} autohide className="bg-danger text-white" animation={false}>
                  <Toast.Header><span className="mr-auto">Error closing session</span></Toast.Header>
                  <Toast.Body>{error}</Toast.Body>
                </Toast>
              </div>
            )
            : null
        }
      </Fragment>
    )
  }
  return (
    <Nav>
      <NavLink className="nav-link" to="/login">Login</NavLink>
      <NavLink className="nav-link" to="/register">Register</NavLink>
    </Nav>
  )
}

export default HeaderLinks