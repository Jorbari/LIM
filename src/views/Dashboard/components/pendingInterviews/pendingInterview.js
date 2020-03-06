import React, {useState} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import InsertChartIcon from '@material-ui/icons/InsertChartOutlined';
import API from '../../../../services/interviewer';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText
  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  title: {
    fontWeight: 700
  },
  avatar: {
    backgroundColor: theme.palette.white,
    color: theme.palette.primary.main,
    height: 56,
    width: 56
  },
  icon: {
    height: 32,
    width: 32
  }
}));

const TotalProfit = props => {
  const { className, ...rest } = props;
  const [pendingInterview, setpendIngInterview]  = useState(0);

  const classes = useStyles();

  const getPendingInterview = () => {
    API.get('api/sumOfPendingInterview')
    .then(
      res => {
        setpendIngInterview(res.data.data);
      }
    )
    .catch(
      err => {
        console.log('an error occurred');
        console.log(err);
      }
    )
  }
  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      {getPendingInterview()}
      <CardContent>
        <Grid
          container
          justify="space-between"
        >
          <Grid item>
            <Typography
              className={classes.title}
              color="inherit"
              gutterBottom
              variant="body2"
            >
              PENDING INTERVIEW
            </Typography>
            <Typography
              color="inherit"
              variant="h3"
            >
              {pendingInterview}
            </Typography>
          </Grid>
          <Grid item>
          <Avatar className={classes.avatar}>
              <InsertChartIcon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

TotalProfit.propTypes = {
  className: PropTypes.string
};

export default TotalProfit;
