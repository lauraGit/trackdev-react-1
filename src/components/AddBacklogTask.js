import { useState } from "react"
import Api from "../utils/api"
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'

const AddBacklogTask = ( { backlogId, onDataTouched }) => {
  const [mode, setMode] = useState("normal") // normal/create
  const [errors, setErrors] = useState({})
  const [name, setName] = useState("")
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
    Api.post(`/backlogs/${backlogId}/tasks`, {
      name: name
    })
    .then(data => {
      onDataTouched()
      resetState()
    })
    .catch(error => setErrors({ create: error?.details?.message || 'Unknown error' }))
  }

  function resetState() {
    setMode("normal")
    setName("")
    setErrors({})
    setValidated(false)
  }

  // Render
  if(mode === "normal") {
    return (
      <div>
        <Button type="button" onClick={handleNewClick} variant="primary">
          New task
        </Button>
      </div>
    )
  }

  return (
    <div>
      <h4>New task</h4>
      <Form onSubmit={handleSubmit} noValidate validated={validated}>
        <Form.Group controlId="add-backlog-task-name">
          <Form.Label>Name</Form.Label>
          <Form.Control name="name" value={name} onChange={(e) => setName(e.target.value)}
                        required />
          <Form.Control.Feedback type="invalid">
              Please enter a valid name.
          </Form.Control.Feedback>
        </Form.Group>

        <Button type="submit" variant="primary">
          Create task
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

export default AddBacklogTask