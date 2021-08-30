import CoursesList from '../../components/CoursesList'
import Restricted from '../../components/Restricted'
import { LinkContainer } from 'react-router-bootstrap'
import { Button } from 'react-bootstrap'
import Breadcrumbs from '../../components/Breadcrumbs'

const CoursesHome = () => {
  let links = [];
  links.push({ text: "Home", href: '/'});
  links.push({ text: "Courses" });

  return (
    <Restricted allowed={["PROFESSOR", "ADMIN"]} fallback={(<p>You don't have access to here.</p>)}>
      <div>
        <Breadcrumbs links={links} />
        <h2>Courses</h2>
        <div>
          <Restricted allowed={["PROFESSOR"]}>
            <LinkContainer to="/courses/create"><Button size="sm" className="mb-3">New course</Button></LinkContainer>
          </Restricted>
          <CoursesList />
        </div>
      </div>
    </Restricted>
  )
}

export default CoursesHome