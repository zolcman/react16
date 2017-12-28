import React, { Component,  PropTypes} from 'react'
import { Link } from 'react-router-dom';
import { connect} from 'react-redux';
import styles from './styles.scss';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import  SettingsAddAHVCluster from '../../components/SettingsAddAHVCluster/SettingsAddAHVCluster';
import  SettingsAddVeeamServerWiz from '../../components/SettingsAddVeeamServerWiz/SettingsAddVeeamServerWiz';
import  IPut from '../../components/Iput/Iput';

import { GetBackupServers} from './SettingsAction'
import { GetDetailServer} from './SettingsAction'
import { GetDetailCluster} from './SettingsAction'
import { UpdatePassLogin} from './SettingsAction'
import { SaveFromSettingsIP } from './SettingsAction'
import { ShowAlert, HideAlert } from '../../components/Alert/AlertAction'
import { GetClusters} from './SettingsAction'
import { GetMainSettingsIP} from './SettingsAction'
import { GetVerAndName} from './SettingsAction'
class Settings extends Component {
    constructor(props) {
        super(props)

        this.state = {

          filteredItems: false,
          filterval: '',
          tabIndex: 0,
          tabts:3,
          enableDHCP:false,

    }
}
    componentDidMount() {
        this.props.GetBackupServers();
        this.props.GetClusters();
        this.props.GetMainSettingsIP();
        this.props.GetVerAndName();

        var self = this;

        var heigh =  $( document ).height();
        $('.setttings').css("min-height",heigh - 81);

        $('.setttings').click(function (e) {
            
             if(!$(e.target).is('.table-content tr td') && !$(e.target).is('.edit-btn') && !$(e.target).parents('.freeze').length > 0 && !$(e.target).is('.freeze')) {
               $('.table-content tr').removeClass("selected-green");
               self.setState({choosen:false,choosen2:false})
               console.log('eeeeee')
              }
            });


    }


    componentDidUpdate () {
      
            this.ddd = 'sss'
            $( ".table-content tbody" ).on( "click", "tr", function() {
              $('.table-content tbody tr').removeClass("selected-green");
              $(this).addClass( "selected-green" );
            });
                  

            
                  
            
                }

    

    componentWillReceiveProps(nextProps) {

      if(nextProps.listbackups) {
        this.setState({listTab1:nextProps.listbackups})
      }

      if(nextProps.cluster_list) {
        this.setState({listTab2:nextProps.cluster_list})
      }

      if (nextProps.getMainIP) {
        this.setState({hostName:nextProps.getMainIP.hostName})
        this.setState({enableDHCP:nextProps.getMainIP.enableDHCP})
        this.setState({ipAddress:nextProps.getMainIP.ipAddress})
        this.setState({subnetMask:nextProps.getMainIP.subnetMask})
        this.setState({defaultGateway:nextProps.getMainIP.defaultGateway})
        this.setState({dnsServer:nextProps.getMainIP.dnsServer})
        
      }
      if (nextProps.getVerProduct) {
        this.setState({version:nextProps.getVerProduct.version,productName:nextProps.getVerProduct.name})
      }
      
     }

     filter(e) {
       var value = e.target.value;
       this.setState({filterval: value})
       this.setState({
         filteredItems: !value
           ? false
           : this.state.table.filter(function (item) {
             return item.name.toLowerCase().indexOf(value.toLowerCase()) !== -1;
           })
       })
     }

     openWizEdit() {
       this.setState({openWiz:true,edit1:true})

       this.props.GetDetailServer(this.state.choosen);
     }

     deleteJob() {

     }

    firstTab() {

      var list = this.state.filteredItems || this.state.listTab1 || []
      return (
        <div>
        <div className="clear-wrapper gt-clear mar2020 he36">
        <div className="gt-left">
        {(list.length > 0) ? ( <a className="bk-btn gt-left add-btn fixpad disabled">Add</a>)
              :
              ( <a onClick={this.openWiz.bind(this)} className="bk-btn gt-left add-btn fixpad">Add</a>)} 
        {this.state.choosen ? (  <a onClick={this.openWizEdit.bind(this)} className="bk-btn gt-left edit-btn fixpad">Edit</a>)
             :
              (   <a className="bk-btn gt-left edit-btn fixpad disabled">Edit</a>)}
             {this.state.choosen ? (  <a onClick={this.deleteJob.bind(this)} className="bk-btn gt-left red_delete-btn fixpad disabled">Delete</a>)
             :
              (  <a className="bk-btn gt-left red_delete-btn fixpad disabled">Delete</a>)}
        </div>
        <div className="search-panel gt-right">
          <input value={this.state.filterval} onChange={this.filter.bind(this)}  className="srch-comp" placeholder="search"/>
        </div>
      </div>
      <div className="border-bottom-100"></div>
      <div className="table-wrapper">

        <div className="table-content">
          <table className="bk-table">
            <thead>
              <tr>
              
              <th>Address</th>
              <th className="width20th">Backup Repositories</th>
              <th>Status</th>
              <th>Version</th>
              <th className="width20th">Server Description</th>
              </tr>
            </thead>
            <tbody>


              {list.map((item,index) => (
                  <tr onClick={()=>{this.setState({choosen:item.Id})}} className="" key={index}>
                  
                  <td>{item.ip}:{item.port}</td>
                  <td>{item.repositoriesCount}</td>
                  <td className="width11">{item.status}</td>
                  <td>{item.version}</td>
                  <td>{item.description}</td>

                  </tr>

              ))}
            </tbody>

          </table>
        </div>
      </div>
      <SettingsAddVeeamServerWiz editable={this.state.edit1} open={this.state.openWiz} close={this.closeWiz.bind(this)}/> 
      </div>
      )
    }

    closeWiz() {
      this.setState({openWiz:false})
    }
    openWiz() {
      this.setState({openWiz:true,edit1:false})
    }





    closeWiz2() {
      this.setState({openWiz2:false})
    }
    openWiz2() {
      this.setState({openWiz2:true,edit2:false})
    }

    openWizEdit2() {
      this.setState({openWiz2:true,edit2:true})

      this.props.GetDetailCluster(this.state.choosen2);
    }

    deleteJob2() {

    }


    secondTab() {

      
      
      
            var list = this.state.filteredItems || this.state.listTab2 || []
            return (
              <div>
              <div className="clear-wrapper gt-clear mar2020 he36">
              <div className="gt-left">
             
              {(list.length > 0) ? ( <a className="bk-btn gt-left add-btn fixpad disabled">Add</a>)
              :
              ( <a onClick={this.openWiz2.bind(this)} className="bk-btn gt-left add-btn fixpad">Add</a>)} 


              {this.state.choosen2 ? (  <a onClick={this.openWizEdit2.bind(this)} className="bk-btn gt-left edit-btn fixpad">Edit</a>)
                   :
                    (   <a className="bk-btn gt-left edit-btn fixpad disabled">Edit</a>)}
                   {this.state.choosen2 ? (  <a onClick={this.deleteJob2.bind(this)} className="bk-btn gt-left red_delete-btn fixpad disabled">Delete</a>)
                   :
                    (  <a className="bk-btn gt-left red_delete-btn fixpad disabled">Delete</a>)}
              </div>
              <div className="search-panel gt-right">
                <input value={this.state.filterval} onChange={this.filter.bind(this)}  className="srch-comp" placeholder="search"/>
              </div>
            </div>
            <div className="border-bottom-100"></div>
            <div className="table-wrapper">
      
              <div className="table-content">
                <table className="bk-table">
                  <thead>
                    <tr >
                    <th className="width20th">Cluster Address</th>

                    
                    <th>Status</th>
                    <th>Version</th>
                    <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
      
      
                    {list.map((item,index) => (
                        <tr onClick={()=>{this.setState({choosen2:item.Id})}} key={index}>
                        <td> {item.ip}:{item.port} </td>                      
                        
                        <td>{item.status}</td>
                        <td>{item.version}</td>
                        <td>{item.description}</td>
                        </tr>
      
                    ))}
                  </tbody>
      
                </table>
              </div>
            </div>
            <SettingsAddAHVCluster editable={this.state.edit2} open={this.state.openWiz2} close={this.closeWiz2.bind(this)}/> 
            </div>
            )
          }

    forthTab() {
      return (
        <div className="tab4-con">
          <div className="gt-clear">
          <Tabs >
              <div className="wrapper-settings">
              <TabList className="tablist-inner">
                <div className="">
                <Tab className="inner-tabs" selectedClassName="inner-tabs__active" >Summary</Tab>
                <Tab className="inner-tabs" selectedClassName="inner-tabs__active">Network</Tab> 
                <Tab className="inner-tabs" selectedClassName="inner-tabs__active">Security</Tab> 
                <Tab className="inner-tabs" selectedClassName="inner-tabs__active">Notifications</Tab>
                </div>
              </TabList>
              </div>
              <div className="border-bottom-100"></div>
              <TabPanel>
              {this.innerTab1()}
              
              </TabPanel>
              <TabPanel>
              {this.innerTab2()}
              </TabPanel>
              <TabPanel>
              {this.innerTab3()}
              </TabPanel>
              <TabPanel>
              4
              </TabPanel>
            </Tabs>
          </div>
          
        </div>
      )
    }

    

    changeToggleSwitcher () {
      if( this.state.toggleCheck) {
      //  this.setState({toggleCheck:false})
      }
      if( !this.state.toggleCheck) {
      //  this.setState({toggleCheck:true})
      }
    }

    innerTab3() {
      return (
        <div className="wrapper-settings">
          <div className="gt-clear h55 toggle-group">
            <div className="gt-left enableSSH__label">Enable SSH Access</div>
            <div className="gt-left">
            <div className="toggle-switch">
                  <label className="switch">
                      <input type="checkbox" onChange={this.changeToggleSwitcher.bind(this)} value={this.state.toggleCheck} readOnly checked={false}/>
                      <span className="slider round"></span>
                  </label>
          </div>
            </div>
            <div className="gt-left off__label">{this.state.toggleCheck ? ("ON"):("OFF")}</div>
          </div>
          
          <div className="account-status">Administrator account</div>
          <div className="gt-clear row-label-input">
            <div className="gt-left width165px">
            Login
            </div>
            <div className="gt-left">
            <input value="admin" readOnly/>
            </div>
          </div>
          <div className="gt-clear row-label-input">
            <div className="gt-left width165px">
            Old Password
            </div>
            <div className="gt-left">
            <input value={this.state.oldpassword} onChange={(e)=> {this.setState({oldpassword:e.target.value})}} type="password"/>
            </div>
          </div>
          <div className="gt-clear row-label-input">
            <div className="gt-left width165px">
            New Password
            </div>
            <div className="gt-left">
            <input value={this.state.password} onChange={(e)=> {this.setState({password:e.target.value})}} type="password"/>
            </div>
          </div>
          <div className="gt-clear row-label-input marbtm20">
            <div className="gt-left width165px">
            Confirm New Password
            </div>
            <div className="gt-left">
            <input value={this.state.NewPassword} onChange={(e)=> {this.setState({NewPassword:e.target.value})}} type="password" />
            </div>
          </div>
          <a onClick={this.SavePassword.bind(this)} className="apply-btn btn-left-mar">Apply</a>
        </div>
      )
    }

    SavePassword() {

      if (this.state.password != this.state.NewPassword) {
        
        this.props.dispatch(ShowAlert('warning','Passwords not match!',true,false))
        return
      }
      if (this.state.password == 'admin') {
        this.props.dispatch(ShowAlert('warning','Please enter another password',true,false))
        
        return
      }
      else {
        const Obj = {
          // login:'admin',
           "@odata.type": "ChangePasswordData",
           OldPassword:this.state.oldpassword,
           NewPassword:this.state.NewPassword,
         }
         this.props.UpdatePassLogin(Obj);
      }
      
      
        
      
    }



  //  this.setState({hostName:nextProps.getMainIP.hostName})
  //  this.setState({enableDHCP:nextProps.getMainIP.enableDHCP})
  //  this.setState({ipAddress:nextProps.getMainIP.ipAddress})
  //  this.setState({subnetMask:nextProps.getMainIP.subnetMask})
  //  this.setState({defaultGateway:nextProps.getMainIP.defaultGateway})
  //  this.setState({dnsServer:nextProps.getMainIP.dnsServer})

  testadd(address) {
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(address)) {  
      return true
    } 
    else {
      return false
    }
  }

  ApplySettings() {


    let ip = this.testadd(this.state.ipAddress)
    let subnet = this.testadd(this.state.subnetMask)
    let gate;
    let dns;

    if ((this.state.dnsServer == "...") || (this.state.dnsServer == "")) {
      dns = "";
      
    }
    else {
      dns = this.testadd(this.state.dnsServer);
    }

    if ((this.state.defaultGateway == "...") || (this.state.dnsServer == "")) {
      gate = "";
      
    }
    else {
      gate = this.testadd(this.state.defaultGateway);
    }

    if (ip && subnet && gate && dns && !this.state.enableDHCP) {
      const obj = {
        "@odata.type": "NetworkSettings",
        enableDHCP:this.state.enableDHCP,
        ipAddress:this.state.ipAddress,
        subnetMask:this.state.subnetMask,
        defaultGateway:this.state.defaultGateway,
        dnsServer:this.state.dnsServer,
        hostName:this.state.hostName
        
      }
  
      this.props.dispatch(SaveFromSettingsIP(obj));
      console.log('1')
      return;
      
    }


    if ( this.state.enableDHCP) {
      const obj = {
        "@odata.type": "NetworkSettings",
        enableDHCP:this.state.enableDHCP,
        ipAddress:"",
        subnetMask:"",
        defaultGateway:"",
        dnsServer:"",
        hostName:this.state.hostName
        
      }
  
      this.props.dispatch(SaveFromSettingsIP(obj));
      console.log('2')
      return;
      
    }

    if (ip && subnet && (gate == "") && (dns == "") && !this.state.enableDHCP) {
      const obj = {
        "@odata.type": "NetworkSettings",
        enableDHCP:this.state.enableDHCP,
        ipAddress:this.state.ipAddress,
        subnetMask:this.state.subnetMask,
        defaultGateway:"",
        dnsServer:"",
        hostName:this.state.hostName
        
      }
  
      this.props.dispatch(SaveFromSettingsIP(obj));
      console.log('3')
      return;
      
    }

    if (ip && subnet && gate  && (dns == "") && !this.state.enableDHCP) {
      const obj = {
        "@odata.type": "NetworkSettings",
        enableDHCP:this.state.enableDHCP,
        ipAddress:this.state.ipAddress,
        subnetMask:this.state.subnetMask,
        defaultGateway:this.state.defaultGateway,
        dnsServer:"",
        hostName:this.state.hostName
        
      }
  
      this.props.dispatch(SaveFromSettingsIP(obj));
      console.log('4')
      return;
      
    }

    if (ip && subnet && (gate == "") && dns  && !this.state.enableDHCP) {
      const obj = {
        "@odata.type": "NetworkSettings",
        enableDHCP:this.state.enableDHCP,
        ipAddress:this.state.ipAddress,
        subnetMask:this.state.subnetMask,
        defaultGateway:"",
        dnsServer:this.state.dnsServer,
        hostName:this.state.hostName
        
      }
  
      this.props.dispatch(SaveFromSettingsIP(obj));
      console.log('5')
      return;
      
    }

    else {
      console.log(gate)
      this.props.dispatch(ShowAlert('warning','incorrect Network settings ',true,false))
    }
    
   //if (gate && dns) {
    
   //}

    

      

    


  }

    changeIp(obj) {
      
        this.setState({ipAddress:obj})
         
        }
      
        changeHostName(e) {
          
         this.setState({hostName:e.target.value})
             
         }
      
        changeSubnet(obj) {
            
         this.setState({subnetMask:obj})
               
         }
      
      changeGate(obj) {
            
          this.setState({defaultGateway:obj})
               
       }
      
       changeDns(obj){
        this.setState({dnsServer:obj})
       }

       checkBoxInnerTab2 () {
      
        if( this.state.enableDHCP) {
          this.setState({enableDHCP:false})
        }
        if( !this.state.enableDHCP) {
          this.setState({enableDHCP:true})
        }
      }

    innerTab2(){
      return (
        <div className="wrapper-settings innerTab2wrapper">
          <div className="innerTab2-checkbox">
          <label><input type="checkbox" onClick={this.checkBoxInnerTab2.bind(this)} checked={this.state.enableDHCP} name="dva"/> Obtain an IP address automatically</label>
          </div>
          {this.state.enableDHCP ? ( <div className="hideblock"></div>):(null)}
         
          <div className="gt-clear row-label-inputs">
            <div className="gt-left width165px">
            IP Address
            </div>
            <div className="gt-left ">
            <IPut defaultValue={(this.state.ipAddress) ? (this.state.ipAddress):('" "." "." "." "')}  onChange={this.changeIp.bind(this)}/>
            </div>
          </div>
          <div className="gt-clear row-label-inputs">
            <div className="gt-left width165px">
            Subnet mask
            </div>
            <div className="gt-left">
            <IPut defaultValue={(this.state.subnetMask) ? (this.state.subnetMask):('" "." "." "." "')}  onChange={this.changeSubnet.bind(this)}/>
            </div>
          </div>
          <div className="gt-clear row-label-inputs">
            <div className="gt-left width165px">
            Default gateway
            </div>
            <div className="gt-left">
            <IPut defaultValue={(this.state.defaultGateway) ? (this.state.defaultGateway):('" "." "." "." "')}  onChange={this.changeGate.bind(this)}/>
            </div>
          </div>
          <div className="gt-clear row-label-inputs marbtm20">
            <div className="gt-left width165px">
            Preffered DNS server
            </div>
            <div className="gt-left">
            <IPut defaultValue={(this.state.dnsServer) ? (this.state.dnsServer):('" "." "." "." "')}  onChange={this.changeDns.bind(this)}/>
            </div>
          </div>
          <a onClick={this.ApplySettings.bind(this)} className="apply-btn btn-left-mar">Apply</a>
        </div>
        
      )
    }

    innerTab1() {
      return (
        <div className="wrapper-settings  innerTab2wrapper">
          <div className="gt-clear he38">
        <div className="btns-group gt-right">
        <a  className="bk-btn gt-left config_backup-btn fixpad removewidth">Config Backup</a>
        <a  className="bk-btn gt-left reboot-btn fixpad removewidth">Reboot</a>
        <a  className="bk-btn gt-left shutdown-btn fixpad removewidth">Shutdown</a>
        <a  className="bk-btn gt-left bundle-btn fixpad removewidth mrrcl">Support bundle</a>
        </div>
        </div>

        <dl className="floated">
                <dt >Appliance Hostname</dt>
                <dd className="border0">{this.state.hostName}</dd>
                <dt>Product</dt>
                <dd>{this.state.productName}</dd>
                <dt>Appliance version</dt>
                <dd>{this.state.version}</dd>
                
              </dl>
        </div>
      )
    }
    tabChanged(index) {
   //   console.log(index)
      
        this.setState({tabSelected:index,choosen:false,choosen2:false})
      
    }

    render(){
      
  


        return (
          <div className="setttings">
            <div className="filters">
              <div className="filter-wrapper gt-clear">
                <div className="gt-left">
                  <div className="breadcrumbs">
                    <Link to='/'>Home</Link> / Infrastructure Settings
                  </div>
                  <div className="vm-counter gt-left">Infrastructure Settings</div>
                </div>
                

              </div>
              <div className="">
          <Tabs defaultIndex={this.props.tabt} onSelect={this.tabChanged.bind(this)}> 
        {/*   <Tabs defaultIndex={this.state.tabts}> */}
              <div className="tab-s-wrap">
              <TabList>
                <div className="tabs-settings">
                <Tab>Manage Veeam B&R Servers </Tab><div className="separator"></div>
                <Tab>Manage Nutanix Clusters</Tab> <div className="separator"></div>
              {/*  <Tab>Credentials</Tab> <div className="separator"></div> */}
                <Tab>Appliance Settings</Tab>
                </div>
              </TabList>
              </div>
              <TabPanel>
                {this.firstTab()}
              
              </TabPanel>
              <TabPanel>
              {this.secondTab()}
              </TabPanel>
          {/*     <TabPanel></TabPanel> */}
              <TabPanel>
              {this.forthTab()}
              </TabPanel>
            </Tabs>
            </div>
              
              </div>
          </div>
        )
    }
}
const mapDispatchToProps = function(dispatch) {
    return {
      dispatch:dispatch,

      GetBackupServers: () => dispatch(GetBackupServers()),
      GetDetailServer: (id) => dispatch(GetDetailServer(id)),
      GetClusters: () => dispatch(GetClusters()),
      GetDetailCluster: (id) => dispatch(GetDetailCluster(id)),
      UpdatePassLogin: (obj) => dispatch(UpdatePassLogin(obj)),
      GetMainSettingsIP: () => dispatch(GetMainSettingsIP()),
      GetVerAndName: () => dispatch(GetVerAndName()),
      
      
     // cleartask_info: () => dispatch(cleartask_info()),


    }
}

function mapStateToProps(state) {


    return {


          tabt:state.toJS().NavBarReducer.InTab,
          
          listbackups:state.toJS().SettingsReducer.listbackups,
          cluster_list:state.toJS().SettingsReducer.cluster_list,
          getMainIP:state.toJS().SettingsReducer.getMainIP,
          getVerProduct:state.toJS().SettingsReducer.getVerProduct,

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Settings);
