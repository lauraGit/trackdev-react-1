import { Component } from 'react'
import { Link } from 'react-router-dom'
import Api from '../utils/api'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'

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
    const isValidForm = e.currentTarget.checkValidity()
    this.setState( {validated: true})
    if(isValidForm === true) {
      this.requestRegister()
    }
  }

  requestRegister() {
    var requestBody = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      validated: false
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
      return (<div><p>You have registered successfully. Go to <Link to="/login">login</Link>.</p></div>)
    }
    return (
      <div className="register">
        <h2>Register</h2>
        <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
          <Form.Group controlId="register-username">
            <Form.Label>Username</Form.Label>
            <Form.Control name="username" value={this.state.username} onChange={this.handleInputChange} required minLength="4" />
            <Form.Control.Feedback type="invalid">
              Please enter valid a username of at least 4 characters long and only letters or numbers.
            </Form.Control.Feedback>
          </Form.Group>
          
          <Form.Group controlId="register-email">
            <Form.Label>Email</Form.Label>
            <Form.Control name="email" type="email" value={this.state.email} onChange={this.handleInputChange} required />
            <Form.Control.Feedback type="invalid">
              Please enter valid email.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="register-password">
            <Form.Label>Password</Form.Label>
            <Form.Control name="password" type="password" value={this.state.password} onChange={this.handleInputChange} required minLength="8" maxLength="50" />
            <Form.Control.Feedback type="invalid">
              Please enter a valid password of at least 8 characters long.
            </Form.Control.Feedback>
          </Form.Group>

          <Button type="submit" variant="primary">Register</Button>
          {
            this.state.error ? (<Alert variant="danger">{this.state.error}</Alert>) : null
          }
          <p>Already have an account? Go to <Link to="/login">login</Link>.</p>
        </Form>
      </div>
    )
  }
}

export default Register