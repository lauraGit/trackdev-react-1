import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'

const FormSubmitCancelButtons = ({ submitButtonText, onCancelClick, cancelUrl }) => {
  return (
    <Form.Row className="align-items-center">
      <Col xs="auto">
        <Button type="submit" variant="primary">{submitButtonText}</Button>
      </Col>
      <Col xs="auto">
        { cancelUrl
          ? <Button href={cancelUrl} variant="outline-secondary">Cancel</Button>
          : <Button type="button" onClick={onCancelClick} variant="outline-secondary">Cancel</Button>
        }        
      </Col>
    </Form.Row>
  )
}

export default FormSubmitCancelButtons