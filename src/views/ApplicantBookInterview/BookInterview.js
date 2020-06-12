/* eslint-disable react/no-multi-comp */
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import PerfectScrollbar from 'react-perfect-scrollbar';
// ************
// /* eslint-disable react/no-set-state */
import {
  Grid,
  Typography as MuiTypography,
  ListSubheader
} from '@material-ui/core';
import API from '../../services/general';
import ErrorHandler from '../../helpers/error';

import { getInitials } from 'helpers';
import moment from 'moment';

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

const useStyles = makeStyles(theme => ({
  list: {
    width: 400
  },
  fullList: {
    width: 'auto'
  },

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
  }
}));

// type Anchor = 'top' | 'left' | 'bottom' | 'right';
const BookInterview = props => {
  const classes = useStyles();
  const [sideBar, setsideBar] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false
  });
  const [listOfInterviewers, setlistOfInterviewers] = useState([]);
  const [listOfSchedules, setlistOfSchedules] = useState([]);
  const [errorMsg, seterrorMsg] = useState('');
  const [variant, setvariant] = useState('');
  const [show, setshow] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const toggleDrawer = (anchor, open, id) => event => {
    console.log(open);
    if (open) {
      showAnInterviewerSchedule(id);
    }
    if (!open) {
      setlistOfSchedules([]);
    }
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setsideBar({ ...sideBar, [anchor]: open });
  };

  const list = anchor => (
    <div
      className={clsx(classes.list)}
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
      role="presentation"
    >
      {listOfSchedules.length < 1 && (
        <div className="no__schedule">No scheduled interview!!!</div>
      )}

      <List>
        {listOfSchedules.map(schedules => (
          <ListItem
            button
            key={schedules.id}
          >
            <div
              className="card_side_"
              key={schedules.id}
            >
              <p>Date: {schedules.schedule_time}</p>
              <hr />
              <button
                className="btn card_side_btn"
                onClick={() => createInterviewRequest(schedules)}
              >
                Book Interview
              </button>
            </div>

            <Divider />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const getInterviewerList = () => {
    API.get('api/listOfInterviewers')
      .then(res => {
        console.log(res.data.data.length);
        if (res.data.data.length > 0) {
          setlistOfInterviewers(res.data.data);
          console.log(listOfInterviewers);
        }
      })
      .catch(err => console.log('**********', err));
  };

  const showAnInterviewerSchedule = id => {
    API.get(`api/showAnInterviewerSchedule/${id}`)
      .then(res => {
        console.log(res);
        if (res.data.data) {
          setlistOfSchedules(res.data.data);
        }
        console.log(listOfSchedules);
      })
      .catch(err => console.log('**********', err));
  };

  const createInterviewRequest = request => {
    const date = {
      session_time: request.schedule_time
    };

    API.post(`api/createInterviewRequest/${request.interviewer_id}`, date)
      .then(res => {
        console.log(res);
        if (res.data.status != 200) {
          if (res.data.data?.session_time) {
            res.data.data.session_time.forEach(error => {
              seterrorMsg(error);
            });
          } else {
            seterrorMsg(res.data.message);
          }
          setvariant('danger');
          setshow(true);
        } else {
          seterrorMsg(res.data.message);
          setvariant('success');
          setshow(true);
        }
      })
      .catch(err => {
        console.log(err);
        seterrorMsg('An error occurred, please kindly try again!!!');
        setvariant('danger');
        setshow(true);
      });
  };

  const showError = () => {
    setshow(false);
  };

  const handlePageChange = (event, page) => {
    console.log('****** i am here *******');
    console.log(page);
    console.log(event);
    setPage(page);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
  };

  // **************

  let interviewerArr;
  let interviewerSchedule;
  let _interviewArr;

  if (listOfInterviewers.length > 0) {
    interviewerArr = (
      <div>
        <Card className={clsx(classes.root)}>
          <CardContent className={classes.content}>
            <PerfectScrollbar>
              <div className={classes.inner}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {listOfInterviewers
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
                            <div className={classes.nameContainer}>
                              <Avatar
                                className={classes.spaceRight}
                                src={user.photo}
                              >
                                {getInitials(user.first_name)}
                              </Avatar>
                              <Typography variant="body1">
                                {user.first_name} {user.last_name}
                              </Typography>
                            </div>
                          </TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            {moment(user.created_at).format('DD/MM/YYYY')}
                          </TableCell>
                          <TableCell>
                            {/* <div className={(user.is_active == 1) ? 'user_active' : 'user_inactive'} >
                  {user.is_active ? 'true' : 'false'}
                  </div> */}
                          </TableCell>
                          <TableCell>
                            {['right'].map(anchor => (
                              <React.Fragment key={anchor}>
                                <Button
                                  className="btn btn__less"
                                  onClick={toggleDrawer(anchor, true, user.id)}
                                >
                                  <i className="fa fa-plus-circle open_sideBar_icon" />
                                </Button>
                                <Drawer
                                  anchor={anchor}
                                  onClose={toggleDrawer(anchor, false)}
                                  open={sideBar[anchor]}
                                >
                                  {list(anchor)}
                                </Drawer>
                              </React.Fragment>
                            ))}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </PerfectScrollbar>
          </CardContent>

          <CardActions className={classes.actions}>
            <TablePagination
              component="div"
              count={listOfInterviewers.length}
              onChangePage={handlePageChange}
              onChangeRowsPerPage={handleRowsPerPageChange}
              page={page}
              rowsPerPage={rowsPerPage}
              rowsPerPageOptions={[5, 10, 25]}
            />
          </CardActions>
        </Card>
      </div>
    );
  }

  else {
    _interviewArr = (
      <div className="no_record_found">
        <p>No interviewer record found...!!!</p>
      </div>
    );
  }

  // *************

  useEffect(() => {
    getInterviewerList();
  }, []);

  return (
    <div>
      <div>
        {_interviewArr}

        <ErrorHandler
          close={showError}
          message={errorMsg}
          show={show}
          variant={variant}
        />

        <div className="_wrapper__">
          <Grid
            container
            spacing={4}
          >
            <div className="Applicant_interview_wrapper">{interviewerArr}</div>

            <div
              className="sidenav"
              id="mySidenav"
            >
              <a className="closebtn">&times;</a>
              {interviewerSchedule}
            </div>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default BookInterview;
