import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <div>
      <p>Page not found.</p>
      <p>Please check if the path is correct.</p>
      <p><Link to="/">Go to home</Link></p>
    </div>
  )
}

export default NotFoundPage