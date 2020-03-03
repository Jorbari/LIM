// import React, { useState } from 'react';
// import { makeStyles } from '@material-ui/styles';
// import { IconButton, Grid, Typography } from '@material-ui/core';
// import ChevronRightIcon from '@material-ui/icons/ChevronRight';
// import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

// import { ProductsToolbar, ProductCard } from './components';
// import mockData from './data';

// const useStyles = makeStyles(theme => ({
//   root: {
//     padding: theme.spacing(3)
//   },
//   content: {
//     marginTop: theme.spacing(2)
//   },
//   pagination: {
//     marginTop: theme.spacing(3),
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'flex-end'
//   }
// }));

// const ProductList = () => {
//   const classes = useStyles();

//   const [products] = useState(mockData);

//   return (
//     <div className={classes.root}>
//       <ProductsToolbar />
//       <div className={classes.content}>
//         <Grid
//           container
//           spacing={3}
//         >
//           {products.map(product => (
//             <Grid
//               item
//               key={product.id}
//               lg={4}
//               md={6}
//               xs={12}
//             >
//               <ProductCard product={product} />
//             </Grid>
//           ))}
//         </Grid>
//       </div>
//       <div className={classes.pagination}>
//         <Typography variant="caption">1-6 of 20</Typography>
//         <IconButton>
//           <ChevronLeftIcon />
//         </IconButton>
//         <IconButton>
//           <ChevronRightIcon />
//         </IconButton>
//       </div>
//     </div>
//   );
// };

// export default ProductList;



// import React from 'react';
// import { Inject, ScheduleComponent, Day, Week, WorkWeek, Month, Agenda } from '@syncfusion/ej2-react-schedule';

// class ProductList extends React.Component {
//   render() {
//     return <ScheduleComponent>
//       <Inject services={[Day, Week, WorkWeek, Month, Agenda]}/>
//     </ScheduleComponent>
//   }
// }


import React, { Component } from 'react';
// import { Calendar } from '@fullcalendar/core';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

class ProductList extends Component{
  render() {
    return(
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
        selectable={true}
      />
    )

    // const Calendar = new Calendar(calendarEl, {
    //   defaultView: 'timeGrid',
    //   visibleRange: {
    //     start: '2020-03-22',
    //     end: '2020-03-25'
    //   }
    // });

  }

  handleDateClick = (arg) => { // bind with an arrow function
    console.log(arg);
  }
}
export default ProductList;
