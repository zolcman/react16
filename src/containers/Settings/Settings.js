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


    render(){
      console.log(this.props.tabt)
  var list = this.state.filteredItems || this.state.table || []


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
              <div className="setttings-wrapper">
              <Tabs defaultIndex={this.props.tabt}>
              <TabList>
                <div className="tabs-settings">
                <Tab>Manage Veeam B&R Servers </Tab><div className="separator"></div>
                <Tab>Manage Nutanix Clusters</Tab> <div className="separator"></div>
                <Tab>Credentials</Tab> <div className="separator"></div>
                <Tab>Appliance Settings</Tab>
                </div>
              </TabList>
              <TabPanel>
              <div className="clear-wrapper gt-clear mar2020 he36">
                <div className="gt-left">
                  
                </div>
                <div className="search-panel gt-right">
                  <input value={this.state.filterval} onChange={this.filter.bind(this)}  className="srch-comp" placeholder="search"/>
                </div>
              </div>
              <div className="table-wrapper">

                <div className="table-content">
                  <table className="bk-table">
                    <thead>
                      <tr>
                      <th>Date</th>
                      <th>Snapshots</th>
                      <th>Backups</th>
                      <th>Status</th>
                      <th>Cluster</th>
                      <th>Last Protection</th>
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
              </TabPanel>
              <TabPanel></TabPanel>
              <TabPanel></TabPanel>
              <TabPanel></TabPanel>
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
