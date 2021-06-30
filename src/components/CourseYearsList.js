import { Link } from "react-router-dom"

const CourseYearsList = ({ courseYears }) => {
  if(courseYears == null) {
    return null
  }
  return (
    <div>
      <ul>
        {
          courseYears.map(courseYear => {
            let courseYearName = courseYear.startYear
            if(courseYear.course) {
              courseYearName = courseYear.course.name + " " + courseYearName
            }
            return (
              <li key={courseYear.id}>
                <Link to={`/courses/years/${courseYear.id}`}>{courseYearName}</Link>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default CourseYearsList