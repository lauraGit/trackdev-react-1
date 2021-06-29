import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router"
import { Link } from "react-router-dom"
import InviteToCourseYear from "../../components/InviteToCourseYear"
import CourseInvitesList from "../../components/CourseInvitesList"
import CourseStudentsList from "../../components/CourseStudentsList"
import CourseGroupsList from "../../components/CourseGroupsList"
import Restricted from '../../components/Restricted'
import Api from "../../utils/api"
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import UserContext from "../../contexts/UserContext"

const CourseYear = (props) => {
  let { courseYearId } = useParams()
  const [ isLoading, setIsLoading ] = useState(true)
  const [ hasError, setHasError] = useState(false)
  const [ invites, setInvites ] = useState(null)
  const [ students, setStudents ] = useState(null)
  const [ groups, setGroups ] = useState(null)
  const { user } = useContext(UserContext)
 
  useEffect(() => {
    requestInvites()
    requestStudents()
    requestGroups()
  }, [])

  function requestInvites() {
    Api.get(`/invites?type=courseYear&courseYearId=${courseYearId}`)
      .then(data => setInvites(data))
      .catch(error => setHasError(true))
      .finally(() => setIsLoading(false))
  }

  function requestStudents() {
    Api.get(`/courses/years/${courseYearId}/students`)
      .then(data => setStudents(data))
      .catch(error => setHasError(true))
      .finally(() => setIsLoading(false))
  }

  function requestGroups() {
    Api.get(`/courses/years/${courseYearId}/groups`)
      .then(data => setGroups(data))
      .catch(error => setHasError(true))
      .finally(() => setIsLoading(false))
  }

  function handleInvitesTouched() {
    requestInvites()
  }

  function handleStudentsTouched() {
    requestStudents()
  }

  function handleGroupsTouched() {
    requestGroups()
  }


  // Render
  if(isLoading) {
    return <p>Loading...</p>
  }

  if(hasError) {
    return <p>Error retrieving data.</p>
  }

  const groupsTab = (
    <Tab eventKey="groups" title="Groups">
      <div>
        <Restricted allowed={["PROFESSOR"]}>
          <Link to={`/courses/years/${courseYearId}/groups/create`}>New group</Link>
        </Restricted>
        <CourseGroupsList courseYearId={courseYearId} groups={groups} onGroupsTouched={handleGroupsTouched} />
      </div>
    </Tab>
  )

  const studentsTab = (
    <Tab eventKey="students" title="Students">
      <div>
        <CourseStudentsList courseYearId={courseYearId} students={students} onStudentsTouched={handleStudentsTouched} />
      </div>
    </Tab>
  )

  const invitesTab = (
    <Tab eventKey="invites" title="Invites">
      <div>
        <InviteToCourseYear courseYearId={courseYearId} onInvitesTouched={handleInvitesTouched} />
        <CourseInvitesList courseYearId={courseYearId} invites={invites} onInvitesTouched={handleInvitesTouched} />
      </div>
    </Tab>
  )

  const isProfessor = user?.profile?.roles && user.profile.roles.some(r => r === "PROFESSOR")

  return (
    <div>
      <h2>Course Year</h2>
      <Tabs defaultActiveKey="groups" transition={false}>
        { groupsTab }
        { isProfessor ? studentsTab : null }
        { isProfessor ? invitesTab : null }
      </Tabs>
    </div>
  )
}

export default CourseYear