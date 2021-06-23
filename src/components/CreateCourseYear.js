import { useState } from "react"
import Api from "../utils/api"

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
    .then(async response => {
      const data = await response.json();
      if(!response.ok) {
        setErrors({ create: data.message || 'Unknown error from server' })
      } else {
        props.onCourseTouched()
        resetState()
      }
    })
    .catch(error => {
      setErrors({ create: 'Unexpected error' })
    })
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
        <button type="button" onClick={handleNewClick}>New course year</button>
      </div>
    )
  }

  return (
    <div>
      <h4>New course year</h4>
      <form onSubmit={handleSubmit}>
        <label>
          Start year
          <input name="startYear" value={startYear} required onChange={(e) => setStartYear(e.target.value)} />  
        </label>
        <button type="submit">Create course year</button>
        <button type="button" onClick={handleCancelClick}>Cancel</button>
        {
          errors.create ? (<p>{errors.create}</p>) : null
        }
      </form>
    </div>
  )
}

export default CreateCourseYear