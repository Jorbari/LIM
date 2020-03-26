/* eslint-disable react/no-set-state */
import React, { Component } from 'react';
import { Grid, Typography as MuiTypography } from '@material-ui/core';
import API from '../../services/general';
import { Avatar } from '@material-ui/core';
import ErrorHandler from '../../helpers/error';



class BookInterview extends Component {

  constructor(props){
    super(props);

    this.state = {
      listOfInterviewers: [],
      listOfSchedules: [],
      errorMsg: '',
      variant: '',
      show: false
    }
    this.getInterviewerList();
  }
  
   getInterviewerList = () => {
    API.get('api/listOfInterviewers')
    .then(res => {
      if(res.data.data.length > 0){
        res.data.data.forEach(interviewer => {
          this.setState({listOfInterviewers: [...this.state.listOfInterviewers , interviewer]});
        });

      }
      
    })
    .catch(err => console.log('**********', err))
  }
  
  showAnInterviewerSchedule = (id) => {
    API.get(`api/showAnInterviewerSchedule/${id}`)
    .then(res => {
      if(res.data.data.length > 0){
        this.setState({listOfSchedules: res.data.data});
      }
      else{
        this.setState({listOfSchedules: []});
      }
      
    })
    .catch(err => console.log('**********', err))
  }

  createInterviewRequest = (request) => {
    const date = {
      session_time: request.schedule_time
    }

    API.post(`api/createInterviewRequest/${request.interviewer_id}`, date)
    .then(res => {
      console.log(res);
        if(res.data.status != 200){
          if(res.data.data?.session_time){
            res.data.data.session_time.forEach(error => {
              this.setState({errorMsg: error});
            })
          }
          else{
            this.setState({errorMsg: res.data.message});
          }
          this.setState({variant: 'danger'});
          this.setState({show: true});
        }
        else{
          this.setState({errorMsg: res.data.message});
          this.setState({variant: 'success'});
          this.setState({show: true});
        }
    })
    .catch(err => {
      console.log(err);
      this.setState({errorMsg: 'An error occurred, please kindly try again!!!'});
      this.setState({variant: 'danger'});
      this.setState({show: true});
    })
  }

  showError = () => {
    this.setState({show: false});
  }

  openNav = (id) => {
    this.showAnInterviewerSchedule(id);
    document.getElementById("mySidenav").style.width = "25%";
  }
  closeNav = () => {
    document.getElementById("mySidenav").style.width = "0";
  }

  render() {
    let interviewerArr;
    let interviewerSchedule;
    let _interviewArr;
    if(this.state.listOfInterviewers.length > 0){
      interviewerArr = this.state.listOfInterviewers.map(
        _interview => (
          
          <div
            className="Applicant_interview_card"
            key={_interview.id}
          >

            <div className="card testimonial-card">

              <div className="avatar mx-auto white img_avatar_wrapper">
                <Avatar
                  alt="Person"
                  className="interviewerImgIcon"
                  src={_interview.photo}
                />
                {/* <img
                  alt="avatar"
                  className="rounded-circle img_avatar"
                  src="https://mdbootstrap.com/img/Photos/Avatars/img%20%2810%29.jpg"
                /> */}
              </div>

              <div className="card-body">
                <h4 className="card-title">{_interview.first_name} {_interview.last_name}</h4>
                <hr />
                <p> 
                  {_interview.email}
                </p>
                <button
                  className="btn btn_Int_schedule"
                  onClick={() => this.openNav(_interview.id)}
                >Show Schedules</button>
              </div>

            </div>

          </div>
        )
      )
    }
    else{
      _interviewArr = <div className="no_record_found" >
        <p>No interviewer record found!!!</p>
      </div>
    }

    if(this.state.listOfSchedules.length > 0){
      interviewerSchedule =  this.state.listOfSchedules.map(schedules => (

        <div
          className="card_side_"
          key={schedules.id}
        >
          <p>
            Date:  {schedules.schedule_time} 
          </p>
          <hr />
          <button
            className="btn card_side_btn"
            onClick={() => this.createInterviewRequest(schedules)}
          >Book Interview</button>
        </div>
      ))
    }
    else{
      interviewerSchedule = <div className="no__schedule" >
        No scheduled interview!!!
      </div>
    }
     return (
       <div>
         {_interviewArr}

        <ErrorHandler
          close={this.showError}
          message={this.state.errorMsg}
          show={this.state.show}
          variant={this.state.variant}
        />

      <div className="_wrapper__">
      
        <Grid
          container
          spacing={4}
        >

          <div className="Applicant_interview_wrapper" >
            {interviewerArr}
          </div>


          <div
            className="sidenav"
            id="mySidenav"
          >
            <a
              className="closebtn"
              onClick={this.closeNav}
            >&times;</a>
            {interviewerSchedule}
          </div>

        </Grid>

      </div>
    
       </div>
       
    );
  }
 
}

export default BookInterview;
