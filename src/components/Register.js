import { Component } from 'react'
import Api from '../utils/api'

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      password: '',
      registered: false,
      hasApiError: false,
      errorMessage: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ hasApiError: false, errorMessage: ''})
    this.requestRegister()
  }

  requestRegister() {
    var requestBody = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    }
    Api.post('/users/register', requestBody)
      .then(async response => {
        if(!response.ok) {
          const errorData = await response.json();
          this.setState({ hasApiError: true, errorMessage: errorData.message || 'Unknown error from server'})
        } else {
          this.setState({ registered: true })
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
    if(this.state.registered) {
      return (<div><p>You have registered successfully.</p></div>)
    }
    return (
      <div className="register">
        <h2>Register</h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            Username
            <input name="username" value={this.state.username} onChange={this.handleInputChange}/>
          </label>
          <label>
            Email
            <input name="email" value={this.state.email} onChange={this.handleInputChange}/>
          </label>
          <label>
            Password
            <input name="password" type="password" value={this.state.password} onChange={this.handleInputChange}/>
          </label>
          <button type="submit">Register</button>
          {
            this.state.hasApiError ? (<p>{this.state.errorMessage}</p>) : null
          }
        </form>
      </div>
    )
  }
}

export default Register