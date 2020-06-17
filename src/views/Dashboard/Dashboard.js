import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Divider } from '@material-ui/core';
import clsx from 'clsx';
import { reactLocalStorage } from 'reactjs-localstorage';
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import PerfectScrollbar from 'react-perfect-scrollbar';
import moment from 'moment';

import { Budget, TotalUsers, TasksProgress, TotalProfit } from './components';
import { getInitials } from 'helpers';
import API from '../../services/general';
import ErrorHandler from '../../helpers/error';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
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
  flexBtnRight: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '2rem'
  }
}));

const userProfile = reactLocalStorage.getObject('Profile', { role: 'sss' });
const Auth = {
  userRole: userProfile.RoleName
};

const Dashboard = props => {
  const classes = useStyles();

  const [sessionList, setSessionList] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [showForm, setshowForm] = useState(false);

  // to handle sessionEdit condition
  const [editSessionCreation, setEditSessionCreation] = useState(false);
  const [sessionId, setSessionId] = useState();

  // for displaying succes or error message
  const [errorMsg, seterrorMsg] = useState('');
  const [variant, setvariant] = useState('');
  const [show, setshow] = useState('');

  // for handling form inputs
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [title, setTitle] = useState('');
  

  useEffect(() => {
    if(Auth.userRole == 'Administrator') {
      getSessionList();
    }
    
  }, [])

  const noData = {
    noData: {
      display: 'flex',
      justifyContent: 'center',
      paddingTop: '1%',
      fontize: '1.4rem',
      color: '#222753'
    }
  }


  const getSessionList = () => {
    API.get('api/return_all_sessions').then(
      res => {
        if(res.data.status == 200) {
          console.log(res)
          setSessionList(res.data.data)
        }
        
      }
    )
    .catch(
      err => {
        console.log(err)
      }
    )
  }
  const handFormSubmission = (event) => {
    event.preventDefault();

    if(editSessionCreation) {
      const dataPayload = {
        from : startDate,
        to : endDate,
      }

      API.put(`api/update_sessions/${sessionId}`, dataPayload)
      .then(
        res => {

          if(res.data.status == 200) {
            console.log(res)
            seterrorMsg(res.data.message);
            setvariant('success');
            setshow(true);

            setStartDate('');
            setEndDate('');
            setTitle('');

            getSessionList();

            setshowForm(!showForm);
            setEditSessionCreation(false)

          }
          else{
            seterrorMsg(res.data.message);
            setvariant('danger');
            setshow(true);
          }

        }
      )
      .catch(
        err => {
          console.log('err >>>>>>>', err);
          seterrorMsg('An error occured, please try again!!!');
          setvariant('danger');
          setshow(true);
        }
      )
    }
    else{
      if(startDate && endDate && title) {
        const dataPayload = {
          from : startDate,
          to : endDate,
          title : title
        }
  
        API.post('api/create_sessions', dataPayload)
        .then(
          res => {
  
            if(res.data.status == 200) {
              console.log(res)
              seterrorMsg(res.data.message);
              setvariant('success');
              setshow(true);
  
              setStartDate('');
              setEndDate('');
              setTitle('');
  
              getSessionList();
  
              setshowForm(!showForm);
  
            }
            else{
              seterrorMsg(res.data.message);
              setvariant('danger');
              setshow(true);
            }
  
          }
        )
        .catch(
          err => {
            console.log('err >>>>>>>', err);
            seterrorMsg('An error occured, please try again!!!');
            setvariant('danger');
            setshow(true);
          }
        )
      }

    }

    
  }

  const editSessionToggle = (details) => {
    console.log(details)
    setshowForm(true);
    setEditSessionCreation(true);
    setTitle(details.title);
    setSessionId(details.id);
  }

  const showFormSection = () => {
    setStartDate('');
    setEndDate('');
    setTitle('');
    setEditSessionCreation(false);
    setshowForm(!showForm);
  }

  const handlePageChange = (event, page) => {
    console.log('****** i am here *******');
    console.log(page);
    console.log(event);
    setPage(page);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
  };

  const showError = () => {
    setshow(false);
  };

  return (
    <div>

      <ErrorHandler
        close={showError}
        message={errorMsg}
        show={show}
        variant={variant}
      />

      <div
        className={classes.root}
        style={{
          display: Auth.userRole == 'Administrator' ? 'inherit' : 'none'
        }}
      >
        <Grid
          container
          spacing={4}
        >
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <Budget />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalUsers />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TasksProgress />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalProfit />
          </Grid>
        </Grid>

        { showForm &&
          <form
            className="form addSectionForm"
            onSubmit={handFormSubmission}
          >
            <div className="form-group">
              <label htmlFor="title_">Title</label>
              {
                editSessionCreation ? 
                <input
                  className="form-control"
                  disabled
                  id="title_"
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="Title"
                  type="text"
                  value={title}
                />
                :
                <input
                  className="form-control"
                  id="title_"
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="Title"
                  type="text"
                  value={title}
                />
              }
              
            </div>
            <div className="form-group">
              <label htmlFor="from_">Start Date</label>
              <input
                className="form-control"
                id="from_"
                onChange={(event) => setStartDate(event.target.value)}
                placeholder="Title"
                type="datetime-local"
                value={startDate}
              />
            </div>
            <div className="form-group">
              <label htmlFor="to_">End Date</label>
              <input
                className="form-control"
                id="to_"
                onChange={(event) => setEndDate(event.target.value)}
                placeholder="Title"
                type="datetime-local"
                value={endDate}
              />
            </div>

            {editSessionCreation ?
              <button
                className={'btn ' + (startDate && endDate ? 'validBtn' : 'inValid')}
                type="submit"
              >Edit</button> 
              : 
              <button
                className={'btn ' + (startDate && endDate && title ? 'validBtn' : 'inValid')}
                type="submit"
              >Submit</button> 
            }
            
            <button
              className="btn"
              onClick={() => showFormSection()}
            >Cancel</button>
          </form>
          }

          { !showForm && <Divider style={{marginTop: '2rem', marginBottom: '2rem'}} />}

        <div>
          <Card className={clsx(classes.root)}>
            <div className={clsx(classes.flexBtnRight)}>
              <button
                className="flexBtnRight"
                data-toggle="tooltip"
                onClick={() => showFormSection()}
                title="Add a new session"
              >Create New Session</button>
            </div>

            <CardContent className={classes.content}>
              <PerfectScrollbar>
                <div className={classes.inner}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell>Start</TableCell>
                        <TableCell>End</TableCell>
                        <TableCell />
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {sessionList
                        ?.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map(user => (
                          <TableRow
                            className={classes.tableRow}
                            hover
                            key={user.id}
                          >
                            <TableCell>
                              {user.title}
                            </TableCell>
                            <TableCell>
                              {moment(user.from).format('DD/MM/YYYY')}
                            </TableCell>
                            <TableCell>
                              {moment(user.to).format('DD/MM/YYYY')}
                            </TableCell>
                            <TableCell>
                              <Button
                                className="btn btn__less"
                                data-toggle="tooltip"
                                onClick={() => editSessionToggle(user)}
                                title="Edit session"
                              >
                                <i className="fa fa-pencil open_sideBar_icon" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              </PerfectScrollbar>
            </CardContent>

            {
              sessionList.length > 0 && 
              <CardActions className={classes.actions}>
                <TablePagination
                  component="div"
                  count={sessionList.length}
                  onChangePage={handlePageChange}
                  onChangeRowsPerPage={handleRowsPerPageChange}
                  page={page}
                  rowsPerPage={rowsPerPage}
                  rowsPerPageOptions={[5, 10, 25]}
                />
              </CardActions>
            }

            {
              sessionList.length < 1 && 
              <p style={noData.noData}>No Data</p>
             }
            
          </Card>
        </div>
      </div>

      <div
        className="interviewer-dashboard"
        style={{
          display: Auth.userRole == 'Interviewer' ? 'inherit' : 'none'
        }}
      >
        <Budget />
      </div>

      <div
        className="interviewer-dashboard"
        style={{ display: Auth.userRole == 'Applicant' ? 'inherit' : 'none' }}
      >
        <Budget />
      </div>
    </div>
  );
}

export default Dashboard;
