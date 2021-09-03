import { Redirect } from 'react-router'
import UserContext from '../contexts/UserContext'
import Spinner from 'react-bootstrap/Spinner'

const EnsureLoggedIn = (props) => {
    return (
      <UserContext.Consumer>
        {({user}) => {
            let innerElement = null
            if(user) {
              innerElement = user.isLoggedIn
                ? props.children
                : <Redirect to="/login" />
            } else {
              innerElement = (
                <Spinner animation="border" role="status" variant="secondary">
                  <span className="sr-only">Loading...</span>
                </Spinner>
              )
            }
            return innerElement
        }}
      </UserContext.Consumer>          
    )
}

export default EnsureLoggedIn