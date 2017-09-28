/* @flow */


import HomePage from './containers/Home';
import UserInfoPage from './containers/UserInfo';
import NotFoundPage from './containers/NotFound';
export default [
  {
    path: '/',
    component: HomePage, // Add your route here

  },



  {
    path: '*',
    component: NotFoundPage,
  },
];
