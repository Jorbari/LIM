import React, { Fragment, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography as MuiTypography } from '@material-ui/core';
import API from '../../services/interviewer';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));



const Typography = () => {
  const classes = useStyles();

  useEffect(()=>{

    getInterviewerList();
    
  }, []) 
  
  const getInterviewerList = () => {
    API.get('api/listOfInterviewers')
    .then(res => {
      console.log(res);
    })
    .catch(err => console.log('**********', err))
  }

  const openNav = () => {
    document.getElementById("mySidenav").style.width = "25%";
  }
  const closeNav = () => {
    document.getElementById("mySidenav").style.width = "0";
  }

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >

        <div className="Applicant_interview_wrapper" >
          
          <div className="Applicant_interview_card" >


            <div className="card testimonial-card">

              {/* <div className="card-up indigo lighten-1" /> */}

              <div className="avatar mx-auto white img_avatar_wrapper">
                <img
                  alt="avatar"
                  className="rounded-circle img_avatar"
                  src="https://mdbootstrap.com/img/Photos/Avatars/img%20%2810%29.jpg"
                />
              </div>

              <div className="card-body">
                <h4 className="card-title">Anna Doe</h4>
                <hr />
                <p> 
                  Email: interviewer@gmail.com
                </p>
                <button
                  className="btn btn_Int_schedule"
                  onClick={openNav}
                >Show Schedules</button>
              </div>

            </div>

          </div>
        
        
        </div>


        {/* {Object.keys(variants).map((key, i) => (
          <Fragment key={i}>
            <Grid
              item
              sm={3}
              xs={12}
            >
              <MuiTypography variant="caption">{key}</MuiTypography>
            </Grid>
            <Grid
              item
              sm={9}
              xs={12}
            >
              <MuiTypography variant={key}>{variants[key]}</MuiTypography>
            </Grid>
          </Fragment>
        ))} */}

        <div
          className="sidenav"
          id="mySidenav"
        >
          <a
            className="closebtn"
            onClick={closeNav}
          >&times;</a>

          <div className="card_side_" >
            <p>
            Date: 22/09/2019 12:09AM
            </p>

            <hr />

            <button className="btn card_side_btn" >Book Interview</button>
            

          </div>

          {/* <a href="#">About</a>
          <a href="#">Services</a>
          <a href="#">Clients</a>
          <a href="#">Contact</a> */}
      </div>


      </Grid>



      

    </div>
  );
};

export default Typography;
