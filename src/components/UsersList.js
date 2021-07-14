import './user-list.css'

const UsersList = ( { users }) => {
  return (
    <span className="user-list">
      {
        users?.map(user => (<span key={user.username} className="user-mention">{user.username}</span>) )
      }
    </span>
  )
}

export default UsersList