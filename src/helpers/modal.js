import React from 'react';
import { Modal } from 'react-bootstrap';

const modals = props => {
  return (
    
    <Modal
      onHide={props.onHide}
      show={props.show}
      size="lg"
    >
      
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.children}
        </Modal.Body>
        {/* <Modal.Footer>
          <Button
            onClick={props.onHide}
            variant="secondary"
          >
            Close
          </Button>
          <Button
            onClick={props.onHide}
            variant="primary"
          >
            Save Changes
          </Button>
        </Modal.Footer> */}
      
    </Modal>
    
  )
}

export default modals;
