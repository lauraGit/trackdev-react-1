import { Component } from 'react'
import Api from '../../utils/api'

class CreateInvite extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      roles: [],
      created: false,
      error: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleMultipleSelectChange = this.handleMultipleSelectChange.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ error: ''})
    this.requestCreateInvite()
  }

  requestCreateInvite() {
    var requestBody = {
      email: this.state.email,
      roles: this.state.roles
    }
    Api.post('/invites', requestBody)
      .then(data => {
        this.setState({ created: true })        
      })
      .catch(error => this.setState({ error: error?.details?.message || 'Unknown error'}) )
  }

  handleInputChange(e) {
    let inputChange = {}
    inputChange[e.target.name] = e.target.value
    this.setState(inputChange)
  }

  handleMultipleSelectChange(e) {
    let inputChange = {}
    const options = Array.from(e.target.options)
    inputChange[e.target.name] = options
        .filter(o => o.selected)
        .map(o => o.value)
    this.setState(inputChange)
  }

  render() {
    if(this.state.created) {
      return (<div><p>Invite has been created successfully.</p></div>)
    }
    return (
      <div className="create-invite">
        <h2>Invite</h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            Email
            <input name="email" value={this.state.email} onChange={this.handleInputChange} required />
          </label>
          <label>
            Role
            <select name="roles" value={this.state.roles} onChange={this.handleMultipleSelectChange} multiple={true} required>
                <option value="" disabled>Not selected</option>
                <option value="STUDENT">Student</option>
                <option value="PROFESSOR">Professor</option>
                <option value="ADMIN">Admin</option>
            </select>
          </label>
          <button type="submit">Invite</button>
          {
            this.state.error ? (<p>{this.state.error}</p>) : null
          }
        </form>
      </div>
    )
  }
}

export default CreateInvite