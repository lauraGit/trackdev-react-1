import { useState } from "react"
import Api from "../utils/api"
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'
import FormSubmitCancelButtons from "./FormSubmitCancelButtons"

const CreateCourseYear = (props) => {
  const [mode, setMode] = useState("normal") // normal/create
  const [errors, setErrors] = useState({})
  const [startYear, setStartYear] = useState("")
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
    Api.post(`/courses/${props.courseId}/years`, {
      startYear: startYear
    })
    .then(data => {
      props.onCourseTouched()
      resetState()
    })
    .catch(error => setErrors({ create: error?.details?.message || 'Unknown error' }))
  }

  function resetState() {
    setMode("normal")
    setStartYear("")
    setErrors({})
    setValidated(false)
  }

  // Render
  if(mode === "normal") {
    return (
      <div className="mb-3">
        <Button type="button" onClick={handleNewClick} variant="primary" size="sm">
          New course year
        </Button>
      </div>
    )
  }

  return (
    <div className="mb-3">
      <h4>New course year</h4>
      <Form onSubmit={handleSubmit} noValidate validated={validated}>
        <Form.Group controlId="create-course-year-start-year">
          <Form.Label>Start year</Form.Label>
          <Form.Control name="startYear" value={startYear} onChange={(e) => setStartYear(e.target.value)}
                        type="number" required min="2020" max="3000" />
          <Form.Control.Feedback type="invalid">
              Please enter a valid start year.
          </Form.Control.Feedback>
        </Form.Group>
        <FormSubmitCancelButtons submitButtonText="Create course year" onCancelClick={handleCancelClick} />
        {
          errors.create ? (<Alert variant="danger">{errors.create}</Alert>) : null
        }
      </Form>
    </div>
  )
}

export default CreateCourseYear