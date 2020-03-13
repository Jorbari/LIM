import React, {Component} from 'react';
import { Toast } from 'react-bootstrap';


class Snippet extends Component {

  constructor(props){
    super(props);

    this.state = {
      showSnippet: true,
    }
    this.toggleView = this.toggleView.bind(this);
    // this.handleClose = this.handleClose.bind(this);
    // this.declineInterviewRequest = this.declineInterviewRequest(this);
  }
  toggleView = ()=>{
    this.setState({showSnippet: !this.state.showSnippet});
  }

  render(){
    return (
      <div>


        <div className="mb-3" >
       
       <Toast
         onClose={this.toggleView}
         show={this.state.showSnippet}
         style={{display: this.state.showSnippet ? "inherit" : "none"}}
       >
        <Toast.Header>
          <img
            alt=""
            className="rounded mr-2"
            src="holder.js/20x20?text=%20"
          />
          <strong className="mr-auto"> {this.props.firstName.slice(0.4)} {this.props.lastName.slice(0,3)}... </strong>
        </Toast.Header>
        <Toast.Body>
          <div className="booked_schedule">
              Applicant above requested an interview with you.
          </div>
          
          <div className="interview_decline_accept" >
          <div>
              <button
                className="btn btn-success"
                onClick={this.props.confirm}
              >Confirm</button>
            </div>
            <div> 
              <button
                className="btn btn-outline"
                name="show"
                onClick={this.props.decline}
              >Decline</button>
            </div>
          </div>
        </Toast.Body>
      </Toast>
  
      </div>
  

      

   


      </div>
   
   )

  }
}


export default Snippet;
