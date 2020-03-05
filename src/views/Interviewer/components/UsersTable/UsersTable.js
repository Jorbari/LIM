import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Modals from '../../../../helpers/modal';
import { makeStyles } from '@material-ui/styles';
import 'font-awesome/css/font-awesome.min.css';
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
  }
}));

const UsersTable = props => {
  const { className, users, ...rest } = props;
  const [show, setShow] = useState(false);
  const [clickedUser, SetclickedUser] = useState({});
  const handleClose = () => setShow(false);
  const handleShow = (user) => {
    setShow(true);
    SetclickedUser(user);
  };

  const classes = useStyles();

  // const [selectedUsers, setSelectedUsers] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  // const handleSelectAll = event => {
  //   const { users } = props;

  //   let selectedUsers;

  //   if (event.target.checked) {
  //     selectedUsers = users.map(user => user.id);
  //   } else {
  //     selectedUsers = [];
  //   }

  //   setSelectedUsers(selectedUsers);
  // };

  // const handleSelectOne = (event, id) => {
  //   const selectedIndex = selectedUsers.indexOf(id);
  //   let newSelectedUsers = [];

  //   if (selectedIndex === -1) {
  //     newSelectedUsers = newSelectedUsers.concat(selectedUsers, id);
  //   } else if (selectedIndex === 0) {
  //     newSelectedUsers = newSelectedUsers.concat(selectedUsers.slice(1));
  //   } else if (selectedIndex === selectedUsers.length - 1) {
  //     newSelectedUsers = newSelectedUsers.concat(selectedUsers.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelectedUsers = newSelectedUsers.concat(
  //       selectedUsers.slice(0, selectedIndex),
  //       selectedUsers.slice(selectedIndex + 1)
  //     );
  //   }

  //   setSelectedUsers(newSelectedUsers);
  // };

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
  };

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
                    {/* <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedUsers.length === users.length}
                      color="primary"
                      indeterminate={
                        selectedUsers.length > 0 &&
                        selectedUsers.length < users.length
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell> */}
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Registration date</TableCell>
                    <TableCell>Active</TableCell>
                    {/* <TableCell>Registration date</TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.slice(0, rowsPerPage).map(user => (
                    <TableRow
                      className={classes.tableRow}
                      hover
                      key={user.id}
                    >
                      {/* <TableRow
                    className={classes.tableRow}
                    hover
                    key={user.id}
                    selected={selectedUsers.indexOf(user.id) !== -1
                    }
                  > */}
                      {/* <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedUsers.indexOf(user.id) !== -1}
                        color="primary"
                        onChange={event => handleSelectOne(event, user.id)}
                        value="true"
                      />
                    </TableCell> */}
                      <TableCell>
                        <div className={classes.nameContainer}>
                          <Avatar
                            className={classes.avatar}
                            src={user.avatarUrl}
                          >
                            {getInitials(user.name)}
                          </Avatar>
                          <Typography variant="body1">{user.name}</Typography>
                        </div>
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        {moment(user.createdAt).format('DD/MM/YYYY')}
                      </TableCell>
                      <TableCell>
                        <div className="user_active_state" >
                        true
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
      </Card>
  

      <Modals
        onHide={handleClose}
        show={show}
        title={'Edit ' + clickedUser.name}
      >
        <form action="/action_page.php">
          <div className="form-group">
            <label htmlFor="email">Name:</label>
            <input
              className="form-control"
              id="text"
              placeholder="users email"
              type="text"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              className="form-control"
              id="email"
              placeholder="Enter email"
              type="email"
            />
          </div>

          <div className="form-group form-check">
            <label className="form-check-label">
              <input
                className="form-check-input"
                type="checkbox"
              /> User Diactivated
            </label>
          </div>
          <div className="Edit_user_" >
             <button
               className="btn btn-primary ml-auto"
               type="submit"
             >Edit Details
          </button>
          </div>
         
        </form>
      </Modals>

    </div>
    
  );
};

UsersTable.propTypes = {
  className: PropTypes.string,
  users: PropTypes.array.isRequired
};

export default UsersTable;