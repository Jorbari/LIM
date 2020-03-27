import React, { Component } from 'react';
import { Dropdown, Card } from 'react-bootstrap';
import {Avatar} from '@material-ui/core'


class AddComment extends Component{
  render(){
    return(
      <div className="comment_wrapper_" >
        <div className="__spacing" >

          <div className="comment_section">
          <div className="comment_box" >
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
          <div className="select_applicant" >
         
          <h2>Select applicant</h2>
          
          <Dropdown>
            <Dropdown.Toggle
              id="dropdown-basic"
              variant="success"
            >
              List of applicant
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>


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
