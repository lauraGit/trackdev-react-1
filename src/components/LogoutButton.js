import { Component, Fragment } from 'react'
import UserContext from '../contexts/UserContext'
import Api from '../utils/api'

class LogoutButton extends Component {

    constructor(props) {
        super(props)
        this.state = {
            error: null
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(e) {
        this.requestLogout()
    }

    requestLogout() {
        Api.post('/auth/logout', null)
          .then(data => {
            this.context.setUser({ isLoggedIn: false, profile: null })
          })
          .catch(error => {
            this.setState({ error: error?.details?.message || 'Unknown error'})
          })
    }

    render() {
        return (
            <Fragment>
                <button onClick={this.handleClick}>
                    Logout
                </button>
                {
                    this.state.error ? (<p>{this.state.error}</p>) : null
                }
            </Fragment>
        )
    }
}

LogoutButton.contextType = UserContext

export default LogoutButton