import { useState, Fragment } from "react"
import Api from "../utils/api"
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'
import Alert from 'react-bootstrap/Alert'
import FormSubmitCancelButtons from "./FormSubmitCancelButtons"

const CreateSprint = ( { backlogId, onDataTouched } ) => {
  const [mode, setMode] = useState("normal") // normal/create
  const [errors, setErrors] = useState({})
  const [name, setName] = useState("")
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
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
    Api.post(`/backlogs/${backlogId}/sprints`, {
      name: name,
      startDate: startDate,
      endDate: endDate
    })
    .then(data => {  
      onDataTouched()
      resetState()
    })
    .catch(error => setErrors({ create: error?.details?.message || 'Unknown error' }))
  }

  function resetState() {
    setMode("normal")
    setName('')
    setStartDate(new Date())
    setEndDate(new Date())
    setErrors({})
    setValidated(false)
  }

  // Render
  return (
    <Fragment>
      <div>
        <Button type="button" onClick={handleNewClick} variant="outline-primary" size="sm">
          New sprint
        </Button>
      </div>
      <Modal show={mode === "create"} onHide={onCancel} animation={false}>
        <Modal.Header>
          <Modal.Title>New sprint</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} noValidate validated={validated}>
            <Form.Group controlId="create-sprint-name">
              <Form.Label>Name</Form.Label>
              <Form.Control name="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
              <Form.Control.Feedback type="invalid">
                  Please enter a valid name.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Row>
              <Form.Group as={Col} controlId="create-sprint-start-date">
                <Form.Label>Start date</Form.Label>
                <Form.Control name="startDate" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
                <Form.Control.Feedback type="invalid">
                    Please enter a valid start date.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} controlId="create-sprint-end-date">
                <Form.Label>End date</Form.Label>
                <Form.Control name="endDate" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
                <Form.Control.Feedback type="invalid">
                    Please enter a valid end date.
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            
            <FormSubmitCancelButtons submitButtonText="Create sprint" onCancelClick={onCancel} />
            {
              errors.create ? (<Alert variant="danger">{errors.create}</Alert>) : null
            }
          </Form>
        </Modal.Body>
      </Modal>
    </Fragment>
  )
}

export default CreateSprint