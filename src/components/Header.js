import './header.css';
import { Link } from 'react-router-dom'
import HeaderLinks from './HeaderLinks'

const Header = () => {
    return (
      <header className="header">
        <Link to="/"><h1>TrackDev</h1></Link>
        <HeaderLinks />
      </header>
    )
}

export default Header