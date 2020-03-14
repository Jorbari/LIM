/* eslint-disable react/no-set-state */

import React, { Component } from 'react';
// import { Calendar } from '@fullcalendar/core';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import API from '../../services/interviewer';
import Snippet from './snippet';
import Modals from '../../helpers/modal';


class ProductList extends Component{
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
      pendingSchedule: [],
      pendingScheduleId: '',
      showAddSchedule: false,
      schedule_date: '',
      approvedInterview: []
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
  }
  declineInterview(){
    const id = this.state.pendingScheduleId;
    API.delete(`api/DeleteInterviewRequest/${id}`, id).then(
      res => {
        console.log(res);
        this.handleClose();
      },
      err => console.log(err)
    )
  }

  AddInterview(){
    const scheduleDate = {
      date: this.state.schedule_date
    };
    API.post(`api/schedule/create`, scheduleDate).then(
      res => {
        console.log(res);
        if(res.data.status == 200){
           const data = {
            interviewer_id: res.data.data.interviewer_id,
            date: res.data.data.schedule_time,
            id: res.data.data.id
          }
          this.setState({scheduleDate: [...this.state.scheduleDate, data] });
          console.log(data);
        }
        this.showModal();
      },
      err => console.log(err)
    )
  }
  confirmInterview(id){
    console.log(id);
    API.post(`api/ApproveInterviewRequest/${id}`).then(
      res => {
        if(res.data.status == 200){
          console.log(res);
          this.getMyBookedSchedules();
        }
      },
      err => console.log(err)
    )
  }
  DeleteSchedule(){
    const id = this.state.deleteScheduleID;
    API.delete(`api/schedule/delete/${id}`, id).then(
      res => {
        if(res.data.status == 200){
          this.setState({scheduleDate: []});
          this.getMySchedules();
          this.toggleDeleteSchedule();
        }
        
      },
      err => console.log(err)
    )
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
                    decline={() => this.declineInterviewRequest(r.applicant_id)}
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
         <div className="calendar_container" >
          <div className="calendar-area">
            <FullCalendar
              // dateClick={this.handleDateClick}
              eventClick={this.handleDateClick}
              defaultView="dayGridMonth"
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
          title={`Delete Schedule`}
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
               onClick={this.declineInterviewRequest}
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
        console.log(res);
        if(res.data.data.length > 0){
           res.data.data.forEach(schedule => {
            console.log(schedule);
            const data = {
              id: schedule.id,
              date: schedule.schedule_time,
              color: 'pink',
              description: 'a description'
            }
            this.setState({scheduleDate: [...this.state.scheduleDate, data]})
          });
        }
      },
      err => console.log(err)
    ).then(
      () => {
        this.getApprovedInterview();
      }
    )
    .catch( err => console.log(err))
  }

  getMyBookedSchedules(){
    API.get('api/showAllPendingInterview').then(
      res => {
        console.log(res.data);
        if(res.data.data.length > 0){
          this.setState({pendingSchedule: res.data.data});
        }
        console.log(this.state.pendingSchedule);
      }
      
    ).catch(err => console.log(err))
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
            confirmSchedule.id = c.id;

            console.log(confirmSchedule.id);
            const scheduleArr = [...this.state.scheduleDate];
            const schedule = scheduleArr.find(r => r.id == confirmSchedule.id);

              const dataId = scheduleArr.indexOf(schedule);

            c.applicant_details.forEach(r => {
              confirmSchedule.title = `${r.first_name} ${r.last_name}`;
              console.log(confirmSchedule);

              if(dataId != -1){
                console.log(dataId);
                scheduleArr[dataId] = confirmSchedule;
              this.setState({scheduleDate: scheduleArr});
              }

            })
          })
        }
        // console.log(confirmSchedule);

        // const scheduleArr = [...this.state.scheduleDate];
        // console.log(scheduleArr);
        // const schedule = scheduleArr.findIndex(r => r.interviewer_id == confirmSchedule.interviewer_id);
        // console.log(schedule);
        // let item = {...scheduleArr[schedule]};
        // console.log(item);
        // item = confirmSchedule;
        // scheduleArr[schedule] = item;
        // this.setState({scheduleDate: scheduleArr});

        // this.getMySchedules();

      }
      
    ).catch(err => console.log(err))

  }

  handleDateClick = (eventObj) => { 
    const id = eventObj.event.id;
    this.setState({deleteScheduleID: id});
    this.toggleDeleteSchedule();
    // console.log(arg.id)
  }
}
export default ProductList;
