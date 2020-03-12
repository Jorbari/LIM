
import React, { Component } from 'react';
// import { Calendar } from '@fullcalendar/core';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import API from '../../services/interviewer';
import Snippet from './snippet';
import Modals from '../../helpers/modal';


class ProductList extends Component{

  constructor(props){
    super(props);

    this.getMySchedules = this.getMySchedules.bind(this);
    this.getMyBookedSchedules = this.getMyBookedSchedules.bind(this);
    this.declineInterviewRequest = this.declineInterviewRequest.bind(this);
    this.declineInterview = this.declineInterview.bind(this);
    this.getMySchedules();
    this.getMyBookedSchedules();

    this.state = {
      scheduleDate: [],
      show: false,
      pendingSchedule: [],
      pendingScheduleId: ''
    }

    
  }

  handleClose(){
    this.setState({show: !this.state.show});
  }

  declineInterviewRequest(id){
    this.setState({pendingScheduleId: id});
    this.setState({show: true});
  }
  declineInterview(){
    const id = this.state.pendingScheduleId;
    API.delete(`api/DeleteInterviewRequest/${id}`, id).then(
      res => {
        console.log(res)
      },
      err => console.log(err)
    )
  }

  render() {
    let scheduleData;
    if(this.state.pendingSchedule.length > 0){
      scheduleData = this.state.pendingSchedule.map(
        e => (
          <div key={e.id}>
            {
            e.applicant_details.map(
              r => (
                <div key={e.id} >
                  <Snippet
                    firstName={r.first_name}
                    lastName={r.last_name}
                    decline={() => this.declineInterviewRequest(e.id)}
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
      scheduleData = 
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
            <button className="btn btn-warning _new-schedule" >New Schedule</button>
          </div>
        </div>
         <div className="calendar_container" >
          <div className="calendar-area">
            <FullCalendar
              dateClick={this.handleDateClick}
              defaultView="dayGridMonth"
              events = {this.state.scheduleDate}
              plugins={[ dayGridPlugin, interactionPlugin  ]}
              selectable
            />
          </div>

          <div className="update_calendar_container" >
            {/* <div className="no_booked_schedule" >
              <h4>It's a Free Day</h4>
              <p>
                Relax, you have no booked interview for today.
              </p>
              
            </div> */}

            {/* {
              this.state.pendingSchedule.map(e => (
                  e.applicant_details.map(r => ( 
                    <Snippet
                      firstName={r.first_name}
                      id={e.id}
                      lastName={r.last_name}
                      decline={this.declineInterviewRequest}
                    />
                  ))
              ))
            } */}

            {scheduleData}
            
            
          </div>
          
        </div>

        <Modals
          onHide={this.handleClose}
          show={this.state.show}
          title={`Decline Request`}
        >
        <div>
          Are you sure you wanto decline the request?
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
        res.data.data.forEach(schedule => {
          const data = {
            interviewer_id: schedule.interviewer_id,
            date: schedule.schedule_time
          }
          this.setState({scheduleDate: [...this.state.scheduleDate, data]})
        });
        // console.log(this.state.scheduleDate);
      },
      err => console.log(err)
    )
  }

  getMyBookedSchedules(){
    API.get('api/showAllPendingInterview').then(
      res => {
        console.log(res.data.data);
        this.setState({pendingSchedule: res.data.data});
        console.log(this.state.pendingSchedule);
      }
      
    ).catch(err => console.log(err))
  }

  handleDateClick = (arg) => { // bind with an arrow function
    console.log(arg);
  }
}
export default ProductList;

/*
events={[
  { id: 1, title: 'event 1', date: '2020-03-03' },
  { id: 2, title: 'event 2', date: '2020-03-04' },
  { id: 3, title: 'event 3', date: '2020-03-05' },
  { id: 4, title: 'event 4', date: '2020-03-06' }
]}
*/
