import './course-header-editable.css';
import { Component } from "react"
import { Redirect } from "react-router-dom"
import Api from '../utils/api'

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
        <div className="course-header-editable">
          <form onSubmit={this.handleSubmit} className="course-header-editable__content">
            <input type="text" name="name" value={this.state.name} onChange={this.handleInputChange}/>
            <button type="submit">Save</button>
            <button type="button" onClick={this.handleCancelClick}>Cancel</button>          
          </form>        
          <div className="course-header-editable__error">
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
      <div className="course-header-editable">
        <div className="course-header-editable__content">
          <h2>{course.name}</h2>
          <div>
            <button type="button" onClick={this.handleEditClick}>Edit</button>
            <button type="button" onClick={this.handleDeleteClick}>Delete</button>
          </div>
        </div>
        <div className="course-header-editable__error">
          {
            this.state.errors.delete ? (<p>{this.state.errors.delete}</p>) : null
          }
        </div>      
      </div>
    )
  }
}

export default CourseHeaderEditable