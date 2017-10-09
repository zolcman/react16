import React, { Component,  PropTypes} from 'react'
import styles from './styles.scss';
import { connect} from 'react-redux';
import { Route, Switch,Link,NavLink,withRouter,  BrowserRouter as Router } from 'react-router-dom';


class NavBar extends Component {
    constructor(props) {
        super(props)


        this.state = {



        }
    }

    componentDidMount() {


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
									<li><a href="#">Add Veeam Server</a></li>
									<li><a href="#">Add Nutanix Cluster</a></li>
									<li><a href="#">Manage Credentials</a></li>
									<li><a href="#">Authentication</a></li>
									<li><a href="#">Language Settings</a></li>
								</ul>
							</div>
							<div className="ic4"></div>
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



    }
}

function mapStateToProps(state) {


    return {


    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));
