/* eslint-disable react/no-set-state */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import API from '../../services/interviewer';
import { UsersToolbar, UsersTable } from './components';

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
      interviewData: []
    };
    this.loadData = this.loadData.bind(this);
    this.addedInterviewer = this.addedInterviewer.bind(this);
    this.searchInterviewer = this.searchInterviewer.bind(this);

    this.loadData();
  }

  render(){
    
    const { classes } = this.props;
    return(
      <div className={classes.root}>
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
      this.loadData();
    }
  }

  searchInterviewer(params){
    console.log(params);
    let interviewData = [];
    API.get(`api/InterviewerSearch?q=${params}`).then(res => {
      // console.log(res);
      interviewData = res.data.data[0];
      if(interviewData.length > 0){
        this.setState({interviewData: interviewData});
      }
      
    }).catch(err => console.log(err));
  }

  loadData(){
    let interviewData = [];
    API.get('api/showAllInterviewer').then(res => {
      interviewData = res.data.data;
      this.setState({interviewData: interviewData});
    }).catch(err => console.log(err));
  }
}

UserList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserList);
