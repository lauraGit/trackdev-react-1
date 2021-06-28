import { useState } from "react"
import Api from "../utils/api"

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
      <table>
        <tr>
          <th>Email</th>
          <th>State</th>
          <th>For</th>
          <th></th>
        </tr>
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
                <td><button type="button" onClick={() => handleAcceptClick(invite.id)}>Accept</button></td>
              </tr>
            )
          })
        }
      </table>
    </div>
  )
}

export default ReceivedInvitesList