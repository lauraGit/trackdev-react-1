import { useState, Fragment } from "react"
import Api from "../utils/api"
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import SprintForm from "./SprintForm"

function getJsonDateString(date) {
  return date.toJSON().split('T')[0]
}

const emptySprint = {
  name: '',
  startDate: getJsonDateString(new Date()),
  endDate: getJsonDateString(new Date())
}

const CreateSprint = ( { backlogId, onDataTouched } ) => {
  const [mode, setMode] = useState("normal") // normal/create
  const [errors, setErrors] = useState({})
  const [formSprint, setFormSprint] = useState(emptySprint)
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
      name: formSprint.name,
      startDate: formSprint.startDate,
      endDate: formSprint.endDate
    })
    .then(data => {  
      onDataTouched()
      resetState()
    })
    .catch(error => setErrors({ create: error?.details?.message || 'Unknown error' }))
  }

  function resetState() {
    setMode("normal")
    setFormSprint(emptySprint)
    setErrors({})
    setValidated(false)
  }

  // Render
  return (
    <Fragment>
      <Button type="button" onClick={handleNewClick} variant="outline-primary" size="sm">
        New sprint
      </Button>
      <Modal show={mode === "create"} onHide={onCancel} animation={false}>
        <Modal.Header>
          <Modal.Title>New sprint</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <SprintForm onSubmit={handleSubmit} validated={validated} onCancel={onCancel}
                      sprint={formSprint} onSprintChange={(formData) => setFormSprint(formData)} error={errors.create}
                      submitButtonText="Create sprint" />
        </Modal.Body>
      </Modal>
    </Fragment>
  )
}

export default CreateSprint