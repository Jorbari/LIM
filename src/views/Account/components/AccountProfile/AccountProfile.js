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

  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      
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
          variant="text"
        >
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
