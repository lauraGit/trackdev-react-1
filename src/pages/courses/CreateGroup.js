import { Component } from 'react'
import { withRouter } from "react-router"
import { Link, Redirect } from 'react-router-dom'
import Restricted from '../../components/Restricted'
import MultiListInput from '../../components/MultiListInput'
import Api from '../../utils/api'

class CreateGroup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      members: [],
      created: false,
      error: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleMultiListInputChange = this.handleMultiListInputChange.bind(this)
    this.courseYearId = this.props.match.params.courseYearId
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ error: ''})
    this.requestCreate()
  }

  requestCreate() {
    var requestBody = {
      name: this.state.name,
      members: this.state.members
    }
    Api.post(`/courses/years/${this.courseYearId}/groups`, requestBody)
      .then(data => this.setState({ created: true }) )
      .catch(error => this.setState({ error: error?.details?.message || 'Unknown error'}))
  }

  handleInputChange(e) {
    let inputChange = {}
    inputChange[e.target.name] = e.target.value
    this.setState(inputChange)
  }

  handleMultiListInputChange(newValues) {
    this.setState({ members: newValues })
  }

  render() {
    const backUrl = `/courses/years/${this.courseYearId}`

    if(this.state.created) {
      return (<Redirect to={backUrl} />)
    }
    return (
      <Restricted allowed={["PROFESSOR"]} fallback={(<p>You don't have access to here.</p>)}>
        <div className="create-group">
          <h2>New group</h2>
          <form onSubmit={this.handleSubmit}>
            <label>
              Name
              <input name="name" value={this.state.name} onChange={this.handleInputChange} required />
            </label>

            Members
            <MultiListInput values={this.state.members} onValuesChange={this.handleMultiListInputChange}/>  

            <button type="submit">Create group</button><Link to={backUrl}>Cancel</Link>
            {
              this.state.error ? (<p>{this.state.error}</p>) : null
            }
          </form>
        </div>
      </Restricted>
    )
  }
}

export default withRouter(CreateGroup)