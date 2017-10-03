/* @flow */

import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Helmet from 'react-helmet';
import _ from 'lodash';
import NavBar from '../../components/NavBar/NavBar'
import config from '../../config';
import routes from '../../routes';
// Import your global styles here
import '../../theme/normalize.css';
import styles from './styles.scss';

export default () => {
  // Use it when sub routes are added to any route it'll work
  const routeWithSubRoutes = route => (
    <Route
      key={_.uniqueId()}
      exact={route.exact || false}
      path={route.path}
      render={props => (
        // Pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes || null} />
      )}
    />
  );

  return (
    <div className={styles.App}>
      <Helmet {...config.app} />
      <NavBar />
      <Switch>
        {routes.map(route => routeWithSubRoutes(route))}
      </Switch>
    </div>
  );
};
