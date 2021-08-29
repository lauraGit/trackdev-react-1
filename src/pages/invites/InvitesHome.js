import { useEffect, useState } from "react"
import { LinkContainer } from "react-router-bootstrap"
import ReceivedInvitesList from "../../components/ReceivedInvitesList"
import RoleInvitesList from "../../components/RoleInvitesList"
import Restricted from "../../components/Restricted"
import Api from "../../utils/api"
import { Button } from 'react-bootstrap'
import Breadcrumbs from "../../components/Breadcrumbs"

const InvitesHome = (props) => {
  const [ isLoading, setIsLoading ] = useState(true)
  const [ hasError, setHasError] = useState(false)
  const [ sentInvites, setSentInvites ] = useState(null)
  const [ receivedInvites, setReceivedInvites ] = useState(null)

  useEffect(() => {
    requestSentInvites()
    requestReceivedInvites()
  }, [])

  function requestSentInvites() {
    Api.get(`/invites?type=role`)
      .then(data => setSentInvites(data))
      .catch(error => setHasError(true))
      .finally(() => setIsLoading(false))
  }

  function requestReceivedInvites() {
    Api.get('/users/self/invites')
      .then(data => setReceivedInvites(data))
      .catch(error => setHasError(true))
      .finally(() => setIsLoading(false))
  }

  function handleInvitesTouched() {
    requestSentInvites()
    requestReceivedInvites()
  }

  if(isLoading) {
    return <p>Loading...</p>
  }
  
  if(hasError) {
    return <p>Error retrieving data.</p>
  }

  let links = [];
  links.push({ text: "Home", href: '/'});
  links.push({ text: "Invites" });

  return (
    <div>
      <Breadcrumbs links={links} />
      <h2>Invites</h2>
      <div>
        <h3>Received</h3>
        <ReceivedInvitesList invites={receivedInvites} onInvitesTouched={handleInvitesTouched} />
      </div>
      <Restricted allowed={["PROFESSOR", "ADMIN"]}>
        <div>
          <h3>Sent</h3>
          <LinkContainer to="/invites/create"><Button size="sm" className="mb-3">Invite</Button></LinkContainer>
          <RoleInvitesList invites={sentInvites} onInvitesTouched={handleInvitesTouched} />
        </div>
      </Restricted>
    </div>
  )
}

export default InvitesHome