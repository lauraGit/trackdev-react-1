import { Component } from 'react'
import Api from '../utils/api'

class CreateCourse extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      created: false,
      hasApiError: false,
      errorMessage: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ hasApiError: false, errorMessage: ''})
    this.requestCreate()
  }

  requestCreate() {
    var requestBody = {
      name: this.state.name
    }
    Api.post('/courses', requestBody)
      .then(async response => {
        if(!response.ok) {
          const errorData = await response.json();
          this.setState({ hasApiError: true, errorMessage: errorData.message || 'Unknown error from server'})
        } else {
          this.setState({ created: true })
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
    if(this.state.created) {
      return (<div><p>You have created the new course successfully.</p></div>)
    }
    return (
      <div className="create-course">
        <h2>New course</h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name
            <input name="name" value={this.state.name} onChange={this.handleInputChange}/>
          </label>          
          <button type="submit">Create course</button>
          {
            this.state.hasApiError ? (<p>{this.state.errorMessage}</p>) : null
          }
        </form>
      </div>
    )
  }
}

export default CreateCourse