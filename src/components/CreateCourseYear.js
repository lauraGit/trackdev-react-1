import { useState } from "react"
import Api from "../utils/api"
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const CreateCourseYear = (props) => {
  const [mode, setMode] = useState("normal") // normal/create
  const [errors, setErrors] = useState({})
  const [startYear, setStartYear] = useState("")

  function handleSubmit(e) {
    e.preventDefault();
    requestCreate();
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
  }

  // Render
  if(mode === "normal") {
    return (
      <div>
        <Button type="button" onClick={handleNewClick} variant="primary">
          New course year
        </Button>
      </div>
    )
  }

  return (
    <div>
      <h4>New course year</h4>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="create-course-year-start-year">
          <Form.Label>Start year</Form.Label>
          <Form.Control name="startYear" value={startYear} onChange={(e) => setStartYear(e.target.value)} required />
        </Form.Group>

        <Button type="submit" variant="primary">
          Create course year
        </Button>
        <Button type="button" onClick={handleCancelClick} variant="outline-secondary">
          Cancel
        </Button>
        {
          errors.create ? (<p>{errors.create}</p>) : null
        }
      </Form>
    </div>
  )
}

export default CreateCourseYear