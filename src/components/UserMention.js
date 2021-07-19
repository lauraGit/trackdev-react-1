import './user-mention.css'

const UserMention = ( { user }) => {
  return (
    <span key={user.username} className="user-mention">
      {user.username}
    </span>
    )
}

export default UserMention