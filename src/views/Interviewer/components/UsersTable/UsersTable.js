import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import Switch from '@material-ui/core/Switch';
import 'font-awesome/css/font-awesome.min.css';
import Modals from '../../../../helpers/modal';
import API from '../../../../services/general';
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  // Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination
} from '@material-ui/core';

import { getInitials } from 'helpers';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1050
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: 'flex-end'
  },
  spaceRight: {
    marginRight: '3%',
    fontSize: '15px'
  },

}));

const noData = {
  noData: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: '1%',
    fontize: '1.4rem',
    color: '#222753'
  }
}

const UsersTable = props => {
  const [state, setState] = useState(false);
  const { className, users, ...rest } = props;
  const [show, setShow] = useState(false);
  const [id, setId] = useState();
  
  const [firstName, setfirstName] = useState('');
  
  const [lastName, setlastName] = useState('');
  const handleClose = () => setShow(false);
  const handleShow = (user) => {
    console.log(user);
    if(user.is_active == 1){
      setState(true);
    }
    setShow(true);
    setId(user.id);
    setfirstName(user.first_name);
    setlastName(user.last_name);
  };

  const handleChange = () => {
    setState(!state);
      API.post(`api/activateInterviewer/${id}`).then(
        res => {
          users.find(r => {
            if(r.id == res.data.data.id){
              r.is_active = res.data.data.is_active;
            }
            return;
          } )
        }
      ).catch(err => console.log(err))
  };

  const modalFirstNameInputChange = (event) => {
    setfirstName(event.target.value);
  }
  const modalLastNameInputChange = (event) => {
    setlastName(event.target.value);
  }
  const classes = useStyles();

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const handlePageChange = (event, page) => {
    console.log('****** i am here *******');
    console.log(page);
    console.log(event);
    setPage(page);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
  };

  const updateInterviewerProfile = () => {
    const updateProfile = {
      first_name: firstName,
      last_name: lastName
    }
    API.put(`api/updateApplicant/${id}`, updateProfile ).then(
      res => {
        users.find(r => {
          if(r.id == id){
            r.first_name = firstName;
            r.last_name = lastName
          }
          handleClose();
        })
      }
    ).catch(err => console.log(err))
  }



  let isDataFound;
  if(users.length < 1) {
    isDataFound = 
    <p style={noData.noData}>No Data</p>
  }


  return (

    <div>
      
      <Card
        {...rest}
        className={clsx(classes.root, className)}
      >
        <CardContent className={classes.content}>
          <PerfectScrollbar>
            <div className={classes.inner}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Registration date</TableCell>
                    <TableCell>Active</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  
                  {users?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(user => (
                    <TableRow
                      className={classes.tableRow}
                      hover
                      key={user.id}
                    >
                      <TableCell>
                        <div className={classes.nameContainer}>
                          <Avatar
                            className={classes.spaceRight}
                            src={user.photo}
                          >
                            {getInitials(user.first_name)}
                          </Avatar>
                          <Typography variant="body1">{user.first_name} {user.last_name}</Typography>
                        </div>
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        {moment(user.created_at).format('DD/MM/YYYY')}
                      </TableCell>
                      <TableCell>
                        <div className={(user.is_active == 1) ? 'user_active' : 'user_inactive'} >
                        {user.is_active ? 'true' : 'false'}
                        </div>
                      </TableCell>
                      <TableCell>
                        <button
                          className="btn btn-warning"
                          onClick={() => handleShow(user)}
                        >
                          <i className="fa fa-pencil" />
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}

                </TableBody>
              </Table>
            </div>
          </PerfectScrollbar>
        </CardContent>
        {
          !isDataFound && 
          <CardActions className={classes.actions}>
          <TablePagination
            component="div"
            count={users.length}
            onChangePage={handlePageChange}
            onChangeRowsPerPage={handleRowsPerPageChange}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </CardActions>
        }
        
        {isDataFound}
      </Card>
  

      <Modals
        onHide={handleClose}
        show={show}
        title={`Edit Account`}
      >
        <div>
          

          
          <div className="form-group">
            <label htmlFor="email">First Name:</label>
            <input
              className="form-control"
              onChange={modalFirstNameInputChange}
              placeholder="Enter First Name"
              type="text"
              value={firstName}
            />
            {
              firstName.length == 0 && 
              <p className="err_sm_" >
                Field cannot be left blank
              </p>
            }
          </div>



          <div className="form-group">
            <label htmlFor="email">Last Name:</label>
            <input
              className="form-control"
              onChange={modalLastNameInputChange}
              placeholder="Enter Last Name"
              type="text"
              value={lastName}
            />
            {
              lastName.length == 0 && 
              <p className="err_sm_" >
                Field cannot be left blank
              </p>
            }
          </div>

          <div className="form-group form-check">
            <label
              className="form-check-label"
              data-toggle="tooltip"
              title="Toggle the switch to either activate or di-activate a user"
            >
              <Switch
                checked={state}
                inputProps={{ 'aria-label': 'secondary checkbox' }}
                onChange={handleChange}
                value="checkedA"
              />
              Di-activate user
            </label>
          </div>
          <div className="Edit_user_" >
             <button
               className="btn btn-primary ml-auto"
               disabled={lastName.length == 0 || firstName.length == 0}
               onClick={updateInterviewerProfile}
             >Edit Details
          </button>
          </div>
         
        </div>
      </Modals>
   
    </div>
    
  );
};

UsersTable.propTypes = {
  className: PropTypes.string,
  users: PropTypes.array.isRequired
};

export default UsersTable;
