import { Link } from "react-router-dom"

const CourseYearsList = (props) => {
  const courseYears = props.courseYears
  return (
    <div>
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