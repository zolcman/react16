/* @flow */

import { routerMiddleware } from 'react-router-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import chalk from 'chalk';
import Immutable from 'immutable';
import type { Store } from '../types';
import rootReducer from './reducers';
import {createLogger} from 'redux-logger'
import { apiMiddleware } from 'redux-api-middleware'
import { Iterable } from 'immutable';


const stateTransformer = (state) => {
  if (Iterable.isIterable(state)) return state.toJS();
  else return state;
};

const logger = createLogger({
  stateTransformer,
});


export default (history: Object, initialState: Object = {}): Store => {
  const middlewares = [
    thunk.withExtraArgument(axios),
      apiMiddleware,
    routerMiddleware(history)
  ];

  //only add redux logger in dev environment
  __DEV__ && middlewares.push(logger)

  const enhancers = [
    applyMiddleware(...middlewares),
    __DEV__ && typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ?
      window.devToolsExtension({
          serialize: {
              immutable: Immutable
          }
      }) : f => f,
  ];

    const devToolEnhancers = __DEV__ && typeof window === 'object' && typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ !== 'undefined' ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            serialize: {
                immutable: Immutable
            }
        }) : f => f;

   const immutableState  = Immutable.fromJS(initialState)
  const store: Store = createStore(rootReducer, immutableState, compose(...enhancers));



  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      try {
        const nextReducer = require('./reducers').default;

        store.replaceReducer(nextReducer);
      } catch (error) {
        console.error(chalk.red(`==> 😭  Reducer hot reloading error ${error}`));
      }
    });
  }
  return store;
};
