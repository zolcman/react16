import React, { Component,  PropTypes} from 'react'
import styles from './styles.scss';
import { connect} from 'react-redux';
import { Route, Switch,Link,  BrowserRouter as Router } from 'react-router-dom';


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
            <div className="gt-clear">
              <div className="logo-wrap gt-left"></div>
              <div className="gt-left menu-block">
                <ul>
                  <li><Link to="/dashboard">Dashboard</Link></li>
                  <li><Link to="/backupjobs">Backup Jobs</Link></li>
                  <li><Link to="/protectedvms">Protected VM's</Link></li>
                  <li><Link to="/alert">Alert</Link></li>
                </ul>
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
export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
