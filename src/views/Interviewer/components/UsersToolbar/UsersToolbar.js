import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';
import moment from 'moment';
import Modals from '../../../../helpers/modal';
import API from '../../../../services/general';

import { SearchInput } from 'components';

const useStyles = makeStyles(theme => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: '2rem'
  },
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  searchInput: {
    marginRight: theme.spacing(1)
  }
}));

const UsersToolbar = props => {
  const { updateuser, searchInput, className, ...rest } = props;
  const [show, setShow] = useState(false);
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [sessionId, setsessionId] = useState();
  const [sessionList, setSessionList] = useState([]);

  useEffect(() => {
    getSessionList();
  }, []);

  const getSessionList = () => {
    API.get('api/return_all_sessions')
      .then(res => {
        if (res.data.status == 200) {
          console.log(res.data.data);
          setSessionList(res.data.data);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const modalFirstNameInputChange = event => {
    setfirstName(event.target.value);
  };
  const modalLastNameInputChange = event => {
    setlastName(event.target.value);
  };
  const modalEmailInputChange = event => {
    setEmail(event.target.value);
  };
  const modalPasswordInputChange = event => {
    setPassword(event.target.value);
  };
  const handleClose = () => setShow(false);

  const handleShow = () => {
    setShow(true);
  };
  const createInterviewerAccount = () => {
    // add sessionId
    const accountModel = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
      session_range_id: sessionId
    };

    API.post('api/createInterviewer', accountModel)
      .then(res => {
        console.log(res);
        setfirstName('');
        setlastName('');
        setEmail('');
        setPassword('');
        updateuser(true);
        handleClose();
      })
      .catch(err => console.log(err));
  };

  const filterSearch = event => {
    searchInput(event.target.value);
  };

  const classes = useStyles();

  const optionClicked = event => {
    setsessionId(event.target.value);
  };

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.wrapper}>
        <div className={classes.row}>
          <Button
            color="primary"
            onClick={handleShow}
            variant="contained"
          >
            Add Interviewer
          </Button>
        </div>
        <div className={classes.row}>
          <SearchInput
            className={classes.searchInput}
            onChange={filterSearch}
            placeholder="Search user"
          />
        </div>
      </div>

      <Modals
        onHide={handleClose}
        show={show}
        title={`Add Interviewer`}
      >
        <div>
          <div className="form-group">
            <label htmlFor="email">Select Session:</label>
            <select
              className="form-control"
              onChange={optionClicked}
            >
              {sessionList.map(session => (
                <option
                  key={session.id}
                  value={session.id}
                >
                  {session.title}: {moment(session.from).format('DD/MM/YYYY')} -{' '}
                  {moment(session.to).format('DD/MM/YYYY')}
                </option>
              ))}
            </select>
            {/* <h1>{sessionId}</h1> */}
            {!sessionId && (
              <p className="err_sm_">Field cannot be left blank</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">First Name:</label>
            <input
              className="form-control"
              onChange={modalFirstNameInputChange}
              placeholder="Enter First Name"
              type="text"
              value={firstName}
            />
            {firstName.length == 0 && (
              <p className="err_sm_">Field cannot be left blank</p>
            )}
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
            {lastName.length == 0 && (
              <p className="err_sm_">Field cannot be left blank</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              className="form-control"
              onChange={modalEmailInputChange}
              placeholder="Enter Email Address"
              type="email"
              value={email}
            />
            {email.length == 0 && (
              <p className="err_sm_">Field cannot be left blank</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="email">Password:</label>
            <input
              className="form-control"
              onChange={modalPasswordInputChange}
              placeholder="Enter Password"
              type="password"
              value={password}
            />
            {password.length == 0 && (
              <p className="err_sm_">Field cannot be left blank</p>
            )}
          </div>

          <div className="Edit_user_">
            <button
              className="btn btn-primary ml-auto"
              disabled={
                firstName.length == 0 ||
                lastName.length == 0 ||
                email.length == 0 ||
                password.length == 0 ||
                !sessionId
              }
              onClick={createInterviewerAccount}
            >
              Add Interviewer
            </button>
          </div>
        </div>
      </Modals>
    </div>
  );
};

UsersToolbar.propTypes = {
  className: PropTypes.string
};

export default UsersToolbar;
