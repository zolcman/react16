import React, { Component,  PropTypes} from 'react'
import { Link } from 'react-router-dom';
import { connect} from 'react-redux';
import styles from './styles.scss';
import { GetBackDetail } from './BackupAction'
import { GetBackDetail2 } from './BackupAction'
import { GetBackList } from './BackupAction'
import BackWiz from '../../components/BackWiz/BackWiz';
import Wizard from '../../components/VmWiz/Wizard';
import { cleartask_info } from './BackupAction';
//import { GetVmListDetail } from '../Protected/ProtectedAction';
import { updatestatus } from './BackupAction'
import { EditJobInfo } from './BackupAction'
import { StartJobTask } from './BackupAction'
import JobWizard from '../../components/JobWiz/JobWizard';
import { clear_auto } from './BackupAction'
import { DeleteBackupJob } from './BackupAction'
import {PassJobInfo} from './BackupAction'

class BackupDetail extends Component {
    constructor(props) {
        super(props)

        this.state = {

          openWiz:false,
          openWiz2:false,
          filteredItems: false,
          filterval: '',

    }
}
    componentDidMount() {

      this.props.GetBackDetail(this.props.match.params.id);
      this.props.GetBackDetail2(this.props.match.params.id);
      this.props.GetBackList();

    }

    componentWillMount () {
      this.props.cleartask_info()
    }

    componentDidUpdate () {

      $('.table-content tbody tr').click(function (event) {
        $('.table-content tbody tr').removeClass("selected-green");
        $(this).addClass( "selected-green" );
      });

    }

    componentWillReceiveProps(nextProps) {

      if (nextProps.run_auto_job) {
        this.setState({openWiz2:true})
        this.props.clear_auto();
    }

      if (nextProps.backdetail) {
     this.setState({table:nextProps.backdetail})
      }
      if (nextProps.backdetail2) {
       console.log(nextProps.backdetail2)
       this.setState({name:nextProps.backdetail2.name,vmsCount:nextProps.backdetail2.vmsCount,status:nextProps.backdetail2.status,Id:nextProps.backdetail2.Id})
      this.setState({asynctaskId:nextProps.backdetail2.asyncTaskId})
        if (nextProps.backdetail2.status == 'Running') {
          this.setState({blockBtn:true})
        }
        if (nextProps.backdetail2.status != 'Running') {
          this.setState({blockBtn:false})
        }

         }
     }


     openWiz() {
       this.setState({openWiz:true})
       this.props.EditJobInfo(this.props.match.params.id);
     }

     closeWiz() {
       this.setState({openWiz:false})
     }

     closeWiz2() {
      this.setState({openWiz2:false})
      this.props.GetBackDetail(this.props.match.params.id);
      this.props.GetBackDetail2(this.props.match.params.id);
    }

    openWiz2() {
      this.setState({openWiz2:true})
      this.props.updatestatus(this.state.asynctaskId);
    }

    

     chooseitem(id,name) {
       console.log(id);
	  // this.props.GetVmListDetail(id);
       this.setState({choosen:true,vmid:id,vmname:name})
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

     openWiz234 () {
      this.setState({openWiz2:true})
      this.props.StartJobTask(this.props.match.params.id);
      console.log('ppppp')
    }


    deleteJob() {
      let deletee = confirm('are you shore?')
     
      if (deletee) {
        this.props.DeleteBackupJob(this.props.match.params.id,true);
      }
      else {
        return;
      }
    }

    PassJobIdName() {
      this.props.PassJobInfo(this.props.match.params.id,this.state.name)
    }

    render(){

  var list = this.state.filteredItems || this.state.table || []

  console.log(this.state.table)

        return (
          <div className="backup-page">
            <div className="filters">
              <div className="filter-wrapper gt-clear">
                <div className="gt-left">
                  <div className="breadcrumbs">
                    <Link to='/'>Home</Link> / <Link to='/backupjobs'>Backup Jobs</Link> / {this.state.name}
                  </div>
                  <div className="vm-counter gt-left">Protected VMs ({this.state.vmsCount})</div>
                </div>
                <div className="gt-right label-view">
                  <div className="label-view-status">Protection shedule</div>
                  <div className="label-view-counter">NONE</div>
                </div>
                <div className="gt-right label-view mar2px">
                  <div className="label-view-status ">Linked Protection domain</div>
                  <div className="label-view-counter">NONE</div>
                </div>
                <div className="gt-right label-view mar2px">
                  <div className="label-view-status ">Current Job Status</div>
                  <div className="label-view-counter">{(this.state.status == 'Running') ? 
                  (<a className="running-btn" onClick={this.openWiz2.bind(this)}>{this.state.status}</a>):(this.state.status)}
                  </div>
                </div>

              </div>
              <div className="cntrl-btns gt-clear">
                <div className="btns-wrapper gt-clear">
                    <div className=" gt-left">
                    {this.state.blockBtn ? (<a  className="bk-btn gt-left disabled edit-btn">Edit</a>):(<a onClick={this.openWiz.bind(this)} className="bk-btn gt-left edit-btn">Edit</a>)}
                    {this.state.blockBtn ? (<a className="bk-btn gt-left red_delete-btn disabled">Delete</a>):(<a onClick={this.deleteJob.bind(this)} className="bk-btn gt-left red_delete-btn">Delete</a>)}
                         
                    {this.state.blockBtn ? (<a  className="bk-btn gt-left start-btn marLeft60px disabled">Start</a>):(<a onClick={this.openWiz234.bind(this)} className="bk-btn gt-left start-btn marLeft60px">Start</a>)}   
                        <a className="bk-btn gt-left activefull-btn fixpad disabled width125px ">Active Full</a>
                        <a className="bk-btn gt-left stop-btn disabled">Stop</a>
                       
                       
                       {/* <a className="bk-btn gt-left refresh-btn">Refresh</a> */}
                    </div>

                </div>
              </div>
              <div className="clear-wrapper gt-clear mar2020 he36">
              
                <div className="search-panel gt-right">
                  <input value={this.state.filterval} onChange={this.filter.bind(this)} className="srch-comp" placeholder="search"/>
                </div>
              </div>
              <div className="table-wrapper">

                <div className="table-content">
                  <table className="bk-table">
                    <thead>
                      <tr>
                      <th>VM name</th>
                      <th>Recovery points</th>
                      <th>Status</th>
                      <th>Location</th>
                      <th>Path</th>
                      <th>Last sucsess</th>
                      </tr>
                    </thead>
                    <tbody>


                      {list.map((item,index) => (
                          <tr onClick={this.chooseitem.bind(this,item.Id,item.name)} key={index}>
                          <td><Link onClick={this.PassJobIdName.bind(this)} className="link-table" to={`/vmsjobdetail/${ item.Id }`}>{item.name}</Link></td>
                          <td>{item.recoveryPoints}</td>
                          <td>{item.status}</td>
                          <td className="width11">{item.location}</td>
                          <td>{item.path}</td>
                          <td>{item.lastSuccess}</td>

                          </tr>

                      ))}
                    </tbody>

                  </table>
                </div>
              </div>
              </div>
              <BackWiz open={this.state.openWiz} close={this.closeWiz.bind(this)}/>
              <JobWizard vmname={this.state.name}  open={this.state.openWiz2} close={this.closeWiz2.bind(this)}/>
          </div>
        )
    }
}
const mapDispatchToProps = function(dispatch) {
    return {


      GetBackDetail: (id) => dispatch(GetBackDetail(id)),
      GetBackDetail2: (id) => dispatch(GetBackDetail2(id)),
      GetBackList: () => dispatch(GetBackList()),
      cleartask_info: () => dispatch(cleartask_info()),
	//  GetVmListDetail: (id) => dispatch(GetVmListDetail(id)),
    EditJobInfo: (id) => dispatch(EditJobInfo(id)),
    clear_auto: () => dispatch(clear_auto()),
    StartJobTask: (id) => dispatch(StartJobTask(id)),
    updatestatus: (id) => dispatch(updatestatus(id)),
    DeleteBackupJob: (id,detail) => dispatch(DeleteBackupJob(id,detail)),
    PassJobInfo: (id,name) => dispatch(PassJobInfo(id,name)),
    
    }
}

function mapStateToProps(state) {


    return {

         backdetail:state.toJS().BackupReducer.backupdetail,
         backdetail2:state.toJS().BackupReducer.backupdetail2,
         run_auto_job:state.toJS().BackupReducer.run_auto_job,

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(BackupDetail);
