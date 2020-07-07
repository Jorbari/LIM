/* eslint-disable no-useless-escape */
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
// import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  Divider,
  Button,
  TextField
} from '@material-ui/core';
import API from '../../../../services/general';
import Snackbar from '@material-ui/core/Snackbar';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
  root: {},
  details: {
    display: 'flex'
  },
  avatar: {
    marginLeft: 'auto',
    height: 110,
    width: 100,
    flexShrink: 0,
    flexGrow: 0
  },
  progress: {
    marginTop: theme.spacing(2)
  },
  uploadButton: {
    marginRight: theme.spacing(2),
    backgroundColor: '#c0c3c5',
    color: 'gray'
  },
  resendInterview: {
    backgroundColor: '#222753'
  }
}));

const AccountProfile = props => {
  const { className, ...rest } = props;

  const [interViewerEmail, SetInterviewerEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Notifier alert
  const [notifierMessage, setNotifierMessage] = useState('');
  const [stackModal, setStackModal] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center'
  });
  const { vertical, horizontal, open } = stackModal;

  const handleClose = () => {
    setStackModal({ ...stackModal, open: false });
  };

  const handleClick = (newState) => {
    setStackModal({ open: true, ...newState });
  };


  const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // return re.test(String(email).toLowerCase());
    if(re.test(String(email).toLowerCase())) {
      SetInterviewerEmail(email);
    }
    else{
      SetInterviewerEmail('');
    }
}

const resendEmailInvitation = () => {
  setIsLoading(true);
  if(interViewerEmail.length > 1) {
    API.get(`api/sendInvite`, {params: {email: interViewerEmail}})
    .then(
      res => {
        console.log(res);
        SetInterviewerEmail('');
        setNotifierMessage(res.data.message);
      }
    )
    .catch(
      err => {
        console.log(err);
        setNotifierMessage('An error occurred, please try again!!!');
        // console.log(err);
      }
    ).finally(
      () => {
        setIsLoading(false);
        handleClick({ vertical: 'top', horizontal: 'center' });
      }
    )
  }
}

  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
       <Snackbar
         anchorOrigin={{ vertical, horizontal }}
         key={vertical + horizontal}
         message={notifierMessage}
         onClose={handleClose}
         open={open}
       />
      
      <CardContent>
        <div className={classes.details}>
          <div>
            <h4>Resend Invitation</h4>
          </div>
        </div>
        <TextField
          error = {interViewerEmail ? false : true}
          fullWidth
          helperText = {interViewerEmail ? '' : 'Input correct email'}
          label="Email Address"
          margin="dense"
          name="email"
          onChange={(event) => validateEmail(event.target.value)}
          required
          type="email"
          variant="outlined"
        />
      </CardContent>

      <Divider />
      <CardActions>
        
        <Button
          className={interViewerEmail ? `${classes.resendInterview}` : `${classes.uploadButton}`}
          color="primary"
          disabled={interViewerEmail.length < 1 || isLoading}
          onClick={() => resendEmailInvitation()}
          variant="text"
        >
          {isLoading && <CircularProgress />} 
          Resend Invitation
        </Button>
      </CardActions>
    </Card>
  );
};

AccountProfile.propTypes = {
  className: PropTypes.string
};

export default AccountProfile;
