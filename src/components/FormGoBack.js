import { Link } from 'react-router-dom'
import './form-go-back.css'

const FormGoBack = ( { to }) => {
  return (
    <div className="form-go-back">
      &lt; <Link to={to}>Go back</Link>
    </div>
  )
}

export default FormGoBack