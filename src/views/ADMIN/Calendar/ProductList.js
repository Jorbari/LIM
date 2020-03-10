
import React, { Component } from 'react';
// import { Calendar } from '@fullcalendar/core';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import API from '../../../services/interviewer';
import Modals from '../../../helpers/modal';


class ProductList extends Component{
  constructor(props){
    super(props)
    this.state = {
      show: false,
      date: ''
    }

    this.getMySchedule = this.getMySchedule.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.setChosenDate = this.setChosenDate.bind(this);
    this.createSchedule = this.createSchedule.bind(this);
    this.getMySchedule();
  }
  handleShow(){
    this.setState({show: true});
  }
  handleClose(){
    this.setState({show: false});
  }
  setChosenDate(event) {
    this.setState({date: event.target.value})
  }
  render() {
    return(
      <div>
        <div className="top_calendar_" >
          <div>
            <h2>My Calendar</h2>
          </div>
          <div>
            <button
              className="btn btn-warning _new-schedule"
              onClick={this.handleShow}
            >New Schedule</button>
          </div>
        </div>
         <div className="calendar_container" >
          <div className="calendar-area">
            <FullCalendar
              dateClick={this.handleDateClick}
              defaultView="dayGridMonth"
              events={[
                { id: 1, title: 'event 1', date: '2020-03-03' },
                { id: 2, title: 'event 2', date: '2020-03-04' },
                { id: 3, title: 'event 3', date: '2020-03-05' },
                { id: 4, title: 'event 4', date: '2020-03-06' }
              ]}
              plugins={[ dayGridPlugin, interactionPlugin  ]}
              selectable
            />
          </div>

          <div className="update_calendar_container" >
            <div className="no_booked_schedule" >
              <h4>It's a Free Day</h4>
              <p>
                Relax, you have no booked interview for today.
              </p>
            </div>
            
          </div>
          
        </div>
      



        
      <Modals
        onHide={this.handleClose}
        show={this.state.show}
        title={`Create Schedule`}
      >
        <div>
          <div className="form-group">
            <label htmlFor="email">Enter Date:</label>
            <input
              className="form-control"
              onChange={this.setChosenDate}
              placeholder="Enter First Name"
              type="date"
              value={this.state.date}
            />
            {
              this.state.date.length == 0 && 
              <p className="err_sm_" >
                Field cannot be left blank
              </p>
            }
          </div>
          
          <div className="Edit_user_" >
             <button
               className="btn btn-primary ml-auto"
               disabled={this.state.date.length == 0}
               onClick={this.createSchedule}
             >Create Schedule
          </button>
          </div>
         
        </div>
      </Modals>
   

      </div>
     
    )


  }

  handleDateClick = (arg) => { // bind with an arrow function
    console.log(arg);
  }
  createSchedule(){
    const scheduleDate = {
      date: this.state.date
    }

    console.log(scheduleDate);
    API.get('api/schedule/create', scheduleDate).then(
      res => {
        console.log(res);
        this.handleClose();
      }
    )
    .catch(
      err => console.log(err)
    )
  }
  getMySchedule(){
    API.get('api/schedule/show').then(
      res => {
        console.log(res.data.data);
      }
    )
    .catch(
      err => console.log(err)
    )
  }
}
export default ProductList;
