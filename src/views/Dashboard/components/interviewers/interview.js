import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';
import API from '../../../../services/general';
import {reactLocalStorage} from 'reactjs-localstorage';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  title: {
    fontWeight: 700
  },
  avatar: {
    backgroundColor: theme.palette.error.main,
    height: 56,
    width: 56
  },
  interviewAvatar: {
    backgroundColor: theme.palette.error.main,
    height: '100%',
    width: '100%',
    borderRadius: '100%',
    padding: 50,
    background: '#3f51b5 !important'
  },
  icon: {
    height: 32,
    width: 32
  },
  difference: {
    marginTop: theme.spacing(2),
    display: 'flex',
    alignItems: 'center'
  },
  differenceIcon: {
    color: theme.palette.error.dark
  },
  differenceValue: {
    color: theme.palette.error.dark,
    marginRight: theme.spacing(1)
  }
}));

const Budget = props => {
  const { className, ...rest } = props;
  const [interview, setInterview]  = useState(0);
  const [approvedinterview, setApprovedInterview]  = useState(0);

  const classes = useStyles();
  const userProfile = reactLocalStorage.getObject('Profile', {'role': 'sss'} );
  const Auth = {
    userRole: userProfile.RoleName
  }

  useEffect(()=>{
    if(Auth.userRole == "administrator"){
      InterviewSum();
    }
    if(Auth.userRole == "interviewer"){
      pendingInterview();
      approvedInterview();
    }
    
  }) 

  


  const InterviewSum = () => {
    API.get('api/sumOfInterviewer')
    .then(
      res => {
        setInterview(res.data.data);
      }
    )
    .catch(
      err => {
        console.log('an error occurred');
        console.log(err);
      }
    )
  }

  const pendingInterview = () => {
    API.get('api/sumOfMyPendingInterview')
    .then(
      res => {
        setInterview(res.data.data);
      }
    )
    .catch(
      err => {
        console.log('an error occurred');
        console.log(err);
      }
    )
    
  }
  const approvedInterview = () => {
    API.get('api/sumOfMyApprovedInterview')
    .then(
      res => {
        console.log(res);
        setApprovedInterview(res.data.data);
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
    <div>

      <div
        className={classes.root}
        style={{display: Auth.userRole == "administrator" ? "inherit" : "none"}}
      >
          <Card
            {...rest}
            className={clsx(classes.root, className)}
          >
        
        <CardContent>
          <Grid
            container
            justify="space-between"
          >
            <Grid item>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
                variant="body2"
              >
                INTERVIEWERS
              </Typography>
              <Typography variant="h3">{interview} user<span>(s)</span> </Typography>
            </Grid>
            <Grid item>
            <Avatar className={classes.avatar}>
                <PeopleIcon className={classes.icon} />
              </Avatar>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    

        </div>

    
      
      
      <div
        className="interviewer-dashboard"
        style={{display: Auth.userRole == "interviewer" ? "inherit" : "none"}}
      >
          <div className="__interviewer-padding" >
            <div className="pendingInterview_no" >
              <div className="child_card_" >

                <div className="text_portion" >
                  <h5>Pending Interview(s)</h5>
                  <h1> {interview} </h1>

                </div>
                <div className="icon_portion" >
                  <Avatar className={classes.interviewAvatar}>
                    <PeopleIcon className={classes.icon} />
                  </Avatar>
                </div>
              </div>
            </div>

            <div className="approvedInterview_no" >
              <div className="child_card_" >
                <div className="icon_portion" >
                  <Avatar className={classes.interviewAvatar}>
                    <PeopleIcon className={classes.icon} />
                  </Avatar>
                </div>

                <div className="text_portion" >
                  <h5>Approved Interview(s)</h5>
                  <h1> {approvedinterview} </h1>
                </div>
                </div>
            </div>
          </div>
        </div>
    
      
      <div
        className="interviewer-dashboard"
        style={{display: Auth.userRole == "applicant" ? "inherit" : "none"}}
      >
          <div className="__interviewer-padding" >
            <div className="pendingInterview_no" >
              <div className="child_card_" >

                <div className="text_portion" >
                  <h5>Pending Interview(s)</h5>
                  <h1> {interview} </h1>

                </div>
                <div className="icon_portion" >
                  <Avatar className={classes.interviewAvatar}>
                    <PeopleIcon className={classes.icon} />
                  </Avatar>
                </div>
              </div>
            </div>

            <div className="approvedInterview_no" >
              <div className="child_card_" >
                <div className="icon_portion" >
                  <Avatar className={classes.interviewAvatar}>
                    <PeopleIcon className={classes.icon} />
                  </Avatar>
                </div>

                <div className="text_portion" >
                  <h5>Approved Interview(s)</h5>
                  <h1> {approvedinterview} </h1>
                </div>
                </div>
            </div>
          </div>
        </div>
    

    </div>
    
  );
};

Budget.propTypes = {
  className: PropTypes.string
};

export default Budget;
