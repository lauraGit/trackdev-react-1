import { Component } from "react"
import { Redirect } from "react-router-dom"
import Api from '../utils/api'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'

class CourseHeaderEditable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: this.props.course.name,
      errors: {},
      mode: "normal", // normal, edit, deleted
      validated: false
    }
    this.handleEditClick = this.handleEditClick.bind(this)
    this.handleCancelClick = this.handleCancelClick.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleDeleteClick = this.handleDeleteClick.bind(this)
    this.handleDismissAlert = this.handleDismissAlert.bind(this)
  }

  handleEditClick() {
    this.setState({mode: "edit"})
  }

  handleCancelClick() {
    this.setState({mode: "normal", error: null, validated: false})
  }

  handleSubmit(e) {
    e.preventDefault();
    const isValidForm = e.currentTarget.checkValidity()
    this.setState( {validated: true})
    if(isValidForm === true) {
      this.requestEditCourseDetails()
    }
  }

  requestEditCourseDetails() {
    var requestBody = {
      name: this.state.name
    }
    Api.put('/courses/' + this.props.course.id, requestBody)
      .then(data => {        
        this.props.onCourseChange(data)
        this.setState({mode: "normal", errors: {}, validated: false})        
      })
      .catch(error => {
        this.setState({ errors: { edit: error?.details?.message || 'Unknown error' }})
      })
  }

  handleInputChange(e) {
    let inputChange = {}
    inputChange[e.target.name] = e.target.value
    this.setState(inputChange)
  }

  handleDeleteClick() {
    Api.delete('/courses/' + this.props.course.id)
      .then(data => {
          this.setState({mode: "deleted", errors: {}})
      })
      .catch(error => {
        this.setState({ errors: { delete: error?.details?.message || 'Unknown error' }})
      })
  }

  handleDismissAlert() {
    this.setState({ errors: {}})
  }

  render() {
    const course = this.props.course
    if(this.state.mode === "edit") {
      return (
        <div>
          <Form onSubmit={this.handleSubmit} noValidate validated={this.state.validated}>
            <Form.Row className="align-items-center">
              <Col>
                <Form.Label htmlFor="course-header-editable-name" srOnly>Name</Form.Label>
                <Form.Control id="course-header-editable-name"
                    type="text" name="name" value={this.state.name} onChange={this.handleInputChange} required />
                <Form.Control.Feedback type="invalid">
                  Please enter a valid name.
                </Form.Control.Feedback>
              </Col>
              <Col xs="auto">
                <Button type="submit" variant="primary" size="sm">
                  Save
                </Button>
              </Col>
              <Col xs="auto">
                <Button type="button" onClick={this.handleCancelClick} variant="outline-secondary" size="sm" >
                    Cancel
                </Button>
              </Col>
            </Form.Row>
            <div>
            {
                this.state.errors.edit ? (<Alert variant="danger">{this.state.errors.edit}</Alert>) : null
            }
            </div>
          </Form>
        </div>        
      )
    }
    if(this.state.mode === "deleted") {
      return (<Redirect to="/courses" />)
    }
    return (
      <div>
        <Form.Row>
          <Col><h2>{course.name}</h2></Col>
          <Col xs="auto">
            <Button type="submit" onClick={this.handleEditClick} variant="outline-primary" size="sm">
              Edit
            </Button>
          </Col>
          <Col xs="auto">
            <Button type="button" onClick={this.handleDeleteClick} variant="outline-secondary" size="sm">
              Delete
            </Button>
          </Col>
        </Form.Row>
        <div>
          {
            this.state.errors.delete
              ? (
                <Alert variant="danger" dismissible onClose={this.handleDismissAlert}>
                  {this.state.errors.delete}
                </Alert>
                )
              : null
          }
        </div>      
      </div>
    )
  }
}

export default CourseHeaderEditable