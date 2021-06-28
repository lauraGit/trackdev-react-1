import { useState } from "react"
import Api from "../utils/api"

const CourseStudentsList = ({ courseYearId, students, onStudentsTouched }) => {
  const [ error, setError ] = useState(null)

  function handleDeleteClick(username) {
    Api.delete(`/courses/years/${courseYearId}/students/${username}`)
      .then(data =>  onStudentsTouched())
      .catch(error => setError(error?.details?.message || 'Unknown error') )
  }

  // Render
  if(students == null) {
    return null
  }
  if(students.length === 0) {
    return <p>You don't have any students enrolled in this course year.</p>
  }
  return (
    <div>
      {
        error ? <p>{error}</p> : null
      }
      <table>
        <tr>
          <th>Username</th>
          <th></th>
        </tr>
        {
          students.map(student => (
            <tr key={student.username}>
              <td>{student.username}</td>
              <td><button type="button" onClick={() => handleDeleteClick(student.username)}>Delete</button></td>
            </tr>
          ))
        }
      </table>
    </div>
  )
}

export default CourseStudentsList