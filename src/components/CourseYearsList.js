import { Link } from "react-router-dom"

const CourseYearsList = (props) => {
  const courseYears = props.courseYears
  return (
    <div>
      <h3>Course years</h3>
      <ul>
        {
          courseYears.map(courseYear => (
            <li key={courseYear.id}>
              <Link to={`/courses/years/${courseYear.id}`}>{courseYear.startYear}</Link>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default CourseYearsList