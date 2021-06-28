import { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import Restricted from '../../components/Restricted'
import Api from '../../utils/api'

class CreateCourse extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      created: false,
      error: '',
      courseId: 0
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ error: ''})
    this.requestCreate()
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
          <form onSubmit={this.handleSubmit}>
            <label>
              Name
              <input name="name" value={this.state.name} onChange={this.handleInputChange} required />
            </label>          
            <button type="submit">Create course</button><Link to="/courses">Cancel</Link>
            {
              this.state.error ? (<p>{this.state.error}</p>) : null
            }
          </form>
        </div>
      </Restricted>
    )
  }
}

export default CreateCourse