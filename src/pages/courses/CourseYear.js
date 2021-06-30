import { useContext, Fragment } from "react"
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
import withData from "../../components/withData"

const Groups = withData(
  CourseGroupsList,
  'groups',
  (props) => Api.get(`/courses/years/${props.courseYearId}/groups`))

const Students = withData(
  CourseStudentsList,
  'students',
  (props) => Api.get(`/courses/years/${props.courseYearId}/students`))

const Invites = withData(
  ({courseYearId, invites, onDataTouched}) => {
    return (
      <Fragment>
          <InviteToCourseYear courseYearId={courseYearId} onDataTouched={onDataTouched} />
          <CourseInvitesList courseYearId={courseYearId} invites={invites} onDataTouched={onDataTouched} />
      </Fragment>
    )
  },
  'invites',
  (props) => Api.get(`/invites?type=courseYear&courseYearId=${props.courseYearId}`))

const CourseYear = (props) => {
  let { courseYearId } = useParams()
  const { user } = useContext(UserContext)

  const groupsTab = (
    <Tab eventKey="groups" title="Groups">
      <div>
        <Restricted allowed={["PROFESSOR"]}>
          <Link to={`/courses/years/${courseYearId}/groups/create`}>New group</Link>
        </Restricted>
        <Groups courseYearId={courseYearId} />
      </div>
    </Tab>
  )

  const studentsTab = (
    <Tab eventKey="students" title="Students">
      <div>
        <Students courseYearId={courseYearId} />
      </div>
    </Tab>
  )

  const invitesTab = (
    <Tab eventKey="invites" title="Invites">
      <div>
        <Invites courseYearId={courseYearId} />
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