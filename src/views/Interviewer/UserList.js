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
      interviewData: [],
      errorMsg: '',
      variant: '',
      showError: false
    };
    this.loadData = this.loadData.bind(this);
    this.addedInterviewer = this.addedInterviewer.bind(this);
    this.searchInterviewer = this.searchInterviewer.bind(this);

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
         searchInput={this.searchInterviewer}
         updateuser={(params) => this.addedInterviewer(params)}
       />
       <div className={classes.content}>
         <UsersTable users={this.state.interviewData} />
       </div>
     </div>
    )
  }

  addedInterviewer(user){
    console.log(user);
    if(user == true){
      this.setState({errorMsg: `interviewer added successfully!!!`});
      this.setState({variant: 'success'});
      this.setState({showError: true});
      this.loadData();
    }
    else{
      this.setState({errorMsg: `An error occurred while trying to add interviewer, please try again.`});
      this.setState({variant: 'danger'});
      this.setState({showError: true});
    }
  }

  searchInterviewer(params){
    console.log(params);
    let interviewData = [];
    API.get(`api/InterviewerSearch?q=${params}`).then(res => {
      console.log(res);
      interviewData = res.data.data[0];
      if(interviewData.length > 0){
        this.setState({interviewData: interviewData});
      }
      
    }).catch(err => {
      console.log(err);
    });
  }

  loadData(){
    let interviewData = [];
    API.get('api/showAllInterviewer').then(res => {
      console.log(res);
      interviewData = res.data.data;
      this.setState({interviewData: interviewData});
      
    }).catch(err => { 
      console.log(err);
    });
  }
}

UserList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserList);
