import { Component } from 'react'
import { Link, Redirect, withRouter } from 'react-router-dom'
import Restricted from '../../components/Restricted'
import MultiListInput from '../../components/MultiListInput'
import Api from '../../utils/api'
import withData from '../../components/withData'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'

class EditGroup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: this.props.group?.name || '',
      members: this.props.group?.members.map(u => u.username) || [],
      edited: false,
      error: '',
      students: [],
      validated: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleMultiListInputChange = this.handleMultiListInputChange.bind(this)
  }

  componentDidMount() {
    if(this.props.group) {
      this.requestStudents()
    }
  }

  componentDidUpdate(prevProps) {
    if(this.props.group !== prevProps.group) {
      this.setState({
        name: this.props.group?.name,
        members: this.props.group?.members.map(u => u.username)
      })
      this.requestStudents()
    }
  }

  requestStudents() {
    Api.get(`/courses/years/${this.props.group.courseYear.id}/students`)
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
    Api.patch(`/groups/${this.props.group.id}`, requestBody)
      .then(data => this.setState({ edited: true }) )
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
    if(this.props.group == null) {
      return null
    }

    const backUrl = `/groups/${this.props.group.id}`
    const possibleStudents = this.state.students
                        .map(student => student.username)

    if(this.state.edited) {
      return (<Redirect to={backUrl} />)
    }
    return (
      <Restricted allowed={["PROFESSOR"]} fallback={(<p>You don't have access to here.</p>)}>
        <div className="edit-group">
          <h2>Edit group</h2>
          <Form onSubmit={this.handleSubmit} noValidate validated={this.state.validated}>
            <Form.Group controlId="edit-group-name">
              <Form.Label>Name</Form.Label>
              <Form.Control name="name" value={this.state.name} onChange={this.handleInputChange} required />
              <Form.Control.Feedback type="invalid">
                Please enter a valid name.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="edit-group-name-new-member">Members</Form.Label>
              <MultiListInput values={this.state.members} onValuesChange={this.handleMultiListInputChange}
                            id="edit-group-name-new-member" possibleValues={possibleStudents}/>  
            </Form.Group>

            <Button type="submit" variant="primary">Save group</Button>
            <Link to={backUrl}>Cancel</Link>
            {
              this.state.error ? (<Alert variant="danger">{this.state.error}</Alert>) : null
            }
          </Form>
        </div>
      </Restricted>
    )
  }
}

const EditGroupWithData = withData(
  EditGroup,
  'group',
  (props) => Api.get(`/groups/${props.match.params.groupId}`))

export default withRouter(EditGroupWithData)