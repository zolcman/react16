import React, { Component,  PropTypes} from 'react'
import styles from './styles.scss';
import { connect} from 'react-redux';
import { Link } from 'react-router-dom';
//import { LoginInServer } from './InstallPageAction';

import  InstallWiz from '../../components/InstallWiz/InstallWiz';

class InstallPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            login:"",
            password:"",
        }
        
}
    componentDidMount() {

    
    

       
    
    }
   

    componentWillReceiveProps(nextProps) {

       

     }

     componentWillUnmount() {
        
     }


     closeWiz() {
        this.setState({openWiz:false})
      }
  

    render(){


      

        return (
          <div className="install-page">
             
             <div className="pop-up-window">
                    <div className="pop-up-header">
                    <div className="gt-left pop-up-h-title">Veeam Appliance for AHV</div>
                        
                         </div>
                    <div className="body-popup gt-clear">
                        <div onClick={()=>{this.setState({openWiz:true})}} className="btns-g inst-mod">
                            <div className="line-1">Install</div>
                            <div className="line-2">Deploy a new Veeam Backup Appliance for Nutanix AHV</div>
                        </div>
                        <div className="btns-g restore-mod">
                            <div className="line-1">Restore</div>
                            <div className="line-2">Restore Veeam Backup Appliance from a previously created configuration backup</div>
                        </div>
                    </div>
            </div>
            <InstallWiz open={this.state.openWiz} close={this.closeWiz.bind(this)}/>
          </div>
        )
    }
}
const mapDispatchToProps = function(dispatch) {
    return {

     //   LoginInServer: (id) => dispatch(LoginInServer(id)),
    
    
    }
}

function mapStateToProps(state) {

//console.log(state.Reducer.emulate);
    return {
       

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(InstallPage);
