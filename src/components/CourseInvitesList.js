const CourseInvitesList = ({ invites }) => {
  return (
    <div>
      <table>
        <tr>
          <th>Email</th>
          <th>State</th>
        </tr>
        {
          invites.map(invite => (
            <tr key={invite.id}>
              <td>{invite.email}</td>
              <td>{invite.state}</td>
            </tr>
          ))
        }
      </table>
    </div>
  )
}

export default CourseInvitesList