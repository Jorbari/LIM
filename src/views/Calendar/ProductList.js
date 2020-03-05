
import React, { Component } from 'react';
// import { Calendar } from '@fullcalendar/core';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

class ProductList extends Component{
  render() {
    return(
      <div>
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
      
    )


  }

  handleDateClick = (arg) => { // bind with an arrow function
    console.log(arg);
  }
}
export default ProductList;