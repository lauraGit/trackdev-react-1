import './user-list.css'

const UsersList = ( { users }) => {
  return (
    <div className="user-list">
      {
        users?.map(user => (<div key={user.username} className="user-mention">{user.username}</div>) )
      }
    </div>
  )
}

export default UsersList