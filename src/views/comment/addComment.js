import React, { Component } from 'react';
import { Dropdown, Card } from 'react-bootstrap';
import {Avatar} from '@material-ui/core';
import API from '../../services/general';


class AddComment extends Component{

  showApplicantAlreadyInterviewed = () => {
    const url = ``;
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
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
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
