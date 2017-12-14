/* @flow */

import React, { Component,  PropTypes} from 'react'
import { Route, Switch,Link,NavLink,withRouter,  BrowserRouter as Router } from 'react-router-dom';
import Helmet from 'react-helmet';
import _ from 'lodash';
import NavBar from '../../components/NavBar/NavBar'
import Login from '../../containers/Login/Login'
import {ShowSetup} from '../../containers/Login/LoginAction'

import config from '../../config';
import routes from '../../routes';
// Import your global styles here
import '../../theme/normalize.css';
import styles from './styles.scss';
import Alert from '../../components/Alert/Alert'
import { connect} from 'react-redux';



class App extends Component {
  constructor(props) {
      super(props)
     
      this.routeWithSubRoutes = this.routeWithSubRoutes.bind(this);
      this.state = {
        isLogin:false
    }
}

 routeWithSubRoutes(route) {
   console.log(route.routes)
  return (
    
    <Route
      key={_.uniqueId()}
      exact={route.exact || false}
      path={route.path}
      render={props => (
        // Pass the sub-routes down to keep nesting
        <route.component   {...props} routes={route.routes || null} />
      )}
    />
  );
 } 

 login(isLogin) {
   
  // this.loginvar = localStorage.getItem('login');
  // console.log("loginprops")
  if (isLogin) {
    this.props.ShowSetup()
  }
  
   this.setState({isLogin:localStorage.getItem('AuthToken')});
   

 }

 componentDidMount() {

  
  //  this.loginvar = localStorage.getItem('login');
   // console.log(this.loginvar);
    this.setState({isLogin:localStorage.getItem('AuthToken')});
   
 }
 


 render () {
  
  console.log(this.state.isLogin);

  if(this.state.isLogin) {
   
    return (
      <div className={styles.App}>
      <Helmet {...config.app} />
      <NavBar />
      <Alert/>
      <Switch>
      {routes.map(route => this.routeWithSubRoutes(route))}
      </Switch>
      </div>
    )
  }

  if (!this.state.isLogin) {

    
    return (
      <div>
        <Alert/>
        <Login login={this.login.bind(this)}/>
      </div>
      
    )
  }

  
 }



}

const mapDispatchToProps = function(dispatch) {
  return {

    ShowSetup: () => dispatch(ShowSetup()),
  
  }
}

function mapStateToProps(state) {

  return {

   
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));


