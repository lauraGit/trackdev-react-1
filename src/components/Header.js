import { Navbar, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import HeaderLinks from './HeaderLinks'
import HeaderUserLinks from './HeaderUserLinks'

const Header = () => {
    return (
      <Navbar bg="light" expand={true} >          
          <Container fluid="lg">
            <Link className="navbar-brand" to="/">TrackDev</Link>
            <HeaderLinks />
            <HeaderUserLinks />     
          </Container>
      </Navbar>
    )
}

export default Header