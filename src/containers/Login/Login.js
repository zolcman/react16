import React, { Component,  PropTypes} from 'react'
import styles from './styles.scss';
import { connect} from 'react-redux';
import { Link } from 'react-router-dom';
import { LoginInServer } from './LoginAction';



class Login extends Component {
    constructor(props) {
        super(props)

        
}
    componentDidMount() {

    
       //  window.localStorage.getItem('login');
       //  this.props.login();    

    }
   

    componentWillReceiveProps(nextProps) {

        if (nextProps.loginId) {
            localStorage.setItem('login', 'red');
            this.props.login();
        }
      

     }

   login() {
        this.props.LoginInServer();
  //  localStorage.setItem('login', 'red');
   }

    render(){

      

      

        return (
          <div className="login-page">

          <a onClick={this.login.bind(this)}>Login</a>

          </div>
        )
    }
}
const mapDispatchToProps = function(dispatch) {
    return {

        LoginInServer: () => dispatch(LoginInServer()),
    
    
    }
}

function mapStateToProps(state) {

//console.log(state.Reducer.emulate);
    return {
        loginId:state.toJS().LoginReducer.loginId,

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);
