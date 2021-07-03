import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

const ConfirmationModal = ( { show, title, children, onCancel, onConfirm }) => {
  return (
    <Modal show={show} onHide={onCancel} animation={false}>
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        { children }
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onConfirm}>Yes, I'm sure</Button>
        <Button variant="secondary" onClick={onCancel}>No</Button>        
      </Modal.Footer>
    </Modal>
  )
}

export default ConfirmationModal