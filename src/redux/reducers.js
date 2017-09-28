/* @flow */

import { combineReducers } from 'redux-immutable';
import { routerReducer as router } from 'react-router-redux';


import WorkReducer from '../components/Calendar/Reducer';

export default combineReducers({

  router,
  WorkReducer,
});
