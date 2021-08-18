import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { LinkContainer } from 'react-router-bootstrap'

const FormSubmitCancelButtons = ({ submitButtonText, onCancelClick, cancelUrl }) => {
  return (
    <Form.Row className="align-items-center">
      <Col xs="auto">
        <Button type="submit" variant="primary">{submitButtonText}</Button>
      </Col>
      <Col xs="auto">
        { cancelUrl
          ? <LinkContainer to={cancelUrl} isActive={()=> false}><Button variant="outline-secondary">Cancel</Button></LinkContainer>
          : <Button type="button" onClick={onCancelClick} variant="outline-secondary">Cancel</Button>
        }        
      </Col>
    </Form.Row>
  )
}

export default FormSubmitCancelButtons