import axios from 'axios';
import {reactLocalStorage} from 'reactjs-localstorage';
// const token = localStorage.getItem('token');
const token = reactLocalStorage.get('token');
console.log(token);

export default axios.create({
  baseURL: 'http://lim-manager.herokuapp.com/',
  headers: {'Authorization': 'Bearer '+ token}
});

/* eslint-disable */
