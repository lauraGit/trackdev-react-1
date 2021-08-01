import { Component } from 'react'
import { withRouter } from "react-router"
import { Redirect } from 'react-router-dom'
import Restricted from '../../components/Restricted'
import MultiListInput from '../../components/MultiListInput'
import FormSubmitCancelButtons from '../../components/FormSubmitCancelButtons'
import Api from '../../utils/api'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'

class CreateGroup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      members: [],
      created: false,
      error: '',
      students: [],
      validated: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleMultiListInputChange = this.handleMultiListInputChange.bind(this)
    this.courseYearId = this.props.match.params.courseYearId
  }

  componentDidMount() {
    this.requestStudents()
  }

  requestStudents() {
    Api.get(`/courses/years/${this.courseYearId}/students`)
      .then(data => this.setState({ students: data}))
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ error: ''})
    const isValidForm = e.currentTarget.checkValidity()
    this.setState( {validated: true})
    if(isValidForm === true) {
      this.requestCreate()
    }
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
    const possibleStudents = this.state.students
                        .map(student => student.username)

    if(this.state.created) {
      return (<Redirect to={backUrl} />)
    }
    return (
      <Restricted allowed={["PROFESSOR"]} fallback={(<p>You don't have access to here.</p>)}>
        <div className="create-group">
          <h2>New group</h2>
          <Form onSubmit={this.handleSubmit} noValidate validated={this.state.validated}>
            <Form.Group controlId="create-group-name">
              <Form.Label>Name</Form.Label>
              <Form.Control name="name" value={this.state.name} onChange={this.handleInputChange} required />
              <Form.Control.Feedback type="invalid">
                Please enter a valid name.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="create-group-name-new-member">Members</Form.Label>
              <MultiListInput values={this.state.members} onValuesChange={this.handleMultiListInputChange}
                            id="create-group-name-new-member" possibleValues={possibleStudents}/>  
            </Form.Group>
            <FormSubmitCancelButtons submitButtonText="Create group" cancelUrl={backUrl} />
            {
              this.state.error ? (<Alert variant="danger">{this.state.error}</Alert>) : null
            }
          </Form>
        </div>
      </Restricted>
    )
  }
}

export default withRouter(CreateGroup)