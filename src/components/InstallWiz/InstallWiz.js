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
    <p align="center">
    <strong>
        Veeam Software ("Veeam")
        <br/>
        End User Software License Agreement ("EULA")
    </strong>
</p>
<p>
    <strong>
        IMPORTANT - READ CAREFULLY
        <br/>
    </strong>
    This EULA is a legally binding agreement between licensee end user (“End
    User”) and Veeam setting forth the terms and conditions governing the use
    and operation of Veeam’s proprietary computer software products (the
    “Software”) and the written technical specifications for the use and
    operation of the Software (the “Documentation”). Where the sense and
    context permit, references in this EULA to the Software include the
    Documentation. By downloading and installing, copying or otherwise using
    the Software, and/or otherwise accepting this EULA, End User agrees to be
    bound by the terms and conditions of this EULA. If End User does not agree
    to or accept the terms of this EULA, End User may not access or use the
    Software.
</p>
<p>
    <strong>
        1.0 DEFINITIONS
        <br/>
    </strong>
    1.1 <strong>“Fee(s)”</strong> means any License, Maintenance, professional
    services, consulting or other Fees agreed to by the parties as set forth in
    a Transaction Document.
    <br/>
1.2 <strong>“Maintenance”</strong> and    <strong>“Maintenance Policies”</strong> have the respective meanings set
    forth in Section 7.0.
    <br/>
1.3 <strong>“Transaction”</strong> and    <strong>“Transaction Document”</strong> have the following meanings:
    “Transaction(s)” is a License transaction pursuant to which End User: i)
    accepts this EULA as provided above and ii) takes actual or constructive
    possession of the Software. A Transaction may take place by any lawful
    means, electronically or in writing, and may be confirmed by a) purchase
    orders, credit orders, commitment letters, license keys, amendments to this
    EULA or other similar materials, signed or unsigned, (each a “Transaction
    Document(s)”), or b) by the conduct of the affected parties. A Transaction
    may be initiated and implemented by any entity that is directly or
    indirectly a party to it, including End User, Veeam, or authorized third
    party distributors, dealers, and/or other resellers of the Software. A
    Transaction Document may contain usage, business, legal and other terms and
    conditions agreed to by the parties. The foregoing notwithstanding, each
    Transaction will require that: i) this EULA be accepted by End User and ii)
    End User obtains actual or constructive possession of the Software. In the
    event of a conflict or inconsistency between the terms and conditions of
    this EULA and those set forth in a Transaction Document, the terms and
    conditions of the Transaction Document will govern and control.
</p>
<p>
    1.4 <strong>“Open Source”</strong> means various open source software
    components licensed under the terms of applicable open source license
    agreements included in the materials relating to such software. Open Source
    Software is composed of individual software components, each of which has
    its own copyright and its own applicable license conditions. A current list
    of Open Source Software used by Veeam can be found at
    <a href="http://www.veeam.com/eula-oss.html">
        http://www.veeam.com/eula-oss.html
    </a>
    .
</p>
<p>
    <strong>
        2.0 GRANT OF LICENSE
        <br/>
    </strong>
    2.1 <strong>License Grant</strong>. When the Software is delivered to End
    User as part of a Transaction, End User will have, subject to the terms and
    conditions of this EULA, a perpetual, non- transferable, non-exclusive,
    license (“License”), to use the Software in object code format, solely for
    End User's internal business purposes for the management and processing of
    its own data and not the data of any third party(ies). Veeam Software
    License is perpetual, unless the Software is delivered to End User as part
    of a Transaction on a non-perpetual basis for a defined period, in such
    case, the End User’s right to use such Software will cease on the end date
    of the defined period.<strong></strong>
</p>
<p>
    The data processing restriction set forth in the preceding paragraph will
    not apply to End User if End User a) has been accepted by Veeam, under
    “Veeam Cloud Provider Program” at
    <a href="http://www.veeam.com/veeam-cloud-providers.html">
        http://www.veeam.com/veeam-cloud-providers.html
    </a>
    and b) has accessed and is utilizing the Software with a stock-keeping unit
    number that designates End User as a “Cloud Provider” or similar
    description, thus authorizing End User to utilize the Software to perform
    systems management services for its customers.
</p>
<p>
    <strong>
        3.0 ADDITIONAL TERMS
        <br/>
    </strong>
    Nothing contained in this EULA is intended to prohibit or restrict the
    parties from mutually agreeing to enter into separate terms and conditions
    that i) modify or supplement the terms and conditions (including business
    and/or financial terms) of this EULA or the License granted to End User
    pursuant to this EULA; or ii) create or modify the terms a particular
    Transaction.
</p>
<p>
    <strong>
        4.0 EVALUATION LICENSE
        <br/>
    </strong>
    A License designated as an “Evaluation” License in a Transaction Document
    authorizes End User to use one (1) copy of the Software for a 30 day period
    for non-production evaluation or demonstration purposes only.
</p>
<p>
    <strong>
        5.0 NOT FOR RESALE LICENSE
        <br/>
    </strong>
    A License designated as a “Not for Resale” License in a Transaction
    Document authorizes End User to use one (1) copy of the Software with full
    functionality for evaluation or demonstration purposes only, and for a
    defined period of time.
</p>
<p>
    <strong>
        6.0 LIMITED TERM LICENSE
        <br/>
    </strong>
    A license designated as a “Limited Term” License in a Transaction Document
    authorizes End User to use one (1) copy of the Software in production
    environment at End User’s site for a defined period of time. The defined
    period for a “Limited Term” License commences immediately upon generation
    of the license key.
</p>
<p>
    <strong>
        7.0 MAINTENANCE
        <br/>
    </strong>
    Maintenance and support (“Maintenance”) for the Software will be available
    in accordance with Veeam’s applicable Maintenance Policies then in effect
    and shall commence on delivery of the Software. Provided End User is
    current on Maintenance, End User will receive (a) online support and (b)
    any Software updates, enhancements and/or improvements that are included or
    otherwise separately defined under the Maintenance Policies and are not
    licensed by Veeam at its discretion to its customers for a separate charge.
    Veeam’s current Maintenance Policies can be found at
    http://www.veeam.com/support.html.
</p>
<p>
    <strong>
        8.0 COPYRIGHT AND OTHER RESTRICTIONS
        <br/>
    </strong>
    The Software is protected by copyright laws and international copyright
    treaties, as well as other intellectual property laws and treaties. The
    Software is licensed, not sold. The Software contains copyrighted material,
    trade secrets and other proprietary material of Veeam. All right, title and
    interest in the Software remains at all times with Veeam. In no event will
    End User directly or indirectly permit the Software to be decompiled,
    reverse engineered, or disassembled. End User will not disclose, transfer
    or otherwise make available the Software, or the results of any benchmark
    or other tests of the Software, to any third party without the prior
    written consent of Veeam. End User shall not remove any proprietary notices
    from the Software. End User may make one copy of the Software solely for
    backup or archival purposes.
</p>
<p>
    <strong>
        9.0 AUDIT
        <br/>
    </strong>
    During the term of this Agreement and for a period of one year thereafter,
    Veeam may, during normal business hours and upon reasonable prior notice to
    End User, inspect the files, computer processors, equipment and facilities
    of End User to verify End User's compliance with this EULA.
</p>
<p>
    <strong>
        10.0 LIMITED WARRANTY AND LIMITATION OF LIABILITY
        <br/>
    </strong>
    Veeam warrants that it has the right and authority to grant the License
    under this EULA. Veeam will defend or, at its option, settle any action
    against End User based upon a claim that its use of the Software infringes
    any patent, copyright or other intellectual property right of a third
    party, and will indemnify End User against any amounts awarded against End
    User as a result of the claim, provided Veeam is promptly notified of the
    assertion of the claim and has control of its defense or settlement. Veeam
    warrants that the Software, in its unmodified form as initially delivered
    or made available to End User, will perform substantially in accordance
    with the Documentation for a warranty period of ninety (90) days from the
    date the Software is delivered to End User. In the event the Software fails
    in a material respect to operate in accordance with the Documentation
    during the warranty period and Veeam is unable to correct the defect,
    Veeam’s sole and exclusive liability and End User’s sol e and exclusive
    remedy shall be a refund of the License fee, if any, paid by End User for
    the Software. In the event a reported problem with the Software is End
    User’s fault, End User agrees to reimburse Veeam for its correction efforts
    in accordance with its then standard rates. The foregoing limited warranty
    will not apply if failure of the Software is the result of damage or misuse
    caused by End User.
</p>
<p>
    EXCEPT FOR THE LIMITED WARRANTY SET FORTH ABOVE, THE SOFTWARE IS PROVIDED
    "AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
    WITHOUT LIMITATION ANY IMPLIED WARRANTY THAT THE SOFTWARE IS FREE OF
    DEFECTS, MERCHANTABLE OR FIT FOR A PARTICULAR PURPOSE. NO ORAL OR WRITTEN
    INFORMATION OR ADVICE GIVEN BY VEEAM OR ANY THIRD PARTY, INCLUDING, WITHOUT
    LIMITATION, ANY VEEAM DISTRIBUTORS OR RESELLERS, SHALL CREATE ANY WARRANTY
    IN ADDITION TO, OR IN ANY WAY INCREASE THE SCOPE OF, THE LIMITED WARRANTY.
</p>
<p>
    In no event will Veeam, its affiliates, resellers, or distributors or
    suppliers be liable for any indirect, special, incidental or consequential
    damages arising out of the use of or inability to use the Software,
    including, without limitation, damages for lost profits, loss of goodwill,
    work stoppage, computer failure or malfunction, or any and all other
    commercial damages or losses, even if advised of the possibility thereof.
</p>
<p>
    <strong>
        11.0 ASSIGNMENT
        <br/>
    </strong>
    Except in the event of a sale or transfer by Veeam of all or substantially
    all of its assets or voting securities, neither party will assign all or
    any portion of its rights or obligations under this EULA to any third party
    without the prior written consent of the other party.
</p>
<p>
    <strong>
        12.0 U.S. GOVERNMENT END USERS
        <br/>
    </strong>
    Use, duplication, or disclosure of the Software to or by the U. S.
    Government is subject to the provisions and restrictions a s set forth in
    FAR 52.227-14 and FAR 52.227-19, or equivalent restrictions and provisions
    as set forth in DFAR 252.227-7013 and DFAR 252.227-7014.
</p>
<p>
    <strong>
        13.0 GENERAL
        <br/>
    </strong>
    This Agreement sets forth Veeam's entire obligation and End User’s
    exclusive rights with respect to the Software and, except to the extent
    otherwise specifically provided in a purchase order or other written
    communication or advertising signed or jointly issued by both parties with
    respect to the Software, supersedes any conflicting terms of any purchase
    order and any other communication or advertising with respect to the
    Software. No failure of either party to exercise or enforce any of its
    rights under this EULA will act as a waiver of those rights. If any
    provision of this EULA is found illegal or unenforceable, it will be
    enforced to the maximum extent permissible, and the legality and
    enforceability of the other provisions of this EULA will not be affected.
    This EULA will be governed by the laws of the State of Ohio, without regard
    to its choice of law principles. The United Nations Convention for the
    International Sale of Goods will not apply.
</p>
<p>
    <strong>
        14.0 EXPORT CONTROLS
        <br/>
    </strong>
    The Software is subject to U.S. Export Administration Regulations. Veeam
    prohibits any export or re-export of Veeam Software products, services, or
    technical data to any destinations subject to U.S. embargoes or trade
    sanctions, except in compliance with the United States Export
    Administration Act and the related rules and regulations and similar
    non-U.S. government restrictions, if applicable. End User agrees not to use
    or make available the Software to or on behalf of any person that is a
    citizen, national, or resident of, or that is controlled by the government
    of the countries with which the U.S. may prohibit export transactions. The
    following countries are subject to the United States embargo or restricted
    trade sanctions: Burma (Myanmar), Cuba, Iran, North Korea, the Republic of
    South Sudan, the Republic of the Sudan, Syria, or any other country with
    which the United States may prohibit export transactions.
</p>
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
