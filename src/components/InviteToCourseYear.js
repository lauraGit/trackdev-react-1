import { useState } from "react"
import Api from "../utils/api"
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'

const InviteToCourseYear = ( { courseYearId, onInvitesTouched } ) => {
  const [mode, setMode] = useState("normal") // normal/create
  const [errors, setErrors] = useState({})
  const [email, setEmail] = useState("")
  const [validated, setValidated] = useState(false)

  function handleSubmit(e) {
    e.preventDefault();
    const isValidForm = e.currentTarget.checkValidity()
    setValidated(true)
    if(isValidForm === true) {
      requestCreate()
    }
  }

  function handleNewClick() {
    setMode("create")
  }

  function handleCancelClick() {
    resetState()
  }

  async function requestCreate() {
    Api.post(`/courses/years/${courseYearId}/invites`, {
      email: email
    })
    .then(data => {  
      onInvitesTouched()
      resetState()
    })
    .catch(error => setErrors({ create: error?.details?.message || 'Unknown error' }))
  }

  function resetState() {
    setMode("normal")
    setEmail("")
    setErrors({})
    setValidated(false)
  }

  // Render
  if(mode === "normal") {
    return (
      <div>
        <Button type="button" onClick={handleNewClick} variant="primary">
          Invite
        </Button>
      </div>
    )
  }

  return (
    <div>
      <h4>Invite to course year</h4>
      <Form onSubmit={handleSubmit} noValidate validated={validated}>
        <Form.Group controlId="invite-to-course-email">
          <Form.Label>Email</Form.Label>
          <Form.Control name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Form.Control.Feedback type="invalid">
              Please enter a valid email.
          </Form.Control.Feedback>
        </Form.Group>

        <Button type="submit" variant="primary">
          Invite
        </Button>
        <Button type="button" onClick={handleCancelClick} variant="outline-secondary">
          Cancel
        </Button>
        {
          errors.create ? (<Alert variant="danger">{errors.create}</Alert>) : null
        }
      </Form>
    </div>
  )
}

export default InviteToCourseYear