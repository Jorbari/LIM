import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Divider, Drawer, Hidden } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { Profile, SidebarNav } from './components';

const useStyles = makeStyles(theme => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up('lg')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)'
    }
  },
  root: {
    backgroundColor: '#222753',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(2)
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  nav: {
    marginBottom: theme.spacing(2)
  }
}));

const Sidebar = props => {
  const { open, variant, onClose, className, ...rest } = props;

  const classes = useStyles();

  const Small_screen_pages = [
    {
      title: 'Dashboard',
      href: '/applicant',
      icon: <DashboardIcon className="sidebarIconColour" />
    },
    {
      title: 'Account',
      href: '/applicant/account',
      icon: <AccountBoxIcon className="sidebarIconColour" />
    },
    {
      title: 'Logout',
      href: '/logout',
      icon: <ExitToAppIcon className="text-white" />
    },
  ];

  const Large_screen_pages = [
    {
      title: 'Dashboard',
      href: '/applicant',
      icon: <DashboardIcon className="sidebarIconColour" />
    },
    {
      title: 'Account',
      href: '/applicant/account',
      icon: <AccountBoxIcon className="sidebarIconColour" />
    },
  ];

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div
        {...rest}
        className={clsx(classes.root, className)}
      >
        <Profile />
        <Divider className={classes.divider} />
        <Hidden mdDown>
          <SidebarNav
            className={classes.nav}
            pages={Large_screen_pages}
          />
        </Hidden>
        <Hidden lgUp>
          <SidebarNav
            className={classes.nav}
            pages={Small_screen_pages}
          />
        </Hidden>
        
      </div>
    </Drawer>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired
};

export default Sidebar;
