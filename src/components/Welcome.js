import { useContext } from 'react'
import UserContext from '../contexts/UserContext'

const Welcome = () => {
  const {user} = useContext(UserContext)

  const greetingName = user && user.isLoggedIn
    ? user.username
    : 'World'

  return (
    <p>Hello {greetingName}.</p>
  )
}

export default Welcome