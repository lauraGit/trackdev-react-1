import { useEffect, useState } from "react"
import { useParams } from "react-router"
import InviteToCourseYear from "../../components/InviteToCourseYear"
import CourseInvitesList from "../../components/CourseInvitesList"
import CourseStudentsList from "../../components/CourseStudentsList"
import CourseGroupsList from "../../components/CourseGroupsList"
import Restricted from '../../components/Restricted'
import Api from "../../utils/api"

const CourseYear = (props) => {
  let { courseYearId } = useParams()
  const [ isLoading, setIsLoading ] = useState(true)
  const [ hasError, setHasError] = useState(false)
  const [ invites, setInvites ] = useState(null)
  const [ students, setStudents ] = useState(null)
  const [ groups, setGroups ] = useState(null)

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

  if(isLoading) {
    return <p>Loading...</p>
  }

  if(hasError) {
    return <p>Error retrieving data.</p>
  }

  return (
    <div>
      <h2>Course Year</h2>
      <div>
        <h3>Groups</h3>
        <CourseGroupsList courseYearId={courseYearId} groups={groups} onGroupsTouched={handleGroupsTouched} />
      </div>
      <Restricted allowed={["PROFESSOR"]}>
        <div>
          <h3>Students</h3>
          <CourseStudentsList courseYearId={courseYearId} students={students} onStudentsTouched={handleStudentsTouched} />
        </div>  
      </Restricted>
      <Restricted allowed={["PROFESSOR"]}>
        <div>
          <h3>Invites</h3>
          <InviteToCourseYear courseYearId={courseYearId} onInvitesTouched={handleInvitesTouched} />
          <CourseInvitesList courseYearId={courseYearId} invites={invites} onInvitesTouched={handleInvitesTouched} />
        </div>  
      </Restricted>
    </div>
  )
}

export default CourseYear