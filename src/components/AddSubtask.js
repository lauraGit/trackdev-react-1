import { useState, Fragment } from "react"
import Api from "../utils/api"
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'
import Modal from 'react-bootstrap/Modal'
import FormSubmitCancelButtons from "./FormSubmitCancelButtons"

const AddSubtask = ( { taskId, onDataTouched }) => {
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

  function onCancel() {
    resetState()
  }

  async function requestCreate() {
    Api.post(`/tasks/${taskId}/subtasks`, {
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
  return (
    <Fragment>
      <div>
        <Button type="button" onClick={handleNewClick} variant="outline-primary" size="sm">
          New subtask
        </Button>
      </div>
      <Modal show={mode === "create"} onHide={onCancel} animation={false}>
        <Modal.Header>
          <Modal.Title>New subtask</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} noValidate validated={validated}>
            <Form.Group controlId="add-backlog-task-name">
              <Form.Label>Name</Form.Label>
              <Form.Control name="name" value={name} onChange={(e) => setName(e.target.value)}
                            required />
              <Form.Control.Feedback type="invalid">
                  Please enter a valid name.
              </Form.Control.Feedback>
            </Form.Group>
            <FormSubmitCancelButtons submitButtonText="Create subtask" onCancelClick={onCancel} />
            {
              errors.create ? (<Alert variant="danger">{errors.create}</Alert>) : null
            }
          </Form>
        </Modal.Body>
      </Modal>
    </Fragment>    
  )
}

export default AddSubtask