/* @flow */

import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

import home from '../containers/Home/reducer';
import userInfo from '../containers/UserInfo/reducer';
import Reducer from '../components/Calendar/Reducer';

export default combineReducers({
  
  router,
  Reducer,
});
