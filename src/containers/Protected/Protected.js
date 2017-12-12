import React, { Component,  PropTypes} from 'react'
import { Link } from 'react-router-dom';
import { connect} from 'react-redux';
import styles from './styles.scss';
import { GetVmList } from './ProtectedAction'
import Wizard from '../../components/VmWiz/Wizard';
import VMProgressBar from '../../components/VMProgressBar/VMProgressBar';
import DiskRestoreWiz from '../../components/DiskRestoreWiz/DiskRestoreWiz';

import { updatestatus } from '../Backup/BackupAction'

import { GetVmListDetail } from '../Protected/ProtectedAction';
class Protected extends Component {
    constructor(props) {
        super(props)

        this.state = {

          filteredItems: false,
          filterval: '',

    }
}
    componentDidMount() {

      var self= this;
        this.props.GetVmList();

        var heigh =  $( document ).height();
        $('.protected').css("min-height",heigh - 81);

        $('.protected').click(function (e) {
            
             if(!$(e.target).is('.table-content tr td') && !$(e.target).is('#restore-btn') && !$(e.target).parents('.freeze').length > 0 && !$(e.target).is('.freeze')) {
               $('.table-content tr').removeClass("selected-green");
               self.setState({vmid:{}})
               console.log('eeeeee')
              }
            });
      
    }

    componentDidUpdate () {

            
      
            $('.table-content tr').click(function (event) {
              $('.table-content tr').removeClass("selected-green");
              $(this).addClass( "selected-green" );
            });
            
      
          }
    

    componentWillReceiveProps(nextProps) {

      if (nextProps.taskidlink) {
        this.setState({linkToSeeUpdates:nextProps.taskidlink.Id})
      }

      if (nextProps.vms) {
     this.setState({table:nextProps.vms})
        if (nextProps.vms.length == 0) {
          this.setState({blockWhenEmpty:true})
        }
        if (nextProps.vms.length != 0) {
          this.setState({blockWhenEmpty:false})
        }

     if(nextProps.task_info) {
      this.setState({blockRestoreBtn:true})
      this.setState({linkToSeeUpdates:nextProps.task_info.Id})

      if (nextProps.task_info.progress == '100') {
        this.setState({blockRestoreBtn:false,linkToSeeUpdates:false})
      }
     }

     
}
     }

     openWiz2() {
      this.setState({openWiz2:true})
    }

    openWiz4() {
      this.setState({openWiz4:true})
    }

    closeWiz2() {
      this.setState({openWiz2:false})
    }

    chooseitem(id,name) {
     // console.log(id);
    this.props.GetVmListDetail(id);
      this.setState({vmid:id,vmname:name})
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

     openVMProgressBar() {
      this.setState({openWiz3:true})
      this.setState({blockRestoreBtn:true})
     }

     openVMProgressBarWithStatus() {
      this.setState({openWiz3:true})
     // this.props.updatestatus(this.state.linkToSeeUpdates);
     }
     
     closeWiz3() {
      this.setState({openWiz3:false})
     }

     closeWiz4() {
      this.setState({openWiz4:false})
     }

  


    render(){

  var list = this.state.filteredItems || this.state.table || []

  //console.log(this.state.table)

        return (
          <div className="protected">
            <div className="filters">
              <div className="filter-wrapper gt-clear">
                <div className="gt-left">
                  <div className="breadcrumbs">
                    <Link to='/'>Home</Link> / Protected VMs
                  </div>
                  <div className="vm-counter gt-left">Protected VMs (3)</div>
                </div>
                <div className="gt-right label-view">
                  <div className="label-view-status">Restores in Progress</div>
                  <div className="label-view-counter">{(this.state.linkToSeeUpdates) ? (<a onClick={this.openVMProgressBarWithStatus.bind(this)}>Running</a>): ('null') }</div>
                </div>

              </div>
              <div className="clear-wrapper gt-clear mar2020 he36">
                <div className="gt-left">
                {(this.state.blockRestoreBtn || this.state.blockWhenEmpty) ?
                   (<a id="restore-btn" className="gt-left bk-btn restore-btn disabled">Restore</a>)
                   :
                    (<a id="restore-btn"  onClick={this.openWiz2.bind(this)} className="gt-left bk-btn restore-btn">Restore</a>)
                    }  
                  <a id="restore-btn"  onClick={this.openWiz4.bind(this)} className="gt-left bk-btn disk_restore-btn width135px">Disk Restore</a>
                  <a id="restore-btn2"  className="gt-left bk-btn red_delete-btn disabled">Delete</a>
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
                          <tr onClick={this.chooseitem.bind(this,item.Id,item.name)} key={index}>
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
              <Wizard openVMProgressBar={this.openVMProgressBar.bind(this)} vmname={this.state.vmname} vmid={this.state.vmid}  open={this.state.openWiz2} close={this.closeWiz2.bind(this)}/>
              <VMProgressBar open={this.state.openWiz3} close={this.closeWiz3.bind(this)}/>
              <DiskRestoreWiz openVMProgressBar={this.openVMProgressBar.bind(this)} open={this.state.openWiz4} close={this.closeWiz4.bind(this)}/>
              
          </div>
        )
    }
}
const mapDispatchToProps = function(dispatch) {
    return {


      GetVmList: () => dispatch(GetVmList()),
      cleartask_info: () => dispatch(cleartask_info()),
      GetVmListDetail: (id) => dispatch(GetVmListDetail(id)),
      updatestatus: (id) => dispatch(updatestatus(id)),

    }
}

function mapStateToProps(state) {

//console.log(state.toJS().ProtectedReducer.vms);
    return {
          taskidlink:state.toJS().BackupReducer.vmidtoupdate,
          vms:state.toJS().ProtectedReducer.vms,
          task_info:state.toJS().BackupReducer.task_status,

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Protected);
