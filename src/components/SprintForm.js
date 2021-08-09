import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'
import FormSubmitCancelButtons from "./FormSubmitCancelButtons"

function getJsonDateString(date) {
  return date.toJSON().split('T')[0]
}

function getInputDateValue(stringValue) {
  return stringValue ? getJsonDateString(new Date(stringValue)) : stringValue
}

const SprintForm = ( { onSubmit, validated, error, sprint, onCancel, submitButtonText, onSprintChange } ) => {

  function handleInputChange(e) {
    let newSprint = {...sprint}
    newSprint[e.target.name] = e.target.value
    onSprintChange(newSprint)
  }

  if(!sprint) {
    return null
  }

  return (
    <Form onSubmit={onSubmit} noValidate validated={validated}>
      <Form.Group controlId="create-sprint-name">
        <Form.Label>Name</Form.Label>
        <Form.Control name="name" type="text" value={sprint.name} onChange={handleInputChange} required />
        <Form.Control.Feedback type="invalid">
            Please enter a valid name.
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Row>
        <Form.Group as={Col} controlId="create-sprint-start-date">
          <Form.Label>Start date</Form.Label>
          <Form.Control name="startDate" type="date" value={getInputDateValue(sprint.startDate)} onChange={handleInputChange} required />
          <Form.Control.Feedback type="invalid">
              Please enter a valid start date.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} controlId="create-sprint-end-date">
          <Form.Label>End date</Form.Label>
          <Form.Control name="endDate" type="date" value={getInputDateValue(sprint.endDate)} onChange={handleInputChange} required />
          <Form.Control.Feedback type="invalid">
              Please enter a valid end date.
          </Form.Control.Feedback>
        </Form.Group>
      </Form.Row>
      
      <FormSubmitCancelButtons submitButtonText={submitButtonText} onCancelClick={onCancel} />
      {
        error ? (<Alert variant="danger">{error}</Alert>) : null
      }
    </Form>
  )
}

export default SprintForm