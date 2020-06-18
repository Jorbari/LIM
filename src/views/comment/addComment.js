/* eslint-disable react/no-set-state */
import React, { Component } from 'react';
import {Avatar} from '@material-ui/core';
import API from '../../services/general';
import { Card } from 'react-bootstrap';
import ErrorHandler from '../../helpers/error';


class AddComment extends Component{

  constructor(props) {
    super(props);

    this.state = {
      applicants: [],
      errorMsg: '',
      variant: '',
      showError: false,
      commentTitle: '',
      comment: '',
      applicantId: 0,
    }
  }

  showApplicantAlreadyInterviewed = () => {
    const url = ``;
  }

  componentWillMount() {
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

  addComment = (event) => {
    event.preventDefault();
    const payload = {
      title: this.state.commentTitle,
      body: this.state.comment
    }

    API.post(`api/createComment/${this.state.applicantId}`)
    .then(res => {
      console.log(res)
      if(res.data.status == 200) {
        console.log(res)
        this.setState({errorMsg: 'comment successfully added'})
        this.setState({variant: 'success'})
        this.setState({showError: true})

      }
      else{
        this.setState({errorMsg: res.data.message.body[0]})
        this.setState({variant: 'danger'})
        this.setState({showError: true})
      }
    })

    console.log(payload)
  }

  showError = () => {
    this.setState({showError: !this.state.showError})
  };

  render(){
    return(
      <div className="comment_wrapper_" >
        <ErrorHandler
          close={this.showError}
          message={this.state.errorMsg}
          show={this.state.showError}
          variant={this.state.variant}
        />
{/*         
        <div className="__spacing" >

          <div className="comment_section">
            <div className="comment_box" >
              <div>
                <h2>Enter title</h2>
              <input
                className="form-control"
                onChange={(event) => this.setState({commentTitle: event.target.value})}
                placeholder="Title..."
                value={this.state.commentTitle}
              />
              <h2>Enter your comment</h2>
              <textarea
                className="message_box"
                onChange={(event) => this.setState({comment: event.target.value})}
                placeholder="Comment..."
                value={this.state.comment}
              />
              </div>
              <div>
                <button
                  className={'btn ' + (this.state.commentTitle && this.state.comment ? 'valid' : 'invalid')}
                  disabled={!this.state.commentTitle || !this.state.comment}
                  onClick={this.addComment}
                >Add Comment</button>
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
            </select>
            
            </div>
          </div>
        </div>
         */}

         
          <form
            className="form addSectionForm"
            onSubmit={this.addComment}
          >

            <div className="form-group">
            <label htmlFor="title_">Select Applicant</label>

              <select
                className="form-control"
                onChange={(event) => this.setState({applicantId: event.target.value})}
              >
                <option selected >Select an applicant</option>
                {this.state.applicants.length > 0 && this.state.applicants.map(applicant => (
                  <option
                    key={applicant.id}
                    
                    value={applicant.id}
                  >
                    {applicant.first_name} {applicant.last_name}
                    </option>
                ))}
              </select>
            </div>

            

            <div className="form-group">
              <label htmlFor="title_">Title</label>
                <input
                  className="form-control"
                  id="title_"
                  onChange={(event) => this.setState({commentTitle: event.target.value})}
                  placeholder="Title"
                  type="text"
                />
            </div>
            
            <div className="form-group u-2">
              <label htmlFor="from_">Comment</label>
              <textarea
                className="form-control text_area"
                id="from_"
                onChange={(event) => this.setState({comment: event.target.value})}
                placeholder="Input comment"
              />
            </div>
              <button
                className={'btn ' + (this.state.commentTitle && this.state.comment ? 'validBtn' : 'inValid')}
                disabled={!this.state.commentTitle || !this.state.comment || this.state.applicantId == 0}
                type="submit"
              >Add Comment</button> 
          </form>
        



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
