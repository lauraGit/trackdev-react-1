import { Component } from "react"
import { Redirect } from "react-router-dom"
import Api from '../utils/api'
import ConfirmationModal from './ConfirmationModal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'
import EditableHeader from "./EditableHeader"

class CourseHeaderEditable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: this.props.course.name,
      errors: {},
      mode: "normal", // normal, edit, deleted
      validated: false
    }
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleNameEditing = this.handleNameEditing.bind(this)
    this.handleDeleteClick = this.handleDeleteClick.bind(this)
    this.handleDismissAlert = this.handleDismissAlert.bind(this)
    this.handleCancelDelete = this.handleCancelDelete.bind(this)
    this.handleActualDelete = this.handleActualDelete.bind(this)
  }

  handleNameEditing(isEditing) {
    this.setState({ mode: isEditing ? 'edit' : 'normal'})
  }

  handleNameChange(newName) {
    var requestBody = {
      name: newName
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

  handleActualDelete() {
    Api.delete('/courses/' + this.props.course.id)
      .then(data => {
        this.setState({mode: "deleted", errors: {}, askConfirmDelete: false})
      })
      .catch(error => {
        this.setState({ errors: { delete: error?.details?.message || 'Unknown error' }, askConfirmDelete: false })
      })
  }

  handleCancelDelete() {
    this.setState({askConfirmDelete: false})
  }

  handleDeleteClick() {
    this.setState({askConfirmDelete: true})
  }

  handleDismissAlert() {
    this.setState({ errors: {}})
  }

  render() {
    const course = this.props.course
    if(this.state.mode === "deleted") {
      return (<Redirect to="/courses" />)
    }
    return (
      <div>
        <Form.Row className="align-items-center">
          <Col>
            <EditableHeader
              title={course.name}              
              isEditing={this.state.mode === 'edit'}
              error={this.state.errors?.edit}
              fieldLabel="Name"
              fieldValidationMessage="Please enter a valid name"
              onEditing={this.handleNameEditing}
              onChange={this.handleNameChange}
             />
          </Col>
          <Col xs="auto">
            <Button type="button" onClick={this.handleDeleteClick} variant="outline-secondary" size="sm">
              Delete
            </Button>
          </Col>
        </Form.Row>
        <ConfirmationModal show={this.state.askConfirmDelete}
            title="Sure you want to delete this course?"
            onCancel={this.handleCancelDelete}
            onConfirm={this.handleActualDelete}
            >
          <p>Please keep in mind that when a course is deleted all its groups, invites, backlogs and tasks are deleted as well.</p>
          <p>You cannot recover from this action.</p>
        </ConfirmationModal>
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