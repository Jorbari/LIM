import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import {
  Card
} from '@material-ui/core';

const modals = props => {
  return (
    <Modal
      onHide={props.onHide}
      show={props.show}
      size="lg"
    >
      <Card>
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.text}
        </Modal.Body>
        <Modal.Footer>
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
        </Modal.Footer>
      </Card>
    </Modal>
  )
}

export default modals;
