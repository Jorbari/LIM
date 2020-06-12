/* eslint-disable react/no-set-state */
import React, { Component } from 'react';
import { Dropdown, Card } from 'react-bootstrap';
import {Avatar} from '@material-ui/core';
import API from '../../services/general';


class AddComment extends Component{

  constructor(props) {
    super(props);

    this.state = {
      applicants: [],
      errorMsg: '',
      variant: '',
      showError: false
    }
  }

  showApplicantAlreadyInterviewed = () => {
    const url = ``;
  }

  componentWillMount() {
    console.log('fired >>>>>>>>>>>>');
    this.getApprovedInterview();
  }

  getApprovedInterview = () => {
    API.get('api/showAllApprovedInterview').then(
      res => {

        

        if(res.data.data.length > 0) {
          res.data.data.map(data => {

            data.applicant_details.map(
              applicant_detail => {
                const ApplicantDetails = {
                  id: data.id,
                  first_name: applicant_detail.first_name,
                  last_name: applicant_detail.last_name,
                }

                console.log(ApplicantDetails)
  
                this.setState({applicants: [...this.state.applicants, ApplicantDetails]});
  
              }
            )
            
          })

        }
      
      }
    ).catch(
      () => {
        this.setState({errorMsg: 'An error occurred, please try again!!!'});
        this.setState({variant: 'danger'});
        this.setState({showError: true});
      }
    )
  }

  render(){
    return(
      <div className="comment_wrapper_" >
        <div className="__spacing" >

          <div className="comment_section">
            <div className="comment_box" >
              <div>
                <h2>Enter title</h2>
              <input
                className="form-control"
                placeholder="Title..."
              />
              <h2>Enter your comment</h2>
              <textarea
                className="message_box"
                placeholder="Comment..."
              />
              </div>
              <div>
                <button className="btn" >Add Comment</button>
              </div>
              
            </div>
            <div className="select_applicant" >
          
            <h2>Select applicant</h2>

            <select
              className="form-control"

            >
              {this.state.applicants.length > 0 && this.state.applicants.map(applicant => (
                <option key={applicant.id}>{applicant.first_name} {applicant.last_name}</option>
              ))}
              {/* <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option> */}
            </select>
            
            </div>
          </div>
        </div>
        
        <div className="blog_list" >
          
        <Card>
          <Card.Body>
            <div className="user_icon_text" >
              <div className="applicant_img_sec" >
                <Avatar
                  alt="Remy Sharp"
                  className="applicant__img"
                  src="/static/images/avatar/1.jpg"
                />
              </div>
              <div>
                <h4>Title goes here</h4>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
                  Sequi unde assumenda magni quod porro obcaecati totam adipisci autem modi perferendis.
                </p>
                
              </div>
            
            </div>
            
            </Card.Body>
        </Card>
          
        </div>

      </div>
    )
  }
}

export default AddComment;
