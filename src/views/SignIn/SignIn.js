/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import {reactLocalStorage} from 'reactjs-localstorage';
import { Spinner } from 'react-bootstrap';
import ErrorHandler from '../../helpers/error';
import {
  Grid,
  Button,
  // IconButton,
  TextField,
  Typography
} from '@material-ui/core';
import API from '../../services/login';

const schema = {
  email: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true,
    length: {
      maximum: 64
    }
  },
  password: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 128
    }
  }
};

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%'
  },
  grid: {
    height: '100%'
  },
  quoteContainer: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  quote: {
    backgroundColor: theme.palette.neutral,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'linear-gradient(rgba(63, 81, 181, 0.49), rgba(63, 81, 181, 0)), url(/images/login.jpg)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  quoteInner: {
    textAlign: 'center',
    flexBasis: '600px'
  },
  quoteText: {
    color: theme.palette.white,
    fontWeight: 300
  },
  name: {
    marginTop: theme.spacing(3),
    color: theme.palette.white
  },
  bio: {
    color: theme.palette.white
  },
  contentContainer: {},
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  contentHeader: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(5),
    paddingBototm: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  logoImage: {
    marginLeft: theme.spacing(4)
  },
  contentBody: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center'
    }
  },
  form: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 125,
    flexBasis: 700,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
  title: {
    marginTop: theme.spacing(3)
  },
  socialButtons: {
    marginTop: theme.spacing(3)
  },
  socialIcon: {
    marginRight: theme.spacing(1)
  },
  sugestion: {
    marginTop: theme.spacing(2)
  },
  textField: {
    marginTop: theme.spacing(2)
  },
  signInButton: {
    margin: theme.spacing(2, 0)
  }
}));

const SignIn = props => {
  const { history } = props;

  const classes = useStyles();

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  useEffect(() => {
    const errors = validate(formState.values, schema);


    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);


  const handleChange = event => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };

  const [errorMsg, setErrorMsg] = useState('');
  const [variant, setvariant] = useState('');
  const [show, setShow] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const showError = () => {
    setShow(false);
  }

  // eslint-disable-next-line react/no-multi-comp
  const handleSignIn = e => {
    e.preventDefault();
    setisLoading(true);

    const loginModel = {
      email:formState.values.email,
      password:formState.values.password
    }

    API.post('api/AuthLogin',loginModel)
    .then(res => {
      if(res.data.status != 200){
        console.log(res);
        setErrorMsg(res.data.message);
        setvariant('danger');
        setShow(true);
        setisLoading(false);
      }
      else{
        const profileData = {
          id: res.data.data.User.id,
          first_name: res.data.data.User.first_name,
          last_name: res.data.data.User.last_name,
          email: res.data.data.User.email,
          photo: res.data.data.User.photo,
          RoleName: res.data.data.RoleName
        }
        console.log(res);
        reactLocalStorage.setObject('Profile', profileData);
        reactLocalStorage.set('token', res.data.data.User.token);
        console.log(res.data.data.User);
        if(res.data.data.RoleName == 'administrator'){
          window.location.href = '/admin';
        }
        else if(res.data.data.RoleName == 'interviewer'){
          window.location.href = '/interviewer';
        }
        else{
          window.location.href = '/applicant';
        }
      }
      
    }).catch(err => {
      
      console.log(err);
      setvariant('danger');
      setErrorMsg('An error occurred, Pls try again!')
      setShow(true);
      setisLoading(false);
      
    })
  };

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <div className={classes.root}>
      <Grid
        className={classes.grid}
        container
      >
        <Grid
          className={classes.quoteContainer}
          item
          lg={5}
        >
          <div className={classes.quote}>
            <div className={classes.quoteInner}>
              {/* <Typography
                className={classes.quoteText}
                variant="h1"
              >
                LIM INTERVIEW MANAGEMENT
              </Typography> */}
            </div>
          </div>
        </Grid>
        <Grid
          className={classes.content}
          item
          lg={7}
          xs={12}
        >
          <div className={classes.content}>
            <ErrorHandler
              close={showError}
              message={errorMsg}
              show={show}
              variant={variant}
            />
            <div className={classes.contentBody}>
              <form
                className={classes.form}
                onSubmit={handleSignIn}
              >
                <Typography
                  className={classes.title}
                  variant="h2"
                >
                  Sign in
                </Typography>
                <TextField
                  className={classes.textField}
                  error={hasError('email')}
                  fullWidth
                  helperText={
                    hasError('email') ? formState.errors.email[0] : null
                  }
                  label="Email address"
                  name="email"
                  onChange={handleChange}
                  type="text"
                  value={formState.values.email || ''}
                  variant="outlined"
                />
                <TextField
                  className={classes.textField}
                  error={hasError('password')}
                  fullWidth
                  helperText={
                    hasError('password') ? formState.errors.password[0] : null
                  }
                  label="Password"
                  name="password"
                  onChange={handleChange}
                  type="password"
                  value={formState.values.password || ''}
                  variant="outlined"
                />
                <div className="forgotten_pass" >
                Forgotten Password?<a  href="https://lim-manager.herokuapp.com/password/reset"> Click here </a>
                </div>
                
                <Button
                  className={classes.signInButton}
                  color="primary"
                  disabled={!formState.isValid || isLoading}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  {
                    isLoading === true && 
                    <Spinner
                      animation="grow"
                      variant="danger"
                    />
                  }
                  Sign in now
                </Button>
                
                {/* <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  Don't have an account?{' '}
                  <Link
                    component={RouterLink}
                    to="/sign-up"
                    variant="h6"
                  >
                    Sign up
                  </Link>
                </Typography> */}
              </form>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

// SignIn.propTypes = {
//   history: PropTypes.object
// };

export default withRouter(SignIn);
