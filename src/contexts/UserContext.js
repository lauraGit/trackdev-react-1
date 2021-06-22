import { createContext } from 'react'

const defaultUser = {
    isLoggedIn: false,
    username: null
}

const UserContext = createContext({ 
    user: defaultUser,
    setUser: () => {}
})

export default UserContext