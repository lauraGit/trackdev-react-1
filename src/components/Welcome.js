import { useContext } from 'react'
import UserContext from '../contexts/UserContext'

const Welcome = () => {
  const {user} = useContext(UserContext)

  const greetingName = user && user.isLoggedIn
    ? user.username
    : 'World'

  return (
    <h2>Hello {greetingName}</h2>
  )
}

export default Welcome