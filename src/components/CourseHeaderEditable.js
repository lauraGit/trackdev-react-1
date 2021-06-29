import { Component } from "react"
import { Redirect } from "react-router-dom"
import Api from '../utils/api'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'

class CourseHeaderEditable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: this.props.course.name,
      errors: {},
      mode: "normal" // normal, edit, deleted
    }
    this.handleEditClick = this.handleEditClick.bind(this)
    this.handleCancelClick = this.handleCancelClick.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleDeleteClick = this.handleDeleteClick.bind(this)
  }

  handleEditClick() {
    this.setState({mode: "edit"})
  }

  handleCancelClick() {
    this.setState({mode: "normal"})
  }

  handleSubmit(e) {
    e.preventDefault();
    this.requestEditCourseDetails()
  }

  requestEditCourseDetails() {
    var requestBody = {
      name: this.state.name
    }
    Api.put('/courses/' + this.props.course.id, requestBody)
      .then(data => {        
        this.props.onCourseChange(data)
        this.setState({mode: "normal", errors: {}})        
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

  render() {
    const course = this.props.course
    if(this.state.mode === "edit") {
      return (
        <div>
          <Form onSubmit={this.handleSubmit}>
            <Form.Row className="align-items-center">
              <Col>
                <Form.Label htmlFor="course-header-editable-name" srOnly>Name</Form.Label>
                <Form.Control id="course-header-editable-name"
                    type="text" name="name" value={this.state.name} onChange={this.handleInputChange} />
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
          </Form>
          <div>
          {
              this.state.errors.edit ? (<p>{this.state.errors.edit}</p>) : null
          }
          </div>
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
            this.state.errors.delete ? (<p>{this.state.errors.delete}</p>) : null
          }
        </div>      
      </div>
    )
  }
}

export default CourseHeaderEditable