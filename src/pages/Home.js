import { useContext } from 'react'
import UserContext from '../contexts/UserContext'
import Spinner from 'react-bootstrap/Spinner'

const Home = () => {
  const {user} = useContext(UserContext)

  if(user == null) {
    return (
      <Spinner animation="border" role="status" variant="secondary">
        <span className="sr-only">Loading...</span>
      </Spinner>
    )
  }

  let greetingName = null
  if(user) {
    greetingName = user && user.isLoggedIn
      ? user.profile?.username
      : 'World'
  }
  return (
    <h2>Hello {greetingName}</h2>
  )
}

export default Home