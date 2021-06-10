import { Component, Fragment } from 'react'
import UserContext from '../contexts/UserContext'

class LogoutButton extends Component {

    constructor(props) {
        super(props)
        this.state = {
            hasApiError: false,
            errorMessage: ''
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(e) {
        this.requestLogout()
    }

    requestLogout() {
        fetch('https://localhost:8080/auth/logout', {
            method: 'POST',
            credentials: 'include'
        })
          .then(async response => {
            if(!response.ok) {
              const data = await response.json();
              this.setState({ hasApiError: true, errorMessage: data.message || 'Unknown error from server'})
            } else {
              this.context.setUser({
                isLoggedIn: false,
                username: ''
              })
            }
          })
          .catch(error => {
            this.setState({ hasApiError: true, errorMessage: 'Unexpected error'})
          })
      }

    render() {
        return (
            <Fragment>
                <button onClick={this.handleClick}>
                    Logout
                </button>
                {
                    this.state.hasApiError ? (<p>{this.state.errorMessage}</p>) : null
                }
            </Fragment>
        )
    }
}

LogoutButton.contextType = UserContext

export default LogoutButton