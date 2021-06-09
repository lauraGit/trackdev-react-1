import { Component } from 'react'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      loggedIn: false,
      hasApiError: false,
      errorMessage: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ hasApiError: false, errorMessage: ''})
    this.requestLogin()
  }

  requestLogin() {
    var requestBody = {
      username: this.state.username,
      password: this.state.password
    }
    fetch('https://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(requestBody)
    })
      .then(async response => {
        if(!response.ok) {
          const errorData = await response.json();
          this.setState({ hasApiError: true, errorMessage: errorData.message || 'Unknown error from server'})
        } else {
          this.setState({ loggedIn: true })
        }
      })
      .catch(error => {
        this.setState({ hasApiError: true, errorMessage: 'Unexpected error'})
      })
  }

  handleInputChange(e) {
    let inputChange = {}
    inputChange[e.target.name] = e.target.value
    this.setState(inputChange)
  }

  render() {
    if(this.state.loggedIn) {
      return (<div><p>You are logged in.</p></div>)
    }
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Username
            <input name="username" value={this.state.username} onChange={this.handleInputChange}/>
          </label>
          <label>
            Password
            <input name="password" type="password" value={this.state.password} onChange={this.handleInputChange}/>
          </label>
          <button type="submit">Login</button>
          {
            this.state.hasApiError ? (<p>{this.state.errorMessage}</p>) : null
          }
        </form>
      </div>
    )
  }
}

export default Login