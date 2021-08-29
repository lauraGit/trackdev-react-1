import { Component } from "react"
import { withRouter } from "react-router"
import Api from '../../utils/api'
import CourseHeaderEditable from "../../components/CourseHeaderEditable"
import CourseYearsList from "../../components/CourseYearsList"
import CreateCourseYear from "../../components/CreateCourseYear"
import Restricted from '../../components/Restricted'
import Breadcrumbs from "../../components/Breadcrumbs"

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

  requestCourse() {
    Api.get('/courses/'+ this.props.match.params.courseId)
      .then(data => {
        this.setState({ course: data })
      })
      .catch(error => {
        this.setState({ hasError: true})
      })
      .finally(() => this.setState( { isLoading: false }))
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
    let links = [];
    links.push({ text: "Home", href: '/'});
    links.push({ text: "Courses", href: '/courses' });
    links.push({ text: this.state.course.name })

    const course = this.state.course
    return (
      <Restricted allowed={["PROFESSOR"]} fallback={(<p>You don't have access to here.</p>)}>
        <div>
          <Breadcrumbs links={links} />             
          <CourseHeaderEditable
            course={course}
            onCourseChange={this.handleCourseChange} />
          <h3>Course years</h3>
          <CreateCourseYear courseId={course.id} onCourseTouched={this.handleCourseTouched} />
          <CourseYearsList courseId={course.id} courseYears={course.courseYears} />
        </div>
      </Restricted>
    )
  }
}

export default withRouter(Course)