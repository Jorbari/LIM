/* eslint-disable react/no-set-state */
import React, { Component } from 'react';
import { Avatar } from '@material-ui/core';
import { reactLocalStorage } from 'reactjs-localstorage';
import API from '../../services/general';
import { Card } from 'react-bootstrap';
import Modals from '../../helpers/modal';
import ErrorHandler from '../../helpers/error';

class AddComment extends Component {

  userProfile = reactLocalStorage.getObject('Profile', { role: 'sss' });
  Auth = {
    userRole: this.userProfile.RoleName,
    id: this.userProfile.id
  };

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
      commentsHolder: [],
      showDeleteCommentModal: false,
      modalTitle: '',
      deleteCommentID: '',
    };
  }

  getCommentsSpecificInterviewerComments = () => {
    console.log(this.Auth.id)
    API.get(`api/InterviewerSeeAllComment/${this.Auth.id}`)
      .then(res => {
        if (res.data.status == 200) {
          this.setState({ commentsHolder: res.data.data });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  getAllComments = () => {
    API.get(`api/AdminSeeAllComment`)
      .then(res => {
        if (res.data.status == 200) {
          console.log(res)
          this.setState({ commentsHolder: res.data.data });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentWillMount() {
    
    if(this.Auth.userRole == 'Interviewer') {
      this.getApprovedInterview();
      this.getCommentsSpecificInterviewerComments();
    }
    else{
      this.getAllComments();
    }
    
  }

  getApprovedInterview = () => {
    API.get('api/showAllApprovedInterview')
      .then(res => {
        if (res.data.data.length > 0) {
          res.data.data.map(data => {
            data.applicant_details.map(applicant_detail => {
              const ApplicantDetails = {
                id: data.id,
                first_name: applicant_detail.first_name,
                last_name: applicant_detail.last_name
              };

              this.setState({
                applicants: [...this.state.applicants, ApplicantDetails]
              });
            });
          });
        }
      })
      .catch(() => {
        this.setState({ errorMsg: 'An error occurred, please try again!!!' });
        this.setState({ variant: 'danger' });
        this.setState({ showError: true });
      });
  };

  addComment = event => {
    const id = Number.parseInt(this.state.applicantId);
    event.preventDefault();
    const payload = {
      title: this.state.commentTitle,
      body: this.state.comment
    };

    API.post(`api/createComment/${id}`, payload).then(res => {
      if (res.data.status == 200) {
        this.getCommentsSpecificInterviewerComments();
        this.setState({commentTitle: '',comment: '', applicantId: '' });
        this.setState({ errorMsg: 'comment successfully added' });
        this.setState({ variant: 'success' });
        this.setState({ showError: true });
      } else {
        this.setState({ errorMsg: res.data.message.body[0] });
        this.setState({ variant: 'danger' });
        this.setState({ showError: true });
      }
    });
  };

  showError = () => {
    this.setState({ showError: !this.state.showError });
  };

  toggleDeleteComment = () => {
    this.setState({showDeleteCommentModal: !this.state.showDeleteCommentModal});
  }

  showDeleteModal = (id) => {
    this.setState({deleteCommentID: id});
    this.toggleDeleteComment();

  }

  deleteComment = () => {
    const id = this.state.deleteCommentID;
    
    API.delete(`api/deleteComment/${id}`, id).then(res => {
      if (res.data.status == 200) {
        this.getAllComments();
        this.toggleDeleteComment()
        this.setState({commentTitle: '',comment: '', applicantId: '' });
        this.setState({ errorMsg: 'comment successfully deleted' });
        this.setState({ variant: 'success' });
        this.setState({ showError: true });
      } else {
        this.setState({ errorMsg: res.data.message.body[0] });
        this.setState({ variant: 'danger' });
        this.setState({ showError: true });
      }
    });
  }

  render() {
    return (
      <div className="comment_wrapper_">
        <ErrorHandler
          close={this.showError}
          message={this.state.errorMsg}
          show={this.state.showError}
          variant={this.state.variant}
        />

        <form
          className="form addSectionForm"
          onSubmit={this.addComment}
          style={{
            display: this.Auth.userRole == 'Interviewer' ? 'flex' : 'none'
          }}
        >
          <div className="form-group">
            <label htmlFor="title_">Select Applicant</label>

            <select
              className="form-control"
              onChange={event =>
                this.setState({ applicantId: event.target.value })
              }
              value={this.state.applicantId}
            >
              <option defaultValue="Select an applicant">
                Select an applicant
              </option>
              {this.state.applicants.length > 0 &&
                this.state.applicants.map(applicant => (
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
              onChange={event =>
                this.setState({ commentTitle: event.target.value })
              }
              placeholder="Title"
              type="text"
              value={this.state.commentTitle}
            />
          </div>

          <div className="form-group u-2">
            <label htmlFor="from_">Comment</label>
            <textarea
              className="form-control text_area"
              id="from_"
              onChange={event => this.setState({ comment: event.target.value })}
              placeholder="Input comment"
              value={this.state.comment}
            />
          </div>
          <button
            className={
              'btn ' +
              (this.state.commentTitle && this.state.comment
                ? 'validBtn'
                : 'inValid')
            }
            disabled={
              !this.state.commentTitle ||
              !this.state.comment ||
              this.state.applicantId == 0
            }
            type="submit"
          >
            Add Comment
          </button>
        </form>

        <div className="blog_list">
          {
            this.state.commentsHolder.length == 0 && (
              <p>No comments</p>
            ) 
          }





          {
            this.state.commentsHolder.map(
              comment => (

                <Card key={comment?.id}>
                  <Card.Body className={this.Auth.userRole == 'Administrator' ?  'admin_comment_section' : ''}>
                    <div className={'user_icon_text ' + (this.Auth.userRole == 'Administrator' ?  'flex__lg' : '')}>
                      <div className="applicant_img_sec">
                        <Avatar
                          alt={comment?.title}
                          className="applicant__img"
                          src={comment?.applicant?.photo}
                        />
                      </div>
                      <div>
                        <h4> {comment?.title} 
                        {
                          this.Auth.userRole == 'Administrator' && (
                            <span className="interviewerCommentor">
                              {this.Auth.userRole == 'Administrator' && (
                                <span>
                                  From: {comment?.interviewer?.first_name}-{comment?.interviewer?.last_name}
                                </span>
                              )}
                            </span> 
                          )
                        }
                            
                        </h4>
                        <p>
                          {comment?.body}
                        </p>
                      </div>
                    </div>
                    {
                      this.Auth.userRole == 'Administrator' && (
                        <div className="remove_comment">
                          <button onClick={() => this.showDeleteModal(comment?.id)}>
                            <i className="fa fa-close"  />
                          </button>
                        </div>
                      )

                    }
                    
                  </Card.Body>
                </Card>

              )
            )
          }
          
        </div>

        <Modals
          onHide={this.toggleDeleteComment}
          show={this.state.showDeleteCommentModal}
          title="Delete Comment"
        >
        <div>
          Are you sure you want to delete this comment?
          <div className="Edit_user_" >
             <button
               className="btn btn-primary ml-auto"
               onClick={this.deleteComment}
             >Delete Comment
          </button>
          </div>
         
        </div>
      </Modals>

      </div>
    );
  }
}

export default AddComment;
