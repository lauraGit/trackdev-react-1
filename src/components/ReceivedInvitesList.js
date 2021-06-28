import { useState } from "react"
import Api from "../utils/api"
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'

const ReceivedInvitesList = ({ invites, onInvitesTouched }) => {
  const [ error, setError ] = useState(null)

  function handleAcceptClick(inviteId) {
    Api.patch(`/users/self/invites/${inviteId}`, null)
      .then(data =>  onInvitesTouched())
      .catch(error => setError(error?.details?.message || 'Unknown error') )
  }

  // Render
  if(invites == null) {
    return null
  }
  if(invites.length === 0) {
    return <p>You don't have any open received invites.</p>
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
            <th>For</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            invites.map(function(invite) {
              let inviteFor = null
              if(invite.roles && invite.roles.length > 0) {
                inviteFor = invite.roles.join(", ")
              } else if(invite.courseYear) {
                const courseName = invite.courseYear.course?.name + " " + invite.courseYear.startYear 
                inviteFor = courseName
              }
              return (
                <tr key={invite.id}>
                  <td>{invite.email}</td>
                  <td>{invite.state}</td>
                  <td>{inviteFor}</td>
                  <td>
                    <Button type="button" onClick={() => handleAcceptClick(invite.id)} variant="outline-secondary" size="sm">
                      Accept
                    </Button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>
    </div>
  )
}

export default ReceivedInvitesList