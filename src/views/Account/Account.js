import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import {reactLocalStorage} from 'reactjs-localstorage';

import { AccountProfile, AccountDetails, Password } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const userProfile = reactLocalStorage.getObject('Profile', {'role': 'sss'} );
const Auth = {
  userRole: userProfile.RoleName
}

const Account = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          lg={4}
          md={6}
          xl={4}
          xs={12}
        >
          <Password />
        </Grid>
        <Grid
          item
          lg={8}
          md={6}
          xl={8}
          xs={12}
        >
          <AccountProfile style={{display: Auth.userRole == "Administrator" ? "inherit" : "none"}}  />
          <AccountDetails style={{display: Auth.userRole == "Interviewer" ? "inherit" : "none"}} />
          <AccountDetails style={{display: Auth.userRole == "Applicant" ? "inherit" : "none"}} />
          
        </Grid>
      </Grid>
    </div>
  );
};

export default Account;
