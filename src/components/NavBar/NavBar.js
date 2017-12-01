import React, { Component,  PropTypes} from 'react'
import styles from './styles.scss';
import { connect} from 'react-redux';
import { Route, Switch,Link,NavLink,withRouter,  BrowserRouter as Router } from 'react-router-dom';
import { changeTab } from './NavBarAction';

import {LogOutFromServer} from '../../containers/Login/LoginAction'
import {MyName} from '../../containers/Login/LoginAction'

class NavBar extends Component {
    constructor(props) {
        super(props)


        this.state = {



        }
    }

    componentDidMount() {

      this.props.MyName();

		$( document ).ready(function() {
			$("body").children().find(".ulic3").hide();
          $(document).click(function (e) {

			  var ic3 = e.target;
			  var clname = e.target.className;
			  if (clname == "ic3" ){
			  $(ic3).children().toggle();
			  } else {
			  $("body").children().find(".ulic3").hide();
			  }



        });
		});




    }



changeTab(tab) {
  console.log(tab)
  this.props.changeTab(tab);
}

unLogin() {
  console.log('click')
 //localStorage.removeItem('AuthToken');
 // window.location.replace('./');

this.props.LogOutFromServer()

}

    render(){

        return (
          <div className="gradient">
            <div className="gt-clear navbar">
              <div className="logo-wrap gt-left">
                <div className="logo"></div>
              </div>
              <div className="gt-left menu-block">
                <div className="left-side-block gt-left">
                  <ul className="left-side-menu">
                    <li><NavLink exact activeClassName="selected" to="/">Dashboard</NavLink></li>
                    <li><NavLink activeClassName="selected" to="/backupjobs">Backup Jobs</NavLink></li>
                    <li><NavLink activeClassName="selected" to="/protectedvms">Protected VM's</NavLink></li>
                    <li><NavLink activeClassName="selected" to="/alert">Events</NavLink></li>   
                    
                    
                  </ul>
                </div>
                <div className="right-side-block gt-left">


						<div className="topmenuright">
							<div className="ic1"></div>
							<div className="ic2"></div>
							<div className="ic3">
								<ul className="ulic3">
									<li onClick={this.changeTab.bind(this,0)}><Link  to="/settings" >Manage Veeam Servers</Link></li>
									<li onClick={this.changeTab.bind(this,1)} ><Link to="/settings"  >Manage Nutanix Clusters</Link></li>
									<li onClick={this.changeTab.bind(this,2)}> <Link  to={`/settings`} >Credentials</Link></li>
                  <li onClick={this.changeTab.bind(this,3)}> <Link  to={`/settings`} >Appliance Settings</Link></li>
									<li><Link to={`/swagger/`} target="_blank">REST API</Link></li>
			
                  

								</ul>
							</div>
							<div onClick={this.unLogin.bind(this)} className="ic4"></div>
						</div>

                </div>

              </div>
            </div>
            </div>
        )
    }
}
const mapDispatchToProps = function(dispatch) {

    return {
      changeTab: (tab) => dispatch(changeTab(tab)),
      LogOutFromServer: () => dispatch(LogOutFromServer()),
      MyName: () => dispatch(MyName()),
      

    }
}

function mapStateToProps(state) {


    return {


    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));
