import React, { Component,  PropTypes} from 'react'
import { Link } from 'react-router-dom';
import { connect} from 'react-redux';
import styles from './styles.scss';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import  SettingsAddAHVCluster from '../../components/SettingsAddAHVCluster/SettingsAddAHVCluster';
import  SettingsAddVeeamServerWiz from '../../components/SettingsAddVeeamServerWiz/SettingsAddVeeamServerWiz';

import { GetBackupServers} from './SettingsAction'
import { GetDetailServer} from './SettingsAction'
import { GetDetailCluster} from './SettingsAction'

import { GetClusters} from './SettingsAction'


class Settings extends Component {
    constructor(props) {
        super(props)

        this.state = {

          filteredItems: false,
          filterval: '',
          tabIndex: 0,
          tabts:3,

    }
}
    componentDidMount() {
        this.props.GetBackupServers();
        this.props.GetClusters();

        
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
        <a onClick={this.openWiz.bind(this)}  className="bk-btn gt-left add-btn fixpad">Add</a>
        {this.state.choosen ? (  <a onClick={this.openWizEdit.bind(this)} className="bk-btn gt-left edit-btn fixpad">Edit</a>)
             :
              (   <a className="bk-btn gt-left edit-btn fixpad disabled">Edit</a>)}
             {this.state.choosen ? (  <a onClick={this.deleteJob.bind(this)} className="bk-btn gt-left red_delete-btn fixpad">Delete</a>)
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
              <th>Name</th>
              <th>IP Address</th>
              <th className="width20th">Backup Repositories</th>
              <th>Status</th>
              <th>Version</th>
              <th className="width20th">Server Description</th>
              </tr>
            </thead>
            <tbody>


              {list.map((item,index) => (
                  <tr onClick={()=>{this.setState({choosen:item.Id})}} className="" key={index}>
                  <td>
                      {item.name}
                </td>
                  <td>{item.ip}</td>
                  <td>{item.backups}</td>
                  <td className="width11">{item.ip}</td>
                  <td>{item.clusterName}</td>
                  <td>{item.lastProtection}</td>

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
              <a onClick={this.openWiz2.bind(this)} className="bk-btn gt-left add-btn fixpad">Add</a>
              {this.state.choosen2 ? (  <a onClick={this.openWizEdit2.bind(this)} className="bk-btn gt-left edit-btn fixpad">Edit</a>)
                   :
                    (   <a className="bk-btn gt-left edit-btn fixpad disabled">Edit</a>)}
                   {this.state.choosen2 ? (  <a onClick={this.deleteJob2.bind(this)} className="bk-btn gt-left red_delete-btn fixpad">Delete</a>)
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
                    <th className="width20th">Name</th>
                    <th>Protection Domains</th>
                    <th >Cluster IP</th>
                    <th>Protected VMs</th>
                    <th>Status</th>
                    
                    </tr>
                  </thead>
                  <tbody>
      
      
                    {list.map((item,index) => (
                        <tr onClick={()=>{this.setState({choosen2:item.Id})}} key={index}>
                        <td>
                            {item.name}
                      </td>
                        <td>{item.snapshots}</td>
                        <td>{item.backups}</td>
                        <td className="width11">{item.status}</td>
                        <td>{item.clusterName}</td>
      
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

    checkBoxInnerTab2 () {
      if( this.state.checkInnerTab2) {
        this.setState({checkInnerTab2:false})
      }
      if( !this.state.checkInnerTab2) {
        this.setState({checkInnerTab2:true})
      }
    }

    changeToggleSwitcher () {
      if( this.state.toggleCheck) {
        this.setState({toggleCheck:false})
      }
      if( !this.state.toggleCheck) {
        this.setState({toggleCheck:true})
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
                      <input type="checkbox" onChange={this.changeToggleSwitcher.bind(this)} value={this.state.toggleCheck} checked={this.state.toggleCheck}/>
                      <span className="slider round"></span>
                  </label>
          </div>
            </div>
            <div className="gt-left off__label">Off</div>
          </div>
          
          <div className="account-status">Administrator account</div>
          <div className="gt-clear row-label-input">
            <div className="gt-left width165px">
            Login
            </div>
            <div className="gt-left">
            <input/>
            </div>
          </div>
          <div className="gt-clear row-label-input">
            <div className="gt-left width165px">
            Password
            </div>
            <div className="gt-left">
            <input/>
            </div>
          </div>
          <div className="gt-clear row-label-input marbtm20">
            <div className="gt-left width165px">
            Confirm Password
            </div>
            <div className="gt-left">
            <input/>
            </div>
          </div>
          <a className="apply-btn btn-left-mar">Apply</a>
        </div>
      )
    }

    innerTab2(){
      return (
        <div className="wrapper-settings innerTab2wrapper">
          <div className="innerTab2-checkbox">
          <label><input type="checkbox" onChange={this.checkBoxInnerTab2.bind(this)} checked={this.state.checkInnerTab2} name="dva"/> Obtain an IP address automatically</label>
          </div>
          <div className="gt-clear row-label-input">
            <div className="gt-left width165px">
            IP Address
            </div>
            <div className="gt-left">
            <input/>
            </div>
          </div>
          <div className="gt-clear row-label-input">
            <div className="gt-left width165px">
            Subnet mask
            </div>
            <div className="gt-left">
            <input/>
            </div>
          </div>
          <div className="gt-clear row-label-input">
            <div className="gt-left width165px">
            Default gateway
            </div>
            <div className="gt-left">
            <input/>
            </div>
          </div>
          <div className="gt-clear row-label-input marbtm20">
            <div className="gt-left width165px">
            Preffered DNS server
            </div>
            <div className="gt-left">
            <input/>
            </div>
          </div>
          <a className="apply-btn btn-left-mar">Apply</a>
        </div>
        
      )
    }

    innerTab1() {
      return (
        <div className="wrapper-settings ">
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
                <dd className="border0">vba.contoso.com</dd>
                <dt>Product</dt>
                <dd>Veeam Backup</dd>
                <dt>Appliance version</dt>
                <dd>35</dd>
                
              </dl>
        </div>
      )
    }
    tabChanged(index) {
      console.log(index)
      
        this.setState({tabSelected:index,choosen:false,choosen2:false})
      
    }

    render(){
      console.log(this.props.tabt)
  


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
                <Tab>Credentials</Tab> <div className="separator"></div>
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
              <TabPanel></TabPanel>
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


      GetBackupServers: () => dispatch(GetBackupServers()),
      GetDetailServer: (id) => dispatch(GetDetailServer(id)),
      GetClusters: () => dispatch(GetClusters()),
      GetDetailCluster: (id) => dispatch(GetDetailCluster(id)),
      
      
     // cleartask_info: () => dispatch(cleartask_info()),


    }
}

function mapStateToProps(state) {

console.log(state.toJS().BackupReducer.backups);
    return {


          tabt:state.toJS().NavBarReducer.InTab,
          
          listbackups:state.toJS().SettingsReducer.listbackups,
          cluster_list:state.toJS().SettingsReducer.cluster_list,
          

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Settings);
