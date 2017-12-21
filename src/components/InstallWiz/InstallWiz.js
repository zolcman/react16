import React, { Component,  PropTypes} from 'react'
import styles from './styles.scss';
import { connect} from 'react-redux';
import { Route, Switch,Link,NavLink,withRouter,  BrowserRouter as Router } from 'react-router-dom';
import Select from 'react-select';
import axios from 'axios'
import { UpdatePassLogin} from '../../containers/Settings/SettingsAction'
import { Install } from '../../containers/Settings/SettingsAction'
import IPut from '../Iput/Iput';
import { ShowAlert, HideAlert } from '../Alert/AlertAction'


class InstallWiz extends Component {
    constructor(props) {
        super(props)

        this.ip = '',
  
        this.state = {

          page:'1',
          blockNext:true,
          blockOnFirst:true,
          blockOnSecond:true,
          blockOnThird:true,
          oldpassword:'admin',
          hostName:"",
          subnet:'',
          gate:'',
          ip:'',
          dns:'',
          ipd:false,
          sudnetd:false,
          dnsd:false,
          gated:false,
          checked6:false,
          
          
        }
    }


    

    componentDidMount() {

     
    // var selector = document.getElementById("ipv4");
    // Inputmask("ip").mask(selector);
  
    
    }
    

    componentWillReceiveProps(nextProps) {

      if (nextProps.page) {
        this.setState({page:3},

          )
        
    }

     }

   


    pagechange() {
      if (this.state.page == 1) {

        
        this.setState({page:2,blockNext:true})
        
      }
      if (this.state.page == 2) {
        this.changePassword();
      }
      if (this.state.page == 3) {
       // this.setState({page:4})
       this.testip();
      }
     

    }

    pagechangeB() {
      
      if (this.state.page == 4) {
        this.setState({page:3})
      }
      if (this.state.page == 3) {
        this.setState({page:2})
      }
      if (this.state.page == 2) {
        this.setState({page:1,blockNext:false})
      }

    }



    check5 () {
      if( this.state.checked5) {
        this.setState({checked5:false,blockNext:true,blockOnFirst:true})
      }
      if( !this.state.checked5) {
        this.setState({checked5:true,blockNext:false,blockOnFirst:false})
      }
    }
  

	window1(){
	return(
	<div>
    <div className="zagname">End User License Agreement</div>
    <div className="subzagname">
      Please read and accept  the following license agreement
    </div>
    <div className="lin-con">

    </div>
    <div><label><input type="checkbox" onChange={this.check5.bind(this)} checked={this.state.checked5} name="dva"/> I accept the terms of liciense agreement</label></div>
	</div>
	)
	}

  changePassword() {

    if (this.state.NewPassword == 'admin') {
      alert('Please enter another new password')
      this.setState({blockNext:true,blockOnSecond:true})
     return
    }

    if (this.state.password !== this.state.NewPassword) {
      alert('Passwords not match!');
      this.setState({blockNext:true,blockOnSecond:true})
      return
    }
    if (this.state.password == this.state.NewPassword) {
     
      const Obj = {
        // login:'admin',
         "@odata.type": "ChangePasswordData",
         OldPassword:this.state.oldpassword,
         NewPassword:this.state.NewPassword,
       }
       this.props.UpdatePassLogin(Obj);
     // this.setState({page:3})
    }
  }


	window2(){
   
  
	return(
	<div>
  <div className="zagname">Credentials</div>
    <div className="subzagname">
     Specify the credentials for the Veeam Backup Applicance web console.
    </div>
    <div className="jis-1">
<div className="gt-clear row-label-input ">
            <div className="gt-left width165px">
            Login:
            </div>
            <div className="gt-left">
            <input value="admin" readOnly/>
            </div>
          </div>
          <div className="gt-clear row-label-input">
            <div className="gt-left width165px">
            Old Password:
            </div>
            <div className="gt-left">
            <input value={this.state.oldpassword} onChange={(e)=> {this.setState({oldpassword:e.target.value})}} type="password"/>
           
            </div>
          </div>

          <div className="gt-clear row-label-input">
            <div className="gt-left width165px">
            New Password:
            </div>
            <div className="gt-left">
            <input value={this.state.password} onChange={(e)=> {this.setState({password:e.target.value,blockNext:false,blockOnSecond:false})}} type="password"/>
            </div>
          </div>
          <div className="gt-clear row-label-input marbtm20">
            <div className="gt-left width165px">
            Confirm New Password:
            </div>
            <div className="gt-left">
            <input value={this.state.NewPassword} onChange={(e)=> {this.setState({NewPassword:e.target.value,blockNext:false,blockOnSecond:false})}} type="password" />
            </div>
          </div>
          </div>

	</div>
	)

	}



  check6 () {
    if( this.state.checked6) {
      this.setState({checked6:false})
    }
    if( !this.state.checked6) {
      this.setState({checked6:true})
    }
  }


  componentDidUpdate() {
  
  }

  testadd(address) {
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(address)) {  
      return true
    } 
    else {
      return false
    }
  }

  testip () {
    let ip = this.testadd(this.state.ip)
    let subnet = this.testadd(this.state.subnet)
    let gate;
    let dns;

    if (this.state.gate && this.state.gate !== '...') {
      gate = this.testadd(this.state.gate)      
    }
    else {
      gate = true
    }

    if (this.state.dns && this.state.dns !== '...') {
      dns = this.testadd(this.state.dns)   
    }
    else {
      dns = true
    }

    console.log(this.state.gate)

      

    if (ip && subnet && gate && dns && (this.state.hostName != '') && !this.state.checked6) {
      this.setState({page:4})
      this.setState({ipd:this.state.ip,sudnetd:this.state.subnet,dnsd:this.state.dns,gated:this.state.gate})

     
      return
    }
    if ((this.state.hostName != '') && this.state.checked6) {
      this.setState({page:4})
      this.setState({ipd:this.state.ip,sudnetd:this.state.subnet,dnsd:this.state.dns,gated:this.state.gate})
      return;
    }
    else {
      this.props.dispatch(ShowAlert('warning','incorrect Network settings ',true,false))
    }

  }

  changeIp(obj) {

   this.setState({ip:obj})
   
  }

  changeHostName(e) {
    
   this.setState({hostName:e.target.value,blockNext:false})
       
   }

  changeSubnet(obj) {
      
   this.setState({subnet:obj})
         
   }

changeGate(obj) {
      
    this.setState({gate:obj})
         
 }

 changeDns(obj){
  this.setState({dns:obj})
 }
  
	window3(){
    console.log(this.state.dns.length)
		return(
	<div>
      <div className="zagname">Network settings</div>
    <div className="subzagname">
     Specify the network for settings for the Veeam Backup Applicance.
    </div>
    
    <div className="jis-4">
<div className="gt-clear row-label-input ">
            <div className="gt-left width177px">
            Applicance host name:
            </div>
            <div className="gt-left">
            <input value={this.state.hostName} onChange={this.changeHostName.bind(this)}/>
            </div>
          </div>
          <div className="jis-3"><label><input type="checkbox" onChange={this.check6.bind(this)} checked={this.state.checked6} name="dva"/> Obtain an IP address automatically</label></div>
          {(this.state.checked6)? (<div className="blocksettings"></div>):(null)}
          <div className="gt-clear row-label-inputs">
            <div className="gt-left width177px">
            Ip address:
            </div>
            <div className="gt-left">
            <IPut defaultValue={(this.state.ipd) ? (this.state.ipd):('" "." "." "." "')}  onChange={this.changeIp.bind(this)}/>
            
            </div>
          </div>

          <div className="gt-clear row-label-inputs">
            <div className="gt-left width177px">
            Subnet mask:
            </div>
            <div className="gt-left">
            <IPut defaultValue={(this.state.sudnetd) ? (this.state.sudnetd):('" "." "." "." "')}  onChange={this.changeSubnet.bind(this)}/>
            </div>
          </div>
          <div className="gt-clear row-label-inputs marbtm20">
            <div className="gt-left width177px">
            Default gateway:
            </div>
            <div className="gt-left">
            <IPut defaultValue={(this.state.gated) ? (this.state.gated):('" "." "." "." "')}  onChange={this.changeGate.bind(this)}/>
            </div>
          </div>

          <div className="gt-clear row-label-inputs marbtm20">
            <div className="gt-left width177px">
            Preffered DNS server:
            </div>
            <div className="gt-left">
            <IPut defaultValue={(this.state.dnsd) ? (this.state.dnsd):('" "." "." "." "')}  onChange={this.changeDns.bind(this)}/>
            </div>
          </div>
          </div>
	

	</div>
	)
	}



	window4(){

		return(
		<div>
      <div className="zagname">Summary</div>
    <div className="subzagname">
     Please review the Applicance settings before continuing.<br/>
     Specified settings will be applied immidiately after completing  this wizard
    </div>
    <div className="sep-1"></div>
    
    <dl className="floated">
  <dt>Hostname:</dt>
  <dd>{this.state.hostName}</dd>
  <dt>IP settings</dt>
  <dd>IPv4, {this.state.checked6 ? ('DHCP'):('Static')}</dd>
  {this.state.checked6 ? (<div>

    <dt>IP address:</dt>
    <dd>auto</dd>
  <dt>Subnet mask</dt>
  <dd>auto</dd>
  <dt>Default gateway</dt>
  <dd>auto</dd>
  <dt>DNS server</dt>
  <dd>auto</dd>

  </div>):(
    <div>
    
        <dt>IP address:</dt>
        <dd>{(this.state.ip.length > 3 )?(this.state.ip):('auto')}</dd>
      <dt>Subnet mask</dt>
      <dd>{(this.state.subnet.length > 3 )?(this.state.subnet):('auto')}</dd>
      <dt>Default gateway</dt>
      <dd>{(this.state.gate.length > 3 )?(this.state.gate):('auto')}</dd>
      <dt>DNS server</dt>
      <dd>{(this.state.dns.length > 3)?(this.state.dns):('auto')}</dd>
    
      </div>
  )}
  
</dl>

	    </div>
			)
  }

  add () {


    if (!this.state.checked6) {
      const obj = {
        "@odata.type": "NetworkSettings",
        enableDHCP:this.state.checked6,
        ipAddress:this.state.ip,
        subnetMask:this.state.subnet,
        defaultGateway:(this.state.gate == '...') ? (''):(this.state.gate),
        dnsServer:(this.state.dns == '...') ? (''):(this.state.dns),
        hostName:this.state.hostName
        
      }
  
      this.props.dispatch(Install(obj));
    }

    if (this.state.checked6) {
      const obj = {
        "@odata.type": "NetworkSettings",
        enableDHCP:this.state.checked6,
        ipAddress:"",
        subnetMask:"",
        defaultGateway:"",
        dnsServer:"",
        hostName:this.state.hostName
        
      }
  
      this.props.dispatch(Install(obj));
    }


    
    
    
 
  }




    renderPage () {
      if (this.state.page == 1) {
        return (<div className="wizzard1">{this.window1()}</div>)
      }
      if (this.state.page == 2) {
        return (<div className="wizzard1">{this.window2()}</div>)
      }
      if (this.state.page == 3) {
        return (<div className="wizzard1">{this.window3()}</div>)
      }
      if (this.state.page == 4) {
        return (<div className="wizzard1 stage4">{this.window4()}</div>)
      }
      
    }


    switch (param) {
      if (param > this.state.page && this.state.blockNext) {
        return
      }
      if (param == 1 && this.state.blockOnFirst) {
        this.setState({blockNext:true})
        this.setState({page:param})
        return
      }
      if (param == 1 && !this.state.blockOnFirst) {
        this.setState({blockNext:false})
        this.setState({page:param})
        return
      }
      if (param == 2 && this.state.blockOnSecond) {
        this.setState({blockNext:true})
        this.setState({page:param})
        return
      }
      if (param == 2 && !this.state.blockOnSecond) {
        this.setState({blockNext:false})
        this.setState({page:param})
        return
      }

      if (param == 3 && !this.state.blockOnSecond  ) {

        if (this.state.page !== 4) {
          this.changePassword();
          return
        }
        if (this.state.page == 4) {
          this.setState({page:3})
          return
        }
        
       // return;
      }

      if (param == 3 && this.state.blockOnSecond) {
        return;
      }

      if (param == 4 && !this.state.blockOnSecond && !this.state.blockOnFirst) {
        this.testip()
        return;
      }

      if  ( param == 4 && this.state.blockOnSecond) {
        return
      }
      else {
        this.setState({page:param})
      }

      

        
      }
      
      
    

    renderBubbles() {
      return (
        <div className="width40px gt-left">
          <a onClick={this.switch.bind(this,1)} className={this.state.page == 1 || this.state.page == 2 || this.state.page == 3 || this.state.page == 4 || this.state.page == 5  ? ('bubble bubblegreen') :('bubble')}>1</a>
          <div className={ this.state.page == 2 || this.state.page == 3 || this.state.page == 4 || this.state.page == 5 ? ('line-x bubblegreen') :('line-x')}></div>

          <a onClick={this.switch.bind(this,2)} className={this.state.page == 2 || this.state.page == 3 || this.state.page == 4 || this.state.page == 5 ? ('bubble bubblegreen') :('bubble')}>2</a>
          <div className={ this.state.page == 3 || this.state.page == 4 || this.state.page == 5 ? ('line-x bubblegreen') :('line-x')}></div>

          <a onClick={this.switch.bind(this,3)} className={this.state.page == 3 || this.state.page == 4 || this.state.page == 5 ? ('bubble bubblegreen') :('bubble')}>3</a>
          <div className={ this.state.page == 4 || this.state.page == 5 ? ('line-x bubblegreen') :('line-x')}></div>

          <a onClick={this.switch.bind(this,4)} className={this.state.page == 4 || this.state.page == 5 ? ('bubble bubblegreen') :('bubble')}>4</a>
          <div className={ this.state.page == 5 ?  ('line-x bubblegreen') :('line-x')}></div>

          

        </div>
      )
    }
    renderbublenames() {
      return (
        <div className="titles-settings gt-left">

          <div className={this.state.page == 1 || this.state.page == 2 || this.state.page == 3 || this.state.page == 4 || this.state.page == 5 ? (' ') :('greyfixer34')}>End User <br/>License <br/> Agreement </div>
          <div className={ this.state.page == 2 || this.state.page == 3 || this.state.page == 4 || this.state.page == 5 ? ('mar60px') :('mar60px greyfixer34')}> Credentials</div>
          <div className={  this.state.page == 3 || this.state.page == 4 || this.state.page == 5 ? ('mar78px') :('mar78px greyfixer34')} >Network <br/> Settings</div>
          <div className={ this.state.page == 4 || this.state.page == 5 ? ('mar78px') :('mar78px greyfixer34')} >Summary</div>
         
        </div>
      )
    }

    

   


    resetData() {
      this.setState({page:1})
     
    }

    
   

    close() {

      this.props.close();
      this.resetData();

    }
  




    render(){

        console.log(this.state.ip)

        return (
          <div className="inst-wiz-inner">
            {this.props.open ?
              (
                <div className="freeze">
                  <div className="pop-up-window">
                    <div className="pop-up-header">
                      <div className="gt-left pop-up-h-title">Veeam  Applicance for AHV:installation</div>
                      <div className="gt-right"><a className="close-pop" onClick={this.close.bind(this)}></a></div>

                    </div>
                    <div className="body-popup gt-clear">
                    <div className="pagination-buble gt-left">
                      {this.renderBubbles()}
                      {this.renderbublenames()}

                    </div>
                    <div className="view-change gt-left">
                      {this.renderPage()}
                    </div>
                    </div>
                    <div className="btns-go-back gt-clear">
                       {this.state.page == 4 ?
                        (
                        <a onClick={this.add.bind(this)} className="go-btn gt-right go-btn-global">Finish</a>) 
                       :
                        (
                          (this.state.blockNext) ? (<a className="go-btn gt-right go-btn-global disabled">Next</a>)
                           :
                            (<a onClick={this.pagechange.bind(this)} className="go-btn gt-right go-btn-global">Next</a>)
                        

                      )
                        }


                      {this.state.page == 1 ? (null) : (<a onClick={this.pagechangeB.bind(this)} className="back-btn gt-right go-btn-global">Previous</a>)}


                    </div>
                  </div>
                </div>

              ):
              (null)}
              
              </div>

        )
    }
}
const mapDispatchToProps = function(dispatch) {

    return {
      dispatch:dispatch,
      UpdatePassLogin: (obj) => dispatch(UpdatePassLogin(obj)),
        

    }
}

function mapStateToProps(state) {


    return {

      page:state.toJS().SettingsReducer.gopage,

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(InstallWiz);
