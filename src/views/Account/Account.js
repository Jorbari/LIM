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

const userProfile = reactLocalStorage.getObject('userProfile', {'role': 'sss'} );
const Auth = {
  userRole: userProfile.role.name
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
          <div className="mt-3" style={{display: Auth.userRole == "administrator" ? "inherit" : "none"}} >
            <AccountProfile  />
          </div>
        </Grid>
        <Grid
          item
          lg={8}
          md={6}
          xl={8}
          xs={12}
        >
          <AccountDetails />
        </Grid>
      </Grid>
    </div>
  );
};

export default Account;
