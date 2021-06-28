import { useContext } from 'react'
import UserContext from '../contexts/UserContext'

const Home = () => {
  const {user} = useContext(UserContext)

  let greetingName = ''
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