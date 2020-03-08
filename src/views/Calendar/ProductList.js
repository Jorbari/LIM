
import React, { Component } from 'react';
// import { Calendar } from '@fullcalendar/core';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';


class ProductList extends Component{
  render() {
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
      
      </div>
     
    )


  }

  handleDateClick = (arg) => { // bind with an arrow function
    console.log(arg);
  }
}
export default ProductList;
