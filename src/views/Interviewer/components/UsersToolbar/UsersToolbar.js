import React, {useState} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';
import Modals from '../../../../helpers/modal';

import { SearchInput } from 'components';

const useStyles = makeStyles(theme => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  spacer: {
    flexGrow: 1
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
  const { className, ...rest } = props;
  const [show, setShow] = useState(false);
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');


  const modalFirstNameInputChange = (event) => {
    setfirstName(event.target.value);
  }
  const handleClose = () => setShow(false);
  const modalLastNameInputChange = (event) => {
    setlastName(event.target.value);
  }
  const handleShow = () => {
     setShow(true);
  };
  const createInterviewerAccount = () => {

  }

  const classes = useStyles();

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.row}>
        <span className={classes.spacer} />
        {/* <Button className={classes.importButton}>Import</Button>
        <Button className={classes.exportButton}>Export</Button> */}
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
          placeholder="Search user"
        />
      </div>


      <Modals
        onHide={handleClose}
        show={show}
        title={`Add Interviewer`}
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

         
          <div className="Edit_user_" >
             <button
               className="btn btn-primary ml-auto"
               onClick={createInterviewerAccount}
             >Add Interviewer
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
