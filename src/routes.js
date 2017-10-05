/* @flow */


import HomePage from './containers/Home';
import UserInfoPage from './containers/UserInfo';
import NotFoundPage from './containers/NotFound';

import Dashboard from './containers/Dashboard/Dashboard';
import Backup from './containers/Backup/Backup';
import Protected from './containers/Protected/Protected';
import ProtectedDetail from './containers/Protected/ProtectedDetail';
import Alert from './containers/Alert/Alert';

export default [
  {
    exact:true,
    path: '/',
    component: Dashboard, // Add your route here

  },
  {

    path: '/dashboard',
    component: Dashboard, // Add your route here

  },

  {

    path: '/backupjobs',
    component: Backup, // Add your route here

  },

  {
    path: '/protectedvms',
    component: Protected, // Add your route here

  },

  {
    exact:true,
    path: '/vmsdetail/:id',
    component: ProtectedDetail, // Add your route here

  },

  {
    path: '/alert',
    component: Alert, // Add your route here

  },


  {
    path: '*',
    component: NotFoundPage,
  },
];
