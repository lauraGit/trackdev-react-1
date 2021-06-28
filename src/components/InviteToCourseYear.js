import { useState } from "react"
import Api from "../utils/api"
import Button from 'react-bootstrap/Button'

const InviteToCourseYear = ( { courseYearId, onInvitesTouched } ) => {
  const [mode, setMode] = useState("normal") // normal/create
  const [errors, setErrors] = useState({})
  const [email, setEmail] = useState("")

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
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input name="email" value={email} required onChange={(e) => setEmail(e.target.value)} />  
        </label>
        <Button type="submit" variant="primary">
          Invite
        </Button>
        <Button type="button" onClick={handleCancelClick} variant="outline-secondary">
          Cancel
        </Button>
        {
          errors.create ? (<p>{errors.create}</p>) : null
        }
      </form>
    </div>
  )
}

export default InviteToCourseYear