import './editable-field.css'
import { useEffect, useState, createRef } from "react"
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'

const EditableField = ({ id, fieldView, as, value, fieldLabel, status, error, onChange, children }) => {
  const [ isEditing, setIsEditing ] = useState(false)
  const [ isLoading, setIsLoading ] = useState(false)
  const [ newValue, setNewValue ] = useState(null)
  const input = createRef()
  const dialog = createRef()

  useEffect(function() {
    if(isEditing) {
      function onClickOutsideHandler(e) {
        if(isEditing && dialog.current && !dialog.current.contains(e.target)) {
          cancelEdit()
        }
      }    
      window.addEventListener('click', onClickOutsideHandler)
      return () => {
        window.removeEventListener('click', onClickOutsideHandler)
      }
    }
  }, [window, isEditing, dialog])

  useEffect(function() {
    if(isEditing && status === 'saving') {
      setIsLoading(true)
    }
    if(status === 'saved' && isEditing && isLoading) {
      setIsEditing(false)
      setIsLoading(false)
    }
  }, [status, isEditing, isLoading])

  function handleFormSubmit(e) {
    e.preventDefault()
    onChange(newValue)
  }

  function openPopup() {
    setNewValue(value)
    setIsEditing(true)
  }

  function handleFieldClick() {
    openPopup()
  }

  function handleFieldKeyDown(e) {
    if(e.key === 'Enter' || e.key === ' ') {
      openPopup()
    }
  }

  useEffect(function() {
    if(input.current && isEditing) {
      input.current.focus();
    }
  }, [isEditing, input])

  function cancelEdit() {
    setIsEditing(false)
  }

  function handleCancelClick() {
    cancelEdit()
  }

  function handleFormKeyDown(e) {
    if(e.key === 'Escape') {
      cancelEdit()
    }
  }

  function handleFormBlur(e) {
    if(e.relatedTarget != null && !e.currentTarget.contains(e.relatedTarget)) {
      cancelEdit()
    }
  }

  const controlId = "editable-field-" + id

  return (
    <span className="editable-field">
      <span className="editable-field__field" tabIndex="0" onClick={handleFieldClick} onKeyDown={handleFieldKeyDown} role="button" aria-haspopup="dialog">
          { fieldView }
      </span>
      {
        isEditing ? 
        (
          <span className="editable-field__dialog" role="dialog" onKeyDown={handleFormKeyDown} onBlur={handleFormBlur} ref={dialog}>
            <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId={controlId}>
              <Form.Label srOnly>{fieldLabel}</Form.Label>
              <Form.Control as={as ? as : "input"} value={newValue} ref={input} onChange={(e) => setNewValue(e.target.value)} size="sm">
                { children }
              </Form.Control>
            </Form.Group>
              <div className="editable-field__buttons">
                <Button type="submit" variant="primary" size="sm">Save</Button>
                <Button type="button" variant="outline-secondary" size="sm" onClick={handleCancelClick}>Cancel</Button>
              </div>
              {
                error ? (<Alert variant="danger">{error}</Alert>) : null
              }              
            </Form>            
          </span>
        )
        : null
      }
    </span>
  )

}

export default EditableField