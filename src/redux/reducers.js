/* @flow */

import { combineReducers } from 'redux-immutable';
import { routerReducer as router } from 'react-router-redux';
import ProtectedReducer from '../containers/Protected/ProtectedReducer'
import BackupReducer from '../containers/Backup/BackupReducer'
//import WorkReducer from '../components/Calendar/Reducer';

export default combineReducers({

  router,
  ProtectedReducer,
  BackupReducer,
//  WorkReducer,
});
