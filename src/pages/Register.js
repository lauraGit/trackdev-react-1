import { Component } from 'react'
import { Link } from 'react-router-dom'
import Api from '../utils/api'

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      password: '',
      registered: false,
      error: null
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
      .then(data => {
        this.setState({ registered: true })        
      })
      .catch(error => {
        this.setState({ error: error?.details?.message || 'Unknown error'})
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
            <input name="username" value={this.state.username} onChange={this.handleInputChange} required />
          </label>
          <label>
            Email
            <input name="email" value={this.state.email} onChange={this.handleInputChange} required />
          </label>
          <label>
            Password
            <input name="password" type="password" value={this.state.password} onChange={this.handleInputChange} required />
          </label>
          <button type="submit">Register</button>
          {
            this.state.error ? (<p>{this.error}</p>) : null
          }
          <p>Already have an account? Go to <Link to="/login">login</Link>.</p>
        </form>
      </div>
    )
  }
}

export default Register