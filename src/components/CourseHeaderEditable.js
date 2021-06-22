import './course-header-editable.css';
import { Component } from "react"
import Api from '../utils/api'

class CourseHeaderEditable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: this.props.course.name,
      edited: false,
      hasApiError: false,
      errorMessage: '',
      mode: "normal"
    }
    this.handleEditClick = this.handleEditClick.bind(this)
    this.handleCancelClick = this.handleCancelClick.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
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
          const data = await response.json();
          this.setState({ hasApiError: true, errorMessage: data.message || 'Unknown error from server'})
        } else {
          this.props.onCourseChange(data)
          this.setState({mode: "normal"})
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
    const course = this.props.course
    if(this.state.mode === "edit") {
      return (
        <form onSubmit={this.handleSubmit} class="course-header-editable">
          <input type="text" name="name" value={this.state.name} onChange={this.handleInputChange}/>
          <button type="submit">Save</button>
          <button type="button" onClick={this.handleCancelClick}>Cancel</button>
          {
            this.state.hasApiError ? (<p>{this.state.errorMessage}</p>) : null
          }
        </form>
      )
    }
    return (
      <div class="course-header-editable">
        <h2>{course.name}</h2>
        <button type="button" onClick={this.handleEditClick}>Edit</button>
      </div>
    )
  }
}

export default CourseHeaderEditable