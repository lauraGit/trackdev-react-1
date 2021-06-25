import { useContext } from 'react'
import UserContext from '../contexts/UserContext'

const Restricted = ({ allowed, fallback, children }) => {
  const {user} = useContext(UserContext)

  if(!allowed || allowed.length === 0) {
    return null
  }
  if(user?.profile?.roles && user.profile.roles.some(r => allowed.some(a => a === r))) {
    return children
  } else {
    return fallback || null
  }
}

export default Restricted