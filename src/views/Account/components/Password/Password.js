import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import API from '../../../../services/interviewer';
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
    NewPassword: ''
  });

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const editPassword = (event) => {
    event.preventDefault();
    const editPasswordModel = {
      password: values.OldPassword, 
      password_confirmation: values.NewPassword
    }
    console.log(editPasswordModel);

    API.put('api/updatePassword', editPasswordModel)
    .then(res => {
      console.log(res);
    })
    .catch(err => console.log(err))
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
            value={values.password}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="New Password"
            name="NewPassword"
            onChange={handleChange}
            style={{ marginTop: '1rem' }}
            type="password"
            value={values.confirm}
            variant="outlined"
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
