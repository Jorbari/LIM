import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import API from '../../../../services/general';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Button,
  TextField
} from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(() => ({
  root: {},
  errorNotifierDisplay: {
    fontSize: '12px',
    margin: 'unset',
    padding: 'unset',
    color: '#fea20b'
  }
}));

const Password = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [values, setValues] = useState({
    OldPassword: '',
    NewPassword: '',
    ConfirmNewPassword: ''
  });

  const [notifierMessage, setNotifierMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [stackModal, setStackModal] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center'
  });
  const { vertical, horizontal, open } = stackModal;
  const handleClick = (newState) => {
    setStackModal({ open: true, ...newState });
  };

  const handleClose = () => {
    setStackModal({ ...stackModal, open: false });
  };

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const editPassword = (event) => {
    event.preventDefault();
    setIsLoading(true);

    if( (values.NewPassword.length > 7) && (values.NewPassword == values.ConfirmNewPassword) && (values.OldPassword.length > 0) ){

      const editPasswordModel = {
        password: values.NewPassword, 
        password_confirmation: values.ConfirmNewPassword,
        current_password: values.OldPassword
      }
  
      API.put('api/updatePassword', editPasswordModel)
      .then(res => {
        setNotifierMessage(res.data.message);
        if(res.data.status == '200') {
          setValues({
            OldPassword: '',
            NewPassword: '',
            ConfirmNewPassword: ''
          })
        }
      })
      .catch(err => {
        setNotifierMessage('An error occurred, please try again!!!');
      }).finally(
        () => {
          setIsLoading(false);
          handleClick({ vertical: 'top', horizontal: 'center' });
        }
      )
    }
    
  }

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

      <form onSubmit={editPassword} >
        <CardHeader
          subheader="Update password"
          title="OldPassword"
        />
        <Divider />
        <CardContent>
          <TextField
            className={values.OldPassword.length == 0 ? 'account_error_border' : ''}
            fullWidth
            label="OldPassword"
            name="OldPassword"
            onChange={handleChange}
            type="password"
            value={values.OldPassword}
            variant="outlined"
          />
          <TextField
            className={values.NewPassword.length < 7 || values.NewPassword !== values.ConfirmNewPassword ? 'account_error_border' : ''}
            fullWidth
            label="New Password"
            name="NewPassword"
            onChange={handleChange}
            style={{ marginTop: '1rem' }}
            type="password"
            value={values.NewPassword}
            variant="outlined"
          />
          {values.NewPassword.length < 7 && 
            <span className={classes.errorNotifierDisplay}>Password length must be at-least 8</span>}
          <TextField
            className={values.ConfirmNewPassword.length < 7 || values.NewPassword !== values.ConfirmNewPassword ? 'account_error_border' : ''}
            fullWidth
            label="Confirm Password"
            name="ConfirmNewPassword"
            onChange={handleChange}
            style={{ marginTop: '1rem' }}
            type="password"
            value={values.ConfirmNewPassword}
            variant="outlined"
          />
           {values.NewPassword != values.ConfirmNewPassword && 
            <span className={classes.errorNotifierDisplay}>Password does not match</span>}
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            color="primary"
            disabled={(values.NewPassword.length < 7) || (values.NewPassword != values.ConfirmNewPassword) || (values.OldPassword.length < 1) || isLoading}
            type="submit"
            variant="contained"
          >
           {isLoading && <CircularProgress />} 
            Update
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

Password.propTypes = {
  className: PropTypes.string
};

export default Password;
