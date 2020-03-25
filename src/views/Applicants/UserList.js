/* eslint-disable react/no-set-state */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import API from '../../services/general';
import { UsersToolbar, UsersTable } from './components';
import ErrorHandler from '../../helpers/error';

const styles = theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
});

class UserList extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      applicants: [],
      errorMsg: '',
      variant: '',
      showError: false
    };
    this.loadData = this.loadData.bind(this);
    this.addedInterviewer = this.addedInterviewer.bind(this);
    this.searchApplicant = this.searchApplicant.bind(this);
    this.loadData();
  }

  showError = () => {
    this.setState({showError: false});
  }

  render(){
    
    const { classes } = this.props;
    return(
      <div className={classes.root}>
        <ErrorHandler
          close={this.showError}
          message={this.state.errorMsg}
          show={this.state.showError}
          variant={this.state.variant}
        />
       <UsersToolbar
         searchInput={this.searchApplicant}
         updateuser={this.addedInterviewer}
       />
       <div className={classes.content}>
         <UsersTable users={this.state.applicants} />
       </div>
     </div>
    )
  }

  addedInterviewer(user){
    console.log(user);
    if(user == true){
      this.setState({errorMsg: `Applicant added successfully!!!`});
      this.setState({variant: 'success'});
      this.setState({showError: true});
      this.loadData();
    }
    else{
      this.setState({errorMsg: `An error occurred while trying to add applicant, please try again.`});
      this.setState({variant: 'danger'});
      this.setState({showError: true});
    }
  }

  
  searchApplicant(params){
    console.log(params);
    let applicants = [];
    API.get(`api/ApplicantSearch?q=${params}`).then(res => {
      console.log(res);
      applicants = res.data.data[0];
      if(applicants.length > 0){
        this.setState({applicants: applicants});
      }
      
    }).catch(err => console.log(err));
  }

  loadData(){
    let applicants = [];
    API.get('api/showAllApplicant').then(res => {
      console.log(res);
      applicants = res.data.data;
      this.setState({applicants: applicants});
    }).catch(err => console.log(err));
  }
}

UserList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserList);
