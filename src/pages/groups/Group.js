import { Link, withRouter } from 'react-router-dom'
import withData from '../../components/withData'
import UsersList from '../../components/UsersList'
import Restricted from '../../components/Restricted'
import Api from '../../utils/api'

const Group = ({ group }) => {
  if(group == null) {
    return null
  }
  return (
    <div>
      <h2>{group.name}</h2>
      <p>Members</p>
      <UsersList users={group.members} />
      <Restricted allowed={["PROFESSOR"]} >
        <Link to={`/groups/${group.id}/edit`}>Edit group</Link>
      </Restricted>      
    </div>
  )
}

const GroupWithData = withData(
  Group,
  'group',
  (props) => Api.get(`/groups/${props.match.params.groupId}`))

export default withRouter(GroupWithData)