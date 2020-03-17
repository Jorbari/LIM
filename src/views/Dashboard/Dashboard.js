import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import {reactLocalStorage} from 'reactjs-localstorage';

import {
  Budget,
  TotalUsers,
  TasksProgress,
  TotalProfit,
} from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
}));


const userProfile = reactLocalStorage.getObject('userProfile', {'role': 'sss'} );
const Auth = {
  userRole: userProfile.role.name
}

const Dashboard = () => {
  const classes = useStyles();



  return (
    <div>

      <div
        className={classes.root}
        style={{display: Auth.userRole == "administrator" ? "inherit" : "none"}}
      >
        <Grid
          container
          spacing={4}
        >
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <Budget />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalUsers />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TasksProgress />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalProfit />
          </Grid>
        </Grid>
      </div>

      <div
        className="interviewer-dashboard"
        style={{display: Auth.userRole == "interviewer" ? "inherit" : "none"}}
      >
        <Budget />
      </div>

      <div
        className="interviewer-dashboard"
        style={{display: Auth.userRole == "applicant" ? "inherit" : "none"}}
      >
        <Budget />
      </div>
  
    </div>
   
  );
};

export default Dashboard;
