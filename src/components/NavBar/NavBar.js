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


    }





    render(){



        return (
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
                    <li><NavLink activeClassName="selected" to="/alert">Alert</NavLink></li>
                  </ul>
                </div>
                <div className="right-side-block gt-right">
                  ADMIN
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
