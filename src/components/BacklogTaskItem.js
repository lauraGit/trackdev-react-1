import './backlog-task-item.css'
import { useState, Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import EstimationPoints from './EstimationPoints'
import Dropdown from 'react-bootstrap/Dropdown'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import Toast from 'react-bootstrap/Toast'
import Api from '../utils/api'

const BacklogTaskItem = ({ task, onDataTouched, totalCount }) => {
  const [newRank, setNewRank ] = useState(task.rank)
  const [validated, setValidated] = useState(false)
  const [errors, setErrors] = useState({})
  const [showToast, setShowToast] = useState(true)

  function handleMoveSubmit(e) {
    e.preventDefault();
    const isValidForm = e.currentTarget.checkValidity()
    setValidated(true)
    if(isValidForm === true) {
      requestMove()
    }
  }

  useEffect(function() {
    setNewRank(task.rank)
  }, [task])

  function handleDropdownSelect(eventKey, event) {
    let rank = 1;
    switch(eventKey) {
      case 'move-to-top':
        rank = 1;
        break;
      case 'move-up':
        rank = task.rank - 1
        break;
      case 'move-down':
        rank = task.rank + 1
        break;
      case 'move-to-bottom':
        rank = totalCount
        break;
    }
    updateRank(rank, 'menuItem')
  }

  function requestMove() {
    updateRank(newRank, 'moveForm')
  }

  function updateRank(rank, source) {
    Api.patch(`/tasks/${task.id}`, {
      rank: rank
    }).then(data => {
      onDataTouched()
      setValidated(false)      
    }).catch( error => {
      var errors = {}
      errors[source] = error?.details?.message || 'Unknown error'
      setShowToast(true)
      setErrors(errors)
    })
  }

  function toggleToast() {
    setShowToast(false)
  }

  const moveControlId = `backlog-task-item-${task.id}-move-to`

  return (
    <div className="backlog-task-item">
      <div>
        <Link to={`/tasks/${task.id}`}>{task.id}</Link> - {task.name} 
        <span className="sr-only">Estimation points</span>
        <EstimationPoints estimationPoints={task.estimationPoints} />
      </div>      
      <Dropdown onSelect={handleDropdownSelect}>
        <Dropdown.Toggle variant="outline-secondary" size="sm">
          ...
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {
            task.rank > 1
            ? (
              <Fragment>
                <Dropdown.Item eventKey="move-to-top">Move to top</Dropdown.Item>
                <Dropdown.Item eventKey="move-up">Move one up</Dropdown.Item>
              </Fragment>
            )
            : null            
          }
          { task.rank < totalCount
            ? (
              <Fragment>
                <Dropdown.Item eventKey="move-down">Move one down</Dropdown.Item>
                <Dropdown.Item eventKey="move-to-bottom">Move to bottom</Dropdown.Item>
              </Fragment>
              )
            : null
          }
          <Dropdown.Divider />
          <div className="backlog-task-item__menu-form">
            <Form onSubmit={handleMoveSubmit} noValidate validated={validated}>
              <Form.Group controlId={moveControlId}>
                <Form.Label>Move to</Form.Label>
                <Form.Control name="moveTo" value={newRank} onChange={(e) => setNewRank(e.target.value)}
                              type="number" required min="1" max={totalCount} />
                <Form.Control.Feedback type="invalid">
                    Please enter a valid rank.
                </Form.Control.Feedback>
              </Form.Group>
              <Button type="submit" variant="primary" size="sm">
                Move
              </Button>
              {
                errors.moveForm ? (<Alert variant="danger">{errors.moveForm}</Alert>) : null
              }           
            </Form>
          </div>
        </Dropdown.Menu>
      </Dropdown>
      {
        errors.menuItem
          ? (
            <div aria-live="polite" style={{position:'fixed', bottom: '30px', right: '30px', zIndex: 5}}>
              <Toast show={showToast} onClose={toggleToast} delay={4000} autohide className="bg-danger text-white">
                <Toast.Header><span className="mr-auto">Error editing task</span></Toast.Header>
                <Toast.Body>{errors.menuItem}</Toast.Body>
              </Toast>
            </div>            
          )
          : null
      }      
    </div>
  )
}

export default BacklogTaskItem