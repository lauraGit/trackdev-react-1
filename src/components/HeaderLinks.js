import { useContext } from 'react'
import UserContext from '../contexts/UserContext'
import LogoutButton from './LogoutButton'

const HeaderLinks = () => {
    const {user} = useContext(UserContext)

    if(user && user.isLoggedIn) {
        return (
            <nav>
                <LogoutButton />
            </nav>
        )
    }
    return (
        <nav>
            <a href="#">Login</a>
            <a href="#">Register</a>
        </nav>
    )
}

export default HeaderLinks