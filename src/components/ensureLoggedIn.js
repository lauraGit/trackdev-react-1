import { Redirect } from 'react-router'
import UserContext from '../contexts/UserContext'

const EnsureLoggedIn = (props) => {
    return (
      <UserContext.Consumer>
        {({user}) => {
            const innerElement = user && user.isLoggedIn
            ? props.children
            : <Redirect to="/login" />
            return innerElement
        }}
      </UserContext.Consumer>          
    )
}

export default EnsureLoggedIn