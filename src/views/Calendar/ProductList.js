
import React, { Component } from 'react';
// import { Calendar } from '@fullcalendar/core';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

class ProductList extends Component{
  render() {
    return(
      <div className="calendar_container" >
        <div className="calendar-area">
          <FullCalendar
            dateClick={this.handleDateClick}
            defaultView="dayGridMonth"
            events={[
              { title: 'event 1', date: '2020-03-03' },
              { title: 'event 1', date: '2020-03-03' },
              { title: 'event 1', date: '2020-03-03' },
              { title: 'event 2', date: '2020-03-04' }
            ]}
            plugins={[ dayGridPlugin, interactionPlugin  ]}
            selectable
          />
        </div>

        <div className="update_calendar_container" >
          <h1>goes in here</h1>
        </div>
        
      </div>
      
    )


  }

  handleDateClick = (arg) => { // bind with an arrow function
    console.log(arg);
  }
}
export default ProductList;
