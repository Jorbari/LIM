/* eslint-disable react/self-closing-comp */
import React, { Component } from 'react';
import {reactLocalStorage} from 'reactjs-localstorage';


  class Logout extends Component{

    constructor(props){
      super(props);
      
      // To check if the user is logged in so as
      // to prevent them from accessing this page if they are
      const token = reactLocalStorage.get('token', '');

      if(!token){
        window.location.href = '/sign-in';
      }
      
      reactLocalStorage.clear();
      window.location.href = '/sign-in';
    }

    render(){
      return(
          
          <div className="logout_" >
            <div>
               <div className="spinner-border text-light"></div>
                <h2 className="loading">Logging out</h2> 
            </div>
           
          </div>
          
      )
    }
  }

  export default Logout;


// <div className="logout_" >
          {/* Logging out... */}
