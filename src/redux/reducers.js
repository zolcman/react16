/* @flow */

import { combineReducers } from 'redux-immutable';
import { routerReducer as router } from 'react-router-redux';
import ProtectedReducer from '../containers/Protected/ProtectedReducer'
import LoginReducer from '../containers/Login/LoginReducer'
import BackupReducer from '../containers/Backup/BackupReducer'
import SettingsReducer from '../containers/Settings/SettingsReducer'
import NavBarReducer from '../components/NavBar/NavBarReducer'
import AlertReducer from '../components/Alert/AlertReducer'
//import WorkReducer from '../components/Calendar/Reducer';
import { loadingBarReducer } from 'react-redux-loading-bar'
export default combineReducers({

  router,
  ProtectedReducer,
  BackupReducer,
  SettingsReducer,
  NavBarReducer,
  LoginReducer,
  AlertReducer,
  loadingBar: loadingBarReducer,
//  WorkReducer,
});
