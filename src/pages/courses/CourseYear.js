import './course-year.css'
import { useContext, useState, useEffect, Fragment } from "react"
import { useParams } from "react-router"
import { Link, Redirect } from "react-router-dom"
import InviteToCourseYear from "../../components/InviteToCourseYear"
import CourseInvitesList from "../../components/CourseInvitesList"
import CourseStudentsList from "../../components/CourseStudentsList"
import CourseGroupsList from "../../components/CourseGroupsList"
import Restricted from '../../components/Restricted'
import ConfirmationModal from "../../components/ConfirmationModal"
import Api from "../../utils/api"
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
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
  const [ courseYear, setCourseYear ] = useState(null)
  const [ hasError, setHasError ] = useState(null)
  const [ isLoading, setIsLoading ] = useState(true)
  const [ askConfirmDelete, setAskConfirmDelete ] = useState(false)
  const [ deleted, setDeleted ] = useState(false)
  const [error, setError] = useState(null)
  const { user } = useContext(UserContext)

  useEffect(() => {
    requestCourseYear()
  }, [])

  function requestCourseYear() {
    Api.get(`/courses/years/${courseYearId}`)
      .then(data => setCourseYear(data))
      .catch(error => setHasError(true))
      .finally(() => setIsLoading(false))
  }

  function handleDeleteClick() {
    setAskConfirmDelete(true)
  }

  function handleActualDelete() {
    Api.delete(`/courses/years/${courseYearId}`)
      .then(() => {
        setAskConfirmDelete(false)
        setDeleted(true)
      })
      .catch(error => {
        setAskConfirmDelete(false)
        setError(error?.details?.message || 'Unknown error') 
      })
  }

  const groupsTab = (
    <Tab eventKey="groups" title="Groups">
      <div className="course-year-tab">
        <Restricted allowed={["PROFESSOR"]}>
          <Link to={`/courses/years/${courseYearId}/groups/create`}>New group</Link>
        </Restricted>
        <Groups courseYearId={courseYearId} />
      </div>
    </Tab>
  )

  const studentsTab = (
    <Tab eventKey="students" title="Students">
      <div className="course-year-tab">
        <Students courseYearId={courseYearId} />
      </div>
    </Tab>
  )

  const invitesTab = (
    <Tab eventKey="invites" title="Invites">
      <div className="course-year-tab">
        <Invites courseYearId={courseYearId} />
      </div>
    </Tab>
  )

  const isProfessor = user?.profile?.roles && user.profile.roles.some(r => r === "PROFESSOR")

  // Render
  if(isLoading) {
    return null
  }
  if(hasError || courseYear === null) {
    return (<p>Error retrieving course.</p>)
  }
  if(deleted) {
    return (<Redirect to={`/courses/${courseYear.course.id}`} />)
  }
  const fullName = courseYear.course?.name + " " + courseYear.startYear
  return (
    <div>
      <Restricted allowed={["PROFESSOR"]} fallback={(<h2>{fullName}</h2>)}>
        <Form.Row>
          <Col><h2>{fullName}</h2></Col>
          <Col xs="auto">
            <Button type="button" onClick={handleDeleteClick} variant="outline-secondary" size="sm">Delete</Button>
          </Col>
        </Form.Row>
      </Restricted>
      {
        error ? <Alert variant="danger" dismissible onClose={() => setError(null)}>{error}</Alert> : null
      }
      <Tabs defaultActiveKey="groups" transition={false}>
        { groupsTab }
        { isProfessor ? studentsTab : null }
        { isProfessor ? invitesTab : null }
      </Tabs>
      <ConfirmationModal show={askConfirmDelete}
          title="Sure you want to delete this course year?"
          onCancel={() => setAskConfirmDelete(false)}
          onConfirm={handleActualDelete}
          >
        <p>Please keep in mind that when a course year is deleted all its groups, invites, backlogs and tasks are deleted as well.</p>
        <p>You cannot recover from this action.</p>
      </ConfirmationModal>
    </div>
  )
}

export default CourseYear