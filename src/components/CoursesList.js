import { Component } from 'react'
import Api from '../utils/api'

class CoursesList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      courses: null,
      hasError: false
    }
  }

  componentDidMount() {
    Api.get('/courses')
      .then(async response => {
        const data = await response.json();
        if(!response.ok) {          
          this.setState({ isLoading: false, hasError: true })
        } else {
          this.setState({ isLoading: false, courses: data })
        }
      })
      .catch(error => {
        this.setState({ hasError: true})
      })
  }

  render() {
    if(this.state.isLoading) {
      return (<p>Loading...</p>)
    }
    if(this.state.isError || !this.state.courses) {
      return (<p>Error retrieving courses.</p>)
    }
    if(this.state.courses.length === 0) {
      return (<p>You have no courses to see here.</p>)
    }
    return (
      <div>
        <ul>
          {this.state.courses.map(course => 
            (<li key={course.id}>{course.name}</li>)
            )}
        </ul>
      </div>
    )
  }
} 

export default CoursesList