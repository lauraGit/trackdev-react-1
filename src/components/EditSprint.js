import { useState, useEffect, Fragment } from "react"
import Api from "../utils/api"
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import SprintForm from "./SprintForm"

const EditSprint = ( { sprint, onDataTouched } ) => {
  const [mode, setMode] = useState("normal") // normal/edit
  const [errors, setErrors] = useState({})
  const [validated, setValidated] = useState(false)
  const [formSprint, setFormSprint] = useState(sprint)

  useEffect(function() {
    setFormSprint(sprint)
  }, [sprint])

  function handleSubmit(e) {
    e.preventDefault();
    const isValidForm = e.currentTarget.checkValidity()
    setValidated(true)
    if(isValidForm === true) {
      requestSave()
    }
  }

  function handleButtonClick() {
    setMode("edit")
  }

  function onCancel() {
    resetState()
  }

  async function requestSave() {
    Api.patch(`/sprints/${sprint.id}`, {
      name: formSprint.name,
      startDate: formSprint.startDate,
      endDate: formSprint.endDate
    })
    .then(data => {  
      onDataTouched()
      resetState()
    })
    .catch(error => setErrors({ edit: error?.details?.message || 'Unknown error' }))
  }

  function resetState() {
    setMode("normal")
    setFormSprint(sprint)
    setErrors({})
    setValidated(false)
  }

  // Render
  return (
    <Fragment>
      <div>
        <Button type="button" onClick={handleButtonClick} variant="outline-primary" size="sm">
          Edit
        </Button>
      </div>
      <Modal show={mode === "edit"} onHide={onCancel} animation={false}>
        <Modal.Header>
          <Modal.Title>Edit sprint</Modal.Title>
        </Modal.Header>
        <Modal.Body>    
          <SprintForm onSubmit={handleSubmit} validated={validated} onCancel={onCancel}
                      sprint={formSprint} onSprintChange={(formData) => setFormSprint(formData)} error={errors.edit}
                      submitButtonText="Save sprint" />
        </Modal.Body>
      </Modal>
    </Fragment>
  )
}

export default EditSprint