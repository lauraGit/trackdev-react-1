import './user-list.css'
import UserMention from './UserMention'

const UsersList = ( { users }) => {
  return (
    <span className="user-list">
      {
        users?.map(user => (<UserMention key={user.username} user={user} />) )
      }
    </span>
  )
}

export default UsersList