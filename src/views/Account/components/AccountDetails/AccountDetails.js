import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {reactLocalStorage} from 'reactjs-localstorage';
import API from '../../../../services/interviewer';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {}
}));

const AccountDetails = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const userProfile = reactLocalStorage.getObject('Profile');
  const Auth = {
    userRole: userProfile
  }

  const [values, setValues] = useState({
    firstName: Auth.userRole.first_name,
    lastName: Auth.userRole.last_name,
    email: Auth.userRole.email,
  });

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
    console.log(Auth.userRole.id);
  };

  const editProfile = (event) => {
    event.preventDefault();

    const editProfileModel = {
      id: Auth.userRole.id,
      first_name:values.firstName,
      last_name:values.lastName,
      photo:''
    }

    console.log(editProfileModel);

    API.put(`api/updateInterviewer/${Auth.userRole.id}`, editProfileModel)
    .then(
      res => {
        console.log(res);
        reactLocalStorage.setObject('Profile', editProfileModel);
      }
    )
    .catch(
      err => {
        console.log('an error occurred');
        console.log(err);
      }
    )
  }


  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <form
        autoComplete="off"
        noValidate
        onSubmit={editProfile}
      >
        <CardHeader
          subheader="The information can be edited"
          title="Profile"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Please specify the first name"
                label="First name"
                margin="dense"
                name="firstName"
                onChange={handleChange}
                required
                value={values.firstName}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Last name"
                margin="dense"
                name="lastName"
                onChange={handleChange}
                required
                value={values.lastName}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                disabled
                fullWidth
                label="Email Address"
                margin="dense"
                name="email"
                onChange={handleChange}
                required
                value={values.email}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            color="primary"
            variant="contained"
            type="submit"
          >
            Save details
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

AccountDetails.propTypes = {
  className: PropTypes.string
};

export default AccountDetails;
