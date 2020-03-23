import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {reactLocalStorage} from 'reactjs-localstorage';
import API from '../../../../services/general';
import FileBase64 from 'react-file-base64';
import ErrorHandler from '../../../../helpers/error';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField
} from '@material-ui/core';
import { Spinner } from 'react-bootstrap';

const useStyles = makeStyles(() => ({
  root: {}
}));

const AccountDetails = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const userProfile = reactLocalStorage.getObject('Profile');
  const Auth = {
    userRole: userProfile
  }

  const [values, setValues] = useState({
    firstName: Auth.userRole.first_name,
    lastName: Auth.userRole.last_name,
    email: Auth.userRole.email,
    photo: Auth.userRole.photo,
    RoleName: Auth.userRole.RoleName
  });
  const [imgFile, setImageFile] = useState();

  const [errorMsg, setErrorMsg] = useState('');
  const [variant, setvariant] = useState('');
  const [show, setShow] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const showError = () => {
    setShow(false);
  }

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
    console.log(Auth.userRole.id);
  };

  const editProfile = (event) => {
    event.preventDefault();
    setisLoading(true);

    const editProfileModel = {
      id: Auth.userRole.id,
      first_name:values.firstName,
      last_name:values.lastName,
      photo: imgFile
    }

    console.log(editProfileModel);
    let endpoint = 'api/updateInterviewer';
    if(values.RoleName == 'applicant'){
      endpoint = 'api/updateApplicant';
    }
    console.log(endpoint);

    API.put(`${endpoint}/${Auth.userRole.id}`, editProfileModel)
    .then(
      res => {
        console.log(res);
        if(res.data.status == 200){
          setvariant('success');
          setErrorMsg(res.data.message);
          setShow(true);
          reactLocalStorage.setObject('Profile', editProfileModel);
          setisLoading(false);
        }
        else{
          setvariant('danger');
          setErrorMsg(res.data.message);
          setShow(true);
          setisLoading(false);
        }
        
      }
    )
    .catch(
      err => {
        setvariant('danger');
        setErrorMsg('An error occurred, Please try again!!!');
        setShow(true);
        setisLoading(false);
      }
    )
  }

  const getFiles = (files) =>{
    console.log(files);
    if(files.type == 'image/png' || files.type == 'image/jpeg' ){
      if(files.file.size < 1000000){
        console.log(files.base64);
        setImageFile(files.base64);
        setValues({
          ...values,
          photo: files.base64
        });
      }
      else{
        setvariant('danger');
        setErrorMsg('Image file cannot be greather than 1MB!')
        setShow(true);
      }
    }else{
      setvariant('danger');
      setErrorMsg('file format not supported!');
      setShow(true);
    }
    
  }

  const triggerFileInput = () => {
    const FileInput = document.querySelector("input[type=file]");
    FileInput.click();

  }

  return (
    <div>
      <ErrorHandler
        close={showError}
        message={errorMsg}
        show={show}
        variant={variant}
      />

    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <form
        autoComplete="off"
        noValidate
        onSubmit={editProfile}
      >
        <CardHeader
          subheader="The information can be edited"
          title="Profile"
        />
        <Divider />


        <div className="userAccountImgWrapper" >
            <FileBase64
              multiple={false}
              onDone={getFiles}
            />
          </div>
        
        <div className="avatar-upload">
              <div className="avatar-edit">
                  <FileBase64
                    multiple={false}
                    onDone={getFiles}
                  />
                  <label onClick={triggerFileInput} />
              </div>
              <div className="avatar-preview">
                  <div
                    id="imagePreview"
                    style={{backgroundImage: `url(${values.photo})`}}
                  />
              </div>
          </div>

        <CardContent>
          <Grid
            container
            spacing={3}
          >

            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Please specify the first name"
                label="First name"
                margin="dense"
                name="firstName"
                onChange={handleChange}
                required
                value={values.firstName}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Last name"
                margin="dense"
                name="lastName"
                onChange={handleChange}
                required
                value={values.lastName}
                variant="outlined"
              />
            </Grid>
           
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                disabled
                fullWidth
                label="Email Address"
                margin="dense"
                name="email"
                onChange={handleChange}
                required
                value={values.email}
                variant="outlined"
              />
            </Grid>
          
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            color="primary"
            disabled={isLoading}
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
            
            Save details
          </Button>
        </CardActions>
      </form>
    </Card>
    
    </div>
    
  );
};

AccountDetails.propTypes = {
  className: PropTypes.string
};

export default AccountDetails;
