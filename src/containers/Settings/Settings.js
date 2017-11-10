import React, { Component,  PropTypes} from 'react'
import { Link } from 'react-router-dom';
import { connect} from 'react-redux';
import styles from './styles.scss';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';


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

    }


    

    componentWillReceiveProps(nextProps) {
      console.log(nextProps.run)
      if(nextProps.tabt) {
        console.log(nextProps.tabt)
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

    firstTab() {

      var list = this.state.filteredItems || this.state.table || []
      return (
        <div>
        <div className="clear-wrapper gt-clear mar2020 he36">
        <div className="gt-left">
        <a  className="bk-btn gt-left add-btn fixpad">Add</a>
        {this.state.choosen ? (  <a onClick={this.openWizEdit.bind(this)} className="bk-btn gt-left start-btn fixpad">Edit</a>)
             :
              (   <a className="bk-btn gt-left edit-btn fixpad disabled">Edit</a>)}
             {this.state.choosen ? (  <a onClick={this.deleteJob.bind(this)} className="bk-btn gt-left delete-btn fixpad">Delete</a>)
             :
              (  <a className="bk-btn gt-left delete-btn fixpad disabled">Delete</a>)}
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
                  <tr className="" key={index}>
                  <td>
                      <Link className="link-table" to={`/vmsdetail/${ item.Id }`}>{item.name}</Link>
                </td>
                  <td>{item.snapshots}</td>
                  <td>{item.backups}</td>
                  <td className="width11">{item.status}</td>
                  <td>{item.clusterName}</td>
                  <td>{item.lastProtection}</td>

                  </tr>

              ))}
            </tbody>

          </table>
        </div>
      </div>
      </div>
      )
    }


    secondTab() {
      
            var list = this.state.filteredItems || this.state.table || []
            return (
              <div>
              <div className="clear-wrapper gt-clear mar2020 he36">
              <div className="gt-left">
              <a  className="bk-btn gt-left add-btn fixpad">Add</a>
              {this.state.choosen ? (  <a onClick={this.openWizEdit.bind(this)} className="bk-btn gt-left start-btn fixpad">Edit</a>)
                   :
                    (   <a className="bk-btn gt-left edit-btn fixpad disabled">Edit</a>)}
                   {this.state.choosen ? (  <a onClick={this.deleteJob.bind(this)} className="bk-btn gt-left delete-btn fixpad">Delete</a>)
                   :
                    (  <a className="bk-btn gt-left delete-btn fixpad disabled">Delete</a>)}
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
                    <th className="width20th">Name</th>
                    <th>Protection Domains</th>
                    <th >Cluster IP</th>
                    <th>Protected VMs</th>
                    <th>Status</th>
                    
                    </tr>
                  </thead>
                  <tbody>
      
      
                    {list.map((item,index) => (
                        <tr className="" key={index}>
                        <td>
                            <Link className="link-table" to={`/vmsdetail/${ item.Id }`}>{item.name}</Link>
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
                3
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
          <div className="gt-clear row-label-input">
            <div className="gt-left width165px">
            Preffered DNS server
            </div>
            <div className="gt-left">
            <input/>
            </div>
          </div>
        </div>
      )
    }

    innerTab1() {
      return (
        <div className="wrapper-settings ">
          <div className="gt-clear he38">
        <div className="btns-group gt-right">
        <a  className="bk-btn gt-left add-btn fixpad removewidth">Config Backup</a>
        <a  className="bk-btn gt-left add-btn fixpad removewidth">Reboot</a>
        <a  className="bk-btn gt-left add-btn fixpad removewidth">Shutdown</a>
        <a  className="bk-btn gt-left add-btn fixpad removewidth mrrcl">Support bundle</a>
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
          <Tabs defaultIndex={this.props.tabt}> 
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


    //  Run: () => dispatch(Run()),
     // cleartask_info: () => dispatch(cleartask_info()),


    }
}

function mapStateToProps(state) {

console.log(state.toJS().BackupReducer.backups);
    return {


          tabt:state.toJS().NavBarReducer.InTab,
          backup:state.toJS().BackupReducer.backups,
          run:state.toJS().SettingsReducer.run,

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Settings);
