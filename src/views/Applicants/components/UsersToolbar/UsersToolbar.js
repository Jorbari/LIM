import React, {useState} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';
import Modals from '../../../../helpers/modal';
import API from '../../../../services/general';

import { SearchInput } from 'components';

const useStyles = makeStyles(theme => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1),
    justifyContent: 'space-between',
    
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
  },

}));


const UsersToolbar = props => {
  const { updateuser, searchInput, className, ...rest } = props;
  const [show, setShow] = useState(false);
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [email, setEmail] = useState('');
  const [programme, setProgramme] = useState('');
  const [password, setPassword] = useState('');


  const modalFirstNameInputChange = (event) => {
    setfirstName(event.target.value);
  }
  const modalLastNameInputChange = (event) => {
    setlastName(event.target.value);
  }
  const modalEmailInputChange = (event) => {
    setEmail(event.target.value);
  }
  const modalPasswordInputChange = (event) => {
    setPassword(event.target.value);
  }
  const handleClose = () => setShow(false);

  const handleShow = () => {
     setShow(true);
      };
  const createApplicantAccount = () => {
    const accountModel = {
      first_name:firstName,
      last_name:lastName,
      email: email.toLowerCase(),
      password:password,
      programme: programme
    }

    API.post('api/createApplicant', accountModel)
    .then(
      res => {
        console.log(res);
        setfirstName('');
        setlastName('');
        setEmail('');
        setPassword('');
        updateuser(true);
        handleClose();
      }
    )
    .catch(
      err => console.log(err)
    )

  }

  const filterSearch = (event) => {
    searchInput(event.target.value);
  }

  const classes = useStyles();

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.wrapper} >

        <div className={classes.row}>
            <Button
              color="primary"
              onClick={handleShow}
              variant="contained"
            >
              Add Applicant
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
        title={`Add Applicant`}
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
          <div className="form-group">
            <label htmlFor="email">Programme:</label>
            <input
              className="form-control"
              onChange={(event) => setProgramme(event.target.value)}
              placeholder="Enter Last Name"
              type="text"
              value={programme}
            />
            {
              programme.length == 0 && 
              <p className="err_sm_" >
                Field cannot be left blank
              </p>
            }
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
            {
              email.length == 0 && 
              <p className="err_sm_" >
                Field cannot be left blank
              </p>
            }
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
            {
              password.length == 0 && 
              <p className="err_sm_" >
                Field cannot be left blank
              </p>
            }
          </div>

         
          <div className="Edit_user_" >
             <button
               className="btn btn-primary ml-auto"
               disabled={firstName.length == 0 || lastName.length == 0 || email.length == 0 || password.length == 0 || !programme}
               onClick={createApplicantAccount}
             >Add Applicant
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
