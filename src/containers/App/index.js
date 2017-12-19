/* @flow */

import React, { Component,  PropTypes} from 'react'
import { Route, Switch,Link,NavLink,withRouter,  BrowserRouter as Router } from 'react-router-dom';
import Helmet from 'react-helmet';
import _ from 'lodash';
import NavBar from '../../components/NavBar/NavBar'
import Login from '../../containers/Login/Login'
import InstallPage from '../../containers/InstallPage/InstallPage'
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
        isLogin:false,
      //  isLoginFirst:true,
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

 

 login(isFirst) {
   
  // this.loginvar = localStorage.getItem('login');
  // console.log("loginprops")
  
  //  this.props.ShowSetup()
  this.setState({isLoginFirst:isFirst})
  
  
   this.setState({isLogin:localStorage.getItem('AuthToken')});
   localStorage.setItem('isLoginFirst', isFirst);

 }

 componentDidMount() {

  
  //  this.loginvar = localStorage.getItem('login');
   // console.log(this.loginvar);
    this.setState({isLogin:localStorage.getItem('AuthToken')});

    if (localStorage.getItem('isLoginFirst') == 'false') {
      this.setState({isLoginFirst:false})
    }

    if (localStorage.getItem('isLoginFirst') == 'true') {
      this.setState({isLoginFirst:true})
    }
 //   this.setState({isLoginFirst:localStorage.getItem('isLoginFirst')})

   
 }
 


 render () {
  
 // console.log(this.state.isLoginFirst+"222");

  if(this.state.isLogin && !this.state.isLoginFirst) {
   
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

  if (this.state.isLogin && this.state.isLoginFirst) {
    console.log(this.state.isLoginFirst)
    return (
      <div>
      <InstallPage/>
      <Alert/>
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

    loginId:state.toJS().LoginReducer.loginId,
   
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));


