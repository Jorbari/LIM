import React from 'react';
import { Modal } from 'react-bootstrap';

const modals = props => {
  const style = {
    zIndex: 2000000
  }
  return (
    
    <Modal
      onHide={props.onHide}
      show={props.show}
      style={style}
    >
      
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.children}
        </Modal.Body>
      
    </Modal>
    
  )
}

export default modals;
