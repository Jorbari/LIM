import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Avatar, Typography } from '@material-ui/core';
import {reactLocalStorage} from 'reactjs-localstorage';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content'
  },
  avatar: {
    width: 60,
    height: 60
  },
  name: {
    marginTop: theme.spacing(1)
  }
}));

const Profile = props => {
  const { className, ...rest } = props;

  const classes = useStyles();
  // const userProfile = reactLocalStorage.getObject('userProfile');
  const Profile = reactLocalStorage.getObject('Profile');

  const user = {
    name: `${Profile.last_name}  ${Profile.first_name.slice(0, 3)}...`,
    avatar: Profile.photo,
    bio: Profile.RoleName
  };

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Avatar
        alt="Person"
        className={classes.avatar}
        component={RouterLink}
        src={user.avatar}
        to="/interviewer/account"
      />
      <Typography
        className={classes.name}
        variant="h4"
      >
        <span className="sideProfile_white" >
          {user.name}
        </span>
        
      </Typography>
      <Typography
        className="sideProfile_white"
        variant="body2"
      >{user.bio}</Typography>
    </div>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;
