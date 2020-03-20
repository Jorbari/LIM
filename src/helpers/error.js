import React from 'react';
import Alert from 'react-bootstrap/Alert'


const ErrorHandler = props => {
    return (
      <div>
        {props.show === true && 
        <Alert
          dismissible
          onClose={props.close}
          variant={props.variant}
        >
          {props.message}
      </Alert>
      }
      </div>
    );
  }
  

export default ErrorHandler;
