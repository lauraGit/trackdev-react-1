import './group-card.css';
import { Link } from 'react-router-dom'
import UsersList from './UsersList'

const GroupCard = ( {group} ) => {
  if(group == null) {
    return null
  }
  return (
    <Link className="group-card" to={`/groups/${group.id}`}>
      <h4>{group.name}</h4>
      <p>Members</p>
      <UsersList users={group.members} />
    </Link>
  )
}

export default GroupCard