import { useContext } from 'react'
import UserContext from '../contexts/UserContext'
import LogoutButton from './LogoutButton'
import { Link } from 'react-router-dom'

const HeaderLinks = () => {
    const {user} = useContext(UserContext)

    if(user && user.isLoggedIn) {
        return (
            <nav>
                <Link to="/invites">Invites</Link>
                <LogoutButton />
            </nav>
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