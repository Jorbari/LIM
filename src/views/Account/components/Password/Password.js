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

const useStyles = makeStyles(() => ({
  root: {}
}));

const Password = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [values, setValues] = useState({
    OldPassword: '',
    NewPassword: '',
    ConfirmNewPassword: ''
  });

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const editPassword = (event) => {
    event.preventDefault();
    if( (values.NewPassword.length > 7) && (values.NewPassword == values.ConfirmNewPassword) && (values.OldPassword > 0) ){


      const editPasswordModel = {
        password: values.NewPassword, 
        password_confirmation: values.ConfirmNewPassword,
        current_password: values.OldPassword
      }
      console.log(editPasswordModel);
  
      API.put('api/updatePassword', editPasswordModel)
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err))

    }
    
  }

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <form onSubmit={editPassword} >
        <CardHeader
          subheader="Update password"
          title="OldPassword"
        />
        <Divider />
        <CardContent>
          <TextField
            fullWidth
            label="OldPassword"
            name="OldPassword"
            onChange={handleChange}
            type="password"
            value={values.OldPassword}
            variant="outlined"
            className={values.OldPassword.length == 0 ? 'account_error_border' : ''}
          />
          <TextField
            fullWidth
            label="New Password"
            name="NewPassword"
            onChange={handleChange}
            style={{ marginTop: '1rem' }}
            type="password"
            value={values.NewPassword}
            variant="outlined"
            className={values.NewPassword.length < 7 || values.NewPassword !== values.ConfirmNewPassword ? 'account_error_border' : ''}
          />
          <TextField
            fullWidth
            label="Confirm Password"
            name="ConfirmNewPassword"
            onChange={handleChange}
            style={{ marginTop: '1rem' }}
            type="password"
            value={values.ConfirmNewPassword}
            variant="outlined"
            className={values.ConfirmNewPassword.length < 7 || values.NewPassword !== values.ConfirmNewPassword ? 'account_error_border' : ''}
          />
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            color="primary"
            variant="outlined"
            type="submit"
          >
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
