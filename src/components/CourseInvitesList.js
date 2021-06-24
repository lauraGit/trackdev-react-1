import { useState } from "react"
import Api from "../utils/api"

const CourseInvitesList = ({ courseYearId, invites, onInvitesTouched }) => {
  const [ error, setError ] = useState(null)

  function handleDeleteClick(inviteId) {
    Api.delete(`/invites/${inviteId}`)
      .then(async response => {
        if(!response.ok) {
          const data = await response.json();
          setError( data.message || 'Unknown error from server' )
        } else {
          onInvitesTouched()
        }
      })
      .catch(error => {
        setError('Unexpected error')
      })
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
          <th></th>
        </tr>
        {
          invites.map(invite => (
            <tr key={invite.id}>
              <td>{invite.email}</td>
              <td>{invite.state}</td>
              <td><button type="button" onClick={() => handleDeleteClick(invite.id)}>Delete</button></td>
            </tr>
          ))
        }
      </table>
    </div>
  )
}

export default CourseInvitesList