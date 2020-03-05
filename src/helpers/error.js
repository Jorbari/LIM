import React from 'react';
import Alert from 'react-bootstrap/Alert'


const ErrorHandler = props => {
    return (
      <div>
        {props.show === true && 
        <Alert
          dismissible
          onClose={props.close}
          variant="danger"
        >
        <Alert.Heading>{props.title}!</Alert.Heading>
          {props.message}
      </Alert>
      }
         {/* <Alert variant="danger" onClose={props.close} dismissible>
          <Alert.Heading>{props.title}!</Alert.Heading>
          <p>
            {props.message}
          </p>
        </Alert> */}
      </div>
    );
  }
  

export default ErrorHandler;
