import { Redirect } from 'react-router'
import UserContext from '../contexts/UserContext'

const EnsureLoggedIn = (props) => {
    return (
      <UserContext.Consumer>
        {({user}) => {
            let innerElement = null
            if(user) {
              innerElement = user.isLoggedIn
                ? props.children
                : <Redirect to="/login" />
            }
            return innerElement
        }}
      </UserContext.Consumer>          
    )
}

export default EnsureLoggedIn