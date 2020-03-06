import uuid from 'uuid/v1';
import API from '../../services/interviewer';

// import {reactLocalStorage} from 'reactjs-localstorage';
//  const userProfile = reactLocalStorage.getObject('userProfile');

// let interviewData = [];
// API.get('api/showAllInterviewer').then(res => {
//   console.log(res);
//   interviewData = res.data.data;
// }).catch(err => console.log(err));


export default [
  {
    id: uuid(),
    name: 'Ekaterina Tankova',
    email: 'ekaterina.tankova@devias.io',
    phone: '304-428-3097',
    avatarUrl: '/images/avatars/avatar_3.png',
    createdAt: 1555016400000
  },
  {
    id: uuid(),
    name: 'Cao Yu',
    email: 'cao.yu@devias.io',
    avatarUrl: '/images/avatars/avatar_4.png',
    phone: '712-351-5711',
    createdAt: 1555016400000
  },
  {
    id: uuid(),
    name: 'Alexa Richardson',
    email: 'alexa.richardson@devias.io',
    phone: '770-635-2682',
    avatarUrl: '/images/avatars/avatar_2.png',
    createdAt: 1555016400000
  },
  {
    id: uuid(),
    name: 'Anje Keizer',
    email: 'anje.keizer@devias.io',
    avatarUrl: '/images/avatars/avatar_5.png',
    phone: '908-691-3242',
    createdAt: 1554930000000
  },
  {
    id: uuid(),
    name: 'Clarke Gillebert',
    email: 'clarke.gillebert@devias.io',
    phone: '972-333-4106',
    avatarUrl: '/images/avatars/avatar_6.png',
    createdAt: 1554757200000
  },
  {
    id: uuid(),
    name: 'Adam Denisov',
    email: 'adam.denisov@devias.io',
    phone: '858-602-3409',
    avatarUrl: '/images/avatars/avatar_1.png',
    createdAt: 1554670800000
  },
  {
    id: uuid(),
    name: 'Ava Gregoraci',
    email: 'ava.gregoraci@devias.io',
    avatarUrl: '/images/avatars/avatar_7.png',
    phone: '415-907-2647',
    createdAt: 1554325200000
  },
  {
    id: uuid(),
    name: 'Emilee Simchenko',
    email: 'emilee.simchenko@devias.io',
    phone: '702-661-1654',
    avatarUrl: '/images/avatars/avatar_8.png',
    createdAt: 1523048400000
  },
  {
    id: uuid(),
    name: 'Kwak Seong-Min',
    email: 'kwak.seong.min@devias.io',
    avatarUrl: '/images/avatars/avatar_9.png',
    phone: '313-812-8947'
  },
  {
    id: uuid(),
    name: 'Merrile Burgett',
    email: 'merrile.burgett@devias.io',
    phone: '801-301-7894',
    avatarUrl: '/images/avatars/avatar_10.png',
    createdAt: 1522702800000
  }
];
