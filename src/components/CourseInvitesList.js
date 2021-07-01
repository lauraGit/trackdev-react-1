import { useState } from "react"
import Api from "../utils/api"
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'

const CourseInvitesList = ({ courseYearId, invites, onInvitesTouched }) => {
  const [ error, setError ] = useState(null)

  function handleDeleteClick(inviteId) {
    Api.delete(`/invites/${inviteId}`)
      .then(data =>  onInvitesTouched())
      .catch(error => setError(error?.details?.message || 'Unknown error') )
  }

  // Render
  if(invites == null) {
    return null
  }
  if(invites.length === 0) {
    return <p>You don't have any open invites for this course year.</p>
  }
  return (
    <div>
      {
        error ? <p>{error}</p> : null
      }
      <Table hover size="sm">
        <thead>
          <tr>
            <th>Email</th>
            <th>State</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            invites.map(invite => (
              <tr key={invite.id}>
                <td>{invite.email}</td>
                <td>{invite.state}</td>
                <td>
                  <Button type="button" onClick={() => handleDeleteClick(invite.id)} variant="outline-secondary" size="sm">
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </Table>
    </div>
  )
}

export default CourseInvitesList