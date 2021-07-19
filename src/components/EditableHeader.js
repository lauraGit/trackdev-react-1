import './editable-header.css'
import { Fragment } from 'react'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'

const EditableHeader = ({ title, error, isEditing, fieldLabel, fieldValidationMessage, onEditing, onChange }) => {
  const [ validated, setValidated ] = useState(false)
  const [ value, setValue ] = useState(title)

  function handleEditClick() {
    onEditing(true)
  }

  function handleCancelClick() {    
    onEditing(false)
    setValidated(false)
  }

  function handleSubmit(e) {
    e.preventDefault();
    const isValidForm = e.currentTarget.checkValidity()
    setValidated(true)
    if(isValidForm === true) {
      onChange(value)
    }
  }

  return (
    <div className="editable-header">
      {
        isEditing
          ? (
            <Fragment>
              <Form onSubmit={handleSubmit} noValidate validated={validated}>
                <Form.Row className="align-items-center">
                  <Col>
                    <Form.Label htmlFor="editable-header-title" srOnly>{fieldLabel}</Form.Label>
                    <Form.Control id="editable-header-title"
                        type="text" name="name" value={value} onChange={(e) => setValue(e.target.value)} required />
                    <Form.Control.Feedback type="invalid">
                      {fieldValidationMessage}
                    </Form.Control.Feedback>
                  </Col>
                  <Col xs="auto">
                    <Button type="submit" variant="primary" size="sm">
                      Save
                    </Button>
                  </Col>
                  <Col xs="auto">
                    <Button type="button" onClick={handleCancelClick} variant="outline-secondary" size="sm" >
                        Cancel
                    </Button>
                  </Col>
                </Form.Row>
                <div>
                {
                    error ? (<Alert variant="danger">{error}</Alert>) : null
                }
                </div>
              </Form>
            </Fragment>
            )
          : (
            <Fragment>
              <h2 className="editable-header__title" onDoubleClick={handleEditClick}>{title}</h2>
              <Button type="submit" onClick={handleEditClick} variant="outline-primary" size="sm" className="editable-header__btn">
                Rename
              </Button>
            </Fragment>
          )
      }
    </div>
    
  )
}

export default EditableHeader