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
      .then(async response => {
        const data = await response.json();
        if(!response.ok) {
          this.setState({ errors: { edit: data.message } || 'Unknown error from server'})
        } else {
          this.props.onCourseChange(data)
          this.setState({mode: "normal", errors: {}})
        }
      })
      .catch(error => {
        this.setState({ errors: { edit: 'Unexpected error' }})
      })
  }

  handleInputChange(e) {
    let inputChange = {}
    inputChange[e.target.name] = e.target.value
    this.setState(inputChange)
  }

  handleDeleteClick() {
    Api.delete('/courses/' + this.props.course.id)
      .then(async response => {
        if(!response.ok) {
          const data = await response.json();
          this.setState({ errors: { delete: data.message } || 'Unknown error from server'})
        } else {
          this.setState({mode: "deleted", errors: {}})
        }
      })
      .catch(error => {
        this.setState({ errors: { delete: 'Unexpected error'}})
      })
  }

  render() {
    const course = this.props.course
    if(this.state.mode === "edit") {
      return (
        <div class="course-header-editable">
          <form onSubmit={this.handleSubmit} class="course-header-editable__content">
            <input type="text" name="name" value={this.state.name} onChange={this.handleInputChange}/>
            <button type="submit">Save</button>
            <button type="button" onClick={this.handleCancelClick}>Cancel</button>          
          </form>        
          <div class="course-header-editable__error">
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
      <div class="course-header-editable">
        <div class="course-header-editable__content">
          <h2>{course.name}</h2>
          <div>
            <button type="button" onClick={this.handleEditClick}>Edit</button>
            <button type="button" onClick={this.handleDeleteClick}>Delete</button>
          </div>
        </div>
        <div class="course-header-editable__error">
          {
            this.state.errors.delete ? (<p>{this.state.errors.delete}</p>) : null
          }
        </div>      
      </div>
    )
  }
}

export default CourseHeaderEditable