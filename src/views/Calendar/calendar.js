/* eslint-disable react/no-set-state */
import React, { Component } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import API from '../../services/general';
import Snippet from './snippet';
import Modals from '../../helpers/modal';
import ErrorHandler from '../../helpers/error';


class CalendarList extends Component{
  scheduleData;

  constructor(props){
    super(props);

    this.getMySchedules = this.getMySchedules.bind(this);
    this.getMyBookedSchedules = this.getMyBookedSchedules.bind(this);
    this.declineInterviewRequest = this.declineInterviewRequest.bind(this);
    this.declineInterview = this.declineInterview.bind(this);
    this.AddInterview = this.AddInterview.bind(this);
    this.showModal = this.showModal.bind(this);
    this.getApprovedInterview = this.getApprovedInterview.bind(this);
    this.confirmInterview = this.confirmInterview.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.toggleDeleteSchedule = this.toggleDeleteSchedule.bind(this);
    this.DeleteSchedule = this.DeleteSchedule.bind(this);
    this.handleDateClick = this.handleDateClick.bind(this);
    this.getMySchedules();
    this.getMyBookedSchedules();

    this.state = {
      scheduleDate: [],
      show: false,
      showDeleteScheduleModal: false,
      deleteScheduleID: '',
      modalTitle: '',
      ScheduleTitle: '',
      pendingSchedule: [],
      pendingScheduleId: '',
      showAddSchedule: false,
      schedule_date: '',
      approvedInterview: [],
      errorMsg: '',
      variant: '',
      showError: false
    }

    
  }

  handleClose(){
    this.setState({show: !this.state.show});
  }
  toggleDeleteSchedule(){
    this.setState({showDeleteScheduleModal: !this.state.showDeleteScheduleModal});
  }
  showModal(){
    this.setState({showAddSchedule: !this.state.showAddSchedule});
  }

  declineInterviewRequest(id){
    this.setState({pendingScheduleId: id});
    this.setState({show: true});
    // this.declineInterview();
  }
  declineInterview(){
    const id = this.state.pendingScheduleId;
    API.delete(`api/DeleteInterviewRequest/${id}`, id).then(
      res => {
        if(res.data.status == 200){
          this.setState({pendingSchedule: []});
          this.setState({errorMsg: res.data.message});
          this.setState({variant: 'success'});
          this.setState({showError: true});
          this.getMyBookedSchedules();
          this.handleClose();
        }
        else{
          this.setState({errorMsg: res.data.message});
          this.setState({variant: 'danger'});
          this.setState({showError: true});
        }
      },
    ).catch(
      () => {
        this.setState({errorMsg: 'An error occurred, please try again!!!'});
        this.setState({variant: 'danger'});
        this.setState({showError: true});
      }
    )
  }

  AddInterview(){
    const scheduleDate = {
      date: this.state.schedule_date
    };
    API.post(`api/schedule/create`, scheduleDate).then(
      res => {
        if(res.data.status == 200){
           const data = {
            interviewer_id: res.data.data.interviewer_id,
            date: res.data.data.schedule_time,
            id: res.data.data.id,
            title: 'Not Booked',
          }
          this.setState({scheduleDate: [...this.state.scheduleDate, data] });
          
          this.setState({errorMsg: res.data.message});
          this.setState({variant: 'success'});
          this.setState({showError: true});
        }
        else{
          this.setState({errorMsg: res.data.message});
          this.setState({variant: 'danger'});
          this.setState({showError: true});
        }
        this.showModal();
      }
    )
    .catch(
      () => {
        this.setState({errorMsg: 'An error occurred, please try again!!!'});
        this.setState({variant: 'danger'});
        this.setState({showError: true});
      }
    )
  }
  confirmInterview(id){
    API.post(`api/ApproveInterviewRequest/${id}`).then(
      res => {
        if(res.data.status == 200){
          this.setState({pendingSchedule: []});
          this.setState({scheduleDate: []});
          this.setState({errorMsg: res.data.message});
          this.setState({variant: 'success'});
          this.setState({showError: true});
          this.getMyBookedSchedules();
          this.getMySchedules();
        }
      }
    )
    .catch(
      () => {
        this.setState({errorMsg: 'An error occurred, please try again!!!'});
        this.setState({variant: 'danger'});
        this.setState({showError: true});
      }
    )
  }
  DeleteSchedule(){
    const id = this.state.deleteScheduleID;
    const title = this.state.ScheduleTitle;
    if(title == 'Not Booked'){
      API.delete(`api/schedule/delete/${id}`, id).then(
        res => {
          if(res.data.status == 200){
            this.setState({scheduleDate: []});
            this.setState({errorMsg: res.data.message});
            this.setState({variant: 'success'});
            this.setState({showError: true});
            this.getMySchedules();
            this.toggleDeleteSchedule();
          }
          else{
            this.setState({errorMsg: res.data.message});
            this.setState({variant: 'danger'});
            this.setState({showError: true});
          }
          
        },
        err => {
          this.setState({errorMsg: 'An error occurred, please kindly try again!!!'});
          this.setState({variant: 'danger'});
          this.setState({showError: true});
        }
      )
    }
    else{
      API.delete(`api/DeleteInterviewRequest/${id}`, id).then(
        res => {
          if(res.data.status == 200){
            this.setState({scheduleDate: []});
            this.setState({errorMsg: res.data.message});
            this.setState({variant: 'success'});
            this.setState({showError: true});
            this.getMySchedules();
            this.toggleDeleteSchedule();
          }
          else{
            this.setState({errorMsg: 'interview was successfully deleted'});
            this.setState({variant: 'danger'});
            this.setState({showError: true});
          }
          
        },
        err => {
          this.setState({errorMsg: 'An error occurred, please kindly try again!!!'});
          this.setState({variant: 'danger'});
          this.setState({showError: true});
        }
      )
    }
    
  }
  showError = () => {
    this.setState({showError: false});
  }

  render() {
    
    if(this.state.pendingSchedule.length > 0){
      this.scheduleData = this.state.pendingSchedule.map(
        e => (
          <div key={e.id}>
            {
            e.applicant_details.map(
              r => (
                <div key={e.id}>
                  <Snippet
                    confirm={() => this.confirmInterview(e.applicant_id)}
                    decline={() => this.declineInterviewRequest(e.applicant_id)}
                    firstName={r.first_name}
                    lastName={r.last_name}
                  />
                </div>
              )
            )
            }
          </div>
        )
      )
    }
    else{
      this.scheduleData = 
      <div className="no_booked_schedule" >
        <h4>It's a Free Day</h4>
        <p>
          Relax, you have no booked interview !!!.
        </p>
        
      </div>
    }
      
    return(
      <div>

        <ErrorHandler
          close={this.showError}
          message={this.state.errorMsg}
          show={this.state.showError}
          variant={this.state.variant}
        />

        <div className="top_calendar_" >
          <div>
            <h2>My Calendar</h2>
          </div>
          <div>
            <button
              className="btn btn-warning _new-schedule"
              onClick={this.showModal}
            >New Schedule</button>
          </div>
        </div>
        <hr className="hidden-md" />
         <div className="calendar_container" >
          <div className="calendar-area">
            <FullCalendar
              defaultView="dayGridMonth"
              eventClick={this.handleDateClick}
              events = {this.state.scheduleDate}
              plugins={[ dayGridPlugin, interactionPlugin  ]}
              selectable
            />
          </div>

          <div className="update_calendar_container" >

            {this.scheduleData}
            
          </div>
          
        </div>

        <Modals
          onHide={this.showModal}
          show={this.state.showAddSchedule}
          title={`Add Schedule`}
        >
        <div>
          <div className="Edit_user_" >
            <div className="form-group" >
              <input
                className="form-control"
                onChange={(event) => this.setState({schedule_date: event.target.value})}
                type="datetime-local"
              />
            </div>
             <button
               className="btn btn-primary ml-auto"
               onClick={this.AddInterview}
             >Add Schedule
          </button>
          </div>
         
        </div>
      </Modals>

        <Modals
          onHide={this.toggleDeleteSchedule}
          show={this.state.showDeleteScheduleModal}
          title={this.state.modalTitle}
        >
        <div>
          Are you sure you want to delete this schedule?
          <div className="Edit_user_" >
             <button
               className="btn btn-primary ml-auto"
               onClick={this.DeleteSchedule}
             >Delete Schedule
          </button>
          </div>
         
        </div>
      </Modals>

        <Modals
          onHide={this.handleClose}
          show={this.state.show}
          title={`Decline Request`}
        >
        <div>
          Are you sure you want to decline the request?
          <div className="Edit_user_" >
             <button
               className="btn btn-primary ml-auto"
               onClick={this.declineInterview}
             >Decline
          </button>
          </div>
         
        </div>
      </Modals>
      
      </div>
     
    )

  }

  getMySchedules(){
    API.get('api/schedule/show').then(
      res => {
        if(res.data.data.length > 0){
           res.data.data.forEach(schedule => {
            const data = {
              id: schedule.id,
              date: schedule.schedule_time,
              color: 'pink',
              title: 'Not Booked',
              description: 'schedule'
            }
            this.setState({scheduleDate: [...this.state.scheduleDate, data]})
          });
        }
      }
    ).then(
      () => {
        this.getApprovedInterview();
      }
    )
    .catch( 
      () => {
        this.setState({errorMsg: 'An error occurred, please try again!!!'});
        this.setState({variant: 'danger'});
        this.setState({showError: true});
      }
    )
  }

  getMyBookedSchedules(){
    API.get('api/showAllPendingInterview').then(
      res => {
        if(res.data.data.length > 0){
          this.setState({pendingSchedule: res.data.data});
        }
      }
      
    )
    .catch(
      () => {
        this.setState({errorMsg: 'An error occurred, please try again!!!'});
        this.setState({variant: 'danger'});
        this.setState({showError: true});
      }
    )
  }

  getApprovedInterview(){
    API.get('api/showAllApprovedInterview').then(
      res => {
        if(res.data.data.length > 0){
          res.data.data.forEach( c => {

            let confirmSchedule = {
              title: '',
              date: '',
              id: '',
              render: 'background',
              color: '#257ED9'
            }

            confirmSchedule.date = c.session_time;
            confirmSchedule.id = c.applicant_id;

            c.applicant_details.forEach(r => {
              confirmSchedule.title = `${r.first_name} ${r.last_name}`;
                this.setState({scheduleDate: [...this.state.scheduleDate, confirmSchedule]});

            })
            
          })
        }

      }
      
    ).catch(
      () => {
        this.setState({errorMsg: 'An error occurred, please try again!!!'});
        this.setState({variant: 'danger'});
        this.setState({showError: true});
      }
    )

  }

  handleDateClick = (eventObj) => { 
    const id = eventObj.event.id;
    const title = eventObj.event.title;
    if(title == 'Not Booked'){
      this.setState({modalTitle: 'Delete Schedule'});
    }
    else{
      this.setState({modalTitle: 'Delete Interview'});
    }
    this.setState({deleteScheduleID: id});
    this.setState({ScheduleTitle: title});
    this.toggleDeleteSchedule();
  }
}
export default CalendarList;
