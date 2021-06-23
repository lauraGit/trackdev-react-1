import { Component } from "react"
import { withRouter } from "react-router"
import Api from '../utils/api'
import CourseHeaderEditable from "./CourseHeaderEditable"
import CourseYearsList from "./CourseYearsList"
import CreateCourseYear from "./CreateCourseYear"

class Course extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      hasError: false,
      course: null
    }
    this.handleCourseChange = this.handleCourseChange.bind(this)
    this.handleCourseTouched = this.handleCourseTouched.bind(this)
  }

  componentDidMount() {
    this.requestCourse()
  }

  async requestCourse() {
    Api.get('/courses/'+ this.props.match.params.courseId)
      .then(async response => {
        const data = await response.json();
        if(!response.ok) {          
          this.setState({ isLoading: false, hasError: true })
        } else {
          this.setState({ isLoading: false, course: data })
        }
      })
      .catch(error => {
        this.setState({ hasError: true})
      })
  }

  handleCourseChange(course) {
    this.setState({ course: course })
  }

  handleCourseTouched() {
    this.requestCourse()
  }

  render() {
    if(this.state.isLoading) {
      return (<p>Loading...</p>)
    }
    if(this.state.isError) {
      return (<p>Error retrieving course.</p>)
    }
    if(!this.state.course) {
      return (<p>You have no course to see here.</p>)
    }
    const course = this.state.course
    return (
      <div>              
        <CourseHeaderEditable
          course={course}
          onCourseChange={this.handleCourseChange} />
        <h3>Course years</h3>
        <CreateCourseYear courseId={course.id} onCourseTouched={this.handleCourseTouched} />
        <CourseYearsList courseId={course.id} courseYears={course.courseYears} />
      </div>
    )
  }
}

export default withRouter(Course)