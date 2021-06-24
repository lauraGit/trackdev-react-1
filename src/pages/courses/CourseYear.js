import { useEffect, useState } from "react"
import { useParams } from "react-router"
import InviteToCourseYear from "../../components/InviteToCourseYear"
import CourseInvitesList from "../../components/CourseInvitesList"
import Api from "../../utils/api"

const CourseYear = (props) => {
  let { courseYearId } = useParams()
  const [ isLoading, setIsLoading ] = useState(true)
  const [ hasError, setHasError] = useState(false)
  const [ invites, setInvites ] = useState(null)

  useEffect(() => {
    requestInvites()
  }, [])

  async function requestInvites() {
    Api.get(`/invites?type=courseYear&courseYearId=${courseYearId}`)
      .then(async response => {
        const data = await response.json();
        if(!response.ok) {          
          setHasError(true)
        } else {
          setInvites(data)
        }
        setIsLoading(false)
      })
      .catch(error => {
        setIsLoading(false)
        setHasError(true)
      })
  }

  function handleInvitesTouched() {
    requestInvites()
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
        <h3>Invites</h3>
        <InviteToCourseYear courseYearId={courseYearId} onInvitesTouched={handleInvitesTouched} />
        <CourseInvitesList courseYearId={courseYearId} invites={invites} onInvitesTouched={handleInvitesTouched} />
      </div>
    </div>
  )
}

export default CourseYear