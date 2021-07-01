import { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import Restricted from '../../components/Restricted'
import Api from '../../utils/api'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'

class CreateCourse extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      created: false,
      error: '',
      courseId: 0,
      validated: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault();
    const isValidForm = e.currentTarget.checkValidity()
    this.setState( {validated: true})
    if(isValidForm === true) {
      this.requestCreate()
    }
  }

  requestCreate() {
    var requestBody = {
      name: this.state.name
    }
    Api.post('/courses', requestBody)
      .then(data => {  
        this.setState({ created: true, courseId: data.id })
      })
      .catch(error => this.setState({ error: error?.details?.message || 'Unknown error'}))
  }

  handleInputChange(e) {
    let inputChange = {}
    inputChange[e.target.name] = e.target.value
    this.setState(inputChange)
  }

  render() {
    if(this.state.created) {
      return (<Redirect to={`/courses/${this.state.courseId}`} />)
    }
    return (
      <Restricted allowed={["PROFESSOR"]} fallback={(<p>You don't have access to here.</p>)}>
        <div className="create-course">
          <h2>New course</h2>
          <Form onSubmit={this.handleSubmit} noValidate validated={this.state.validated}>
            <Form.Group controlId="create-course-name">
              <Form.Label>Name</Form.Label>
              <Form.Control name="name" value={this.state.name} onChange={this.handleInputChange} required />
              <Form.Control.Feedback type="invalid">
                Please enter a valid name.
              </Form.Control.Feedback>
            </Form.Group>
            
            <Button type="submit" variant="primary">Create course</Button>
            <Link to="/courses">Cancel</Link>
            {
              this.state.error ? (<Alert variant="danger">{this.state.error}</Alert>) : null
            }
          </Form>
        </div>
      </Restricted>
    )
  }
}

export default CreateCourse