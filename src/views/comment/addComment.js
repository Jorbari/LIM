/* eslint-disable react/no-set-state */
import React, { Component } from 'react';
import { Avatar } from '@material-ui/core';
import API from '../../services/general';
import { Card } from 'react-bootstrap';
import ErrorHandler from '../../helpers/error';

class AddComment extends Component {
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
      commentsHolder: []
    };
  }

  getComments = () => {
    API.get(`api/InterviewerSeeAllComment/2`)
      .then(res => {
        if (res.data.status == 200) {
          this.setState({ commentsHolder: res.data.data });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentWillMount() {
    this.getApprovedInterview();
    this.getComments();
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
        this.getComments();
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
        >
          <div className="form-group">
            <label htmlFor="title_">Select Applicant</label>

            <select
              className="form-control"
              onChange={event =>
                this.setState({ applicantId: event.target.value })
              }
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
            />
          </div>

          <div className="form-group u-2">
            <label htmlFor="from_">Comment</label>
            <textarea
              className="form-control text_area"
              id="from_"
              onChange={event => this.setState({ comment: event.target.value })}
              placeholder="Input comment"
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
                  <Card.Body>
                    <div className="user_icon_text">
                      <div className="applicant_img_sec">
                        <Avatar
                          alt={comment?.title}
                          className="applicant__img"
                          src={comment?.applicant?.photo}
                        />
                      </div>
                      <div>
                        <h4> {comment?.title} </h4>
                        <p>
                          {comment?.body}
                        </p>
                      </div>
                    </div>
                  </Card.Body>
                </Card>

              )
            )
          }
          
        </div>
      </div>
    );
  }
}

export default AddComment;
