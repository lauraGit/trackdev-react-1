import { useState } from "react"
import Api from "../utils/api"
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'

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
      <Table hover size="sm">
        <thead>
          <tr>
            <th>Username</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            students.map(student => (
              <tr key={student.username}>
                <td>{student.username}</td>
                <td>
                  <Button type="button" onClick={() => handleDeleteClick(student.username)} variant="outline-secondary" size="sm">
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </Table>
    </div>
  )
}

export default CourseStudentsList