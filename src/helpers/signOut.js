import {reactLocalStorage} from 'reactjs-localstorage';

const logOut = () => {
  window.location.href = '/sign-in';
  reactLocalStorage.clear();
 }

export default logOut;
