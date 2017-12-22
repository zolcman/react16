import React, { Component,  PropTypes} from 'react'
import { Link } from 'react-router-dom';
import { connect} from 'react-redux';
import styles from './styles.scss';
import { GetVmListDetail } from './ProtectedAction'
import { GetVmListDetailFull } from './ProtectedAction'
import VMProgressBar from '../../components/VMProgressBar/VMProgressBar';
import Wizard from '../../components/VmWiz/Wizard';
import { updatestatus } from '../Backup/BackupAction'
import { GetVmList } from './ProtectedAction'

class ProtectedDetail extends Component {
    constructor(props) {
        super(props)

        this.state = {


    }
}
    componentDidMount() {


      this.props.GetVmListDetail(this.props.match.params.id);
      this.props.GetVmListDetailFull(this.props.match.params.id);
      this.props.GetVmList();

      var self= this;
      

      var heigh =  $( document ).height();
      $('.protected').css("min-height",heigh - 81);

      $('.protected').click(function (e) {
          
           if(!$(e.target).is('.table-content tr td') && !$(e.target).is('#restore-btn') && !$(e.target).parents('.freeze').length > 0 && !$(e.target).is('.freeze')) {
             $('.table-content tr').removeClass("selected-green");
             self.setState({checkedId: '',
             pointinfo:'',})
             console.log('eeeeee')
            }
          });
    }

    componentWillReceiveProps(nextProps) {

      if (nextProps.vmsdetail) {
     this.setState({table:nextProps.vmsdetail})
      }
      if (nextProps.vmsdetailFull) {
        this.setState({name:nextProps.vmsdetailFull.name})
        this.setState({vmid:nextProps.vmsdetailFull.Id})
         }

         if (nextProps.taskidlink) {
          this.setState({linkToSeeUpdates:nextProps.taskidlink.Id})
        }

        if(nextProps.task_info) {
          this.setState({blockRestoreBtn:true})
          this.setState({linkToSeeUpdates:nextProps.task_info.Id})
    
          if (nextProps.task_info.progress == '100') {
            this.setState({blockRestoreBtn:false,linkToSeeUpdates:false})
          }
         }
     }

     openWiz2() {
      this.setState({openWiz2:true})
    }

    closeWiz2() {
      this.setState({openWiz2:false})
    }

    closeWiz3() {
      this.setState({openWiz3:false})
     }

   

     openVMProgressBar() {
      this.setState({openWiz3:true})
      this.setState({blockRestoreBtn:true})
     }

     openVMProgressBarWithStatus() {
      this.setState({openWiz3:true})
     // this.props.updatestatus(this.state.linkToSeeUpdates);
     }


     chooseitem(id,date,index) {

      if(this.state.checkedId===index){
        this.setState({
           checkedId: '',
           pointinfo:'',
          });
        }else{
        this.setState({
           checkedId: index,
           
          
          });
          this.setState({pointinfo:{
            point:date,
            recoveryPointUid:id}})
        }
     
       
      
     }

    render(){

  var list = this.state.table || []

  console.log(this.state.table)

        return (
          <div className="protected">
            <div className="filters">
              <div className="filter-wrapper gt-clear">
                <div className="gt-left">
                  <div className="breadcrumbs">
                    <Link to='/'>Home</Link> / <Link to='/protectedvms'>Protected VMs</Link> / {this.state.name}
                  </div>
                  <div className="vm-counter gt-left">Restore Points ({list.length})</div>
                </div>
                <div className="gt-right label-view">
                  <div className="label-view-status">Consistency group</div>
                  <div className="label-view-counter">NONE</div>
                </div>
                <div className="gt-right label-view mar2px">
                  <div className="label-view-status ">Cluster</div>
                  <div className="label-view-counter">NONE</div>
                </div>
                <div className="gt-right label-view mar2px">
                  <div className="label-view-status ">VM status</div>
                  <div className="label-view-counter">{(this.state.linkToSeeUpdates) ? (<a onClick={this.openVMProgressBarWithStatus.bind(this)}>Running</a>): ('NONE') }</div>
                </div>

              </div>
              <div className="clear-wrapper gt-clear mar2020 he36">
                <div className="gt-left">
                {(this.state.blockRestoreBtn || this.state.blockWhenEmpty) ?
                   (<a id="restore-btn" className="gt-left bk-btn restore-btn disabled">Restore</a>)
                   :
                    (<a id="restore-btn"  onClick={this.openWiz2.bind(this)} className="gt-left bk-btn restore-btn">Restore</a>)
                    } 
                </div>
                <div className="search-panel gt-right">
                  <input className="srch-comp" placeholder="search"/>
                </div>
              </div>
              <div className="table-wrapper">

                <div className="table-content">
                  <table className="bk-table">
                    <thead>
                      <tr>
                      <th>Date</th>
                      <th>Type</th>
                      <th> Backup Job</th>
                      <th>Size</th>
                     
                      </tr>
                    </thead>
                    <tbody>


                      {list.map((item,index) => (
                          <tr className={`${this.state.checkedId===index ?
                            'selected-green ': ''}`} onClick={this.chooseitem.bind(this,item.Id,item.date,index)} key={index}>
                          <td>{item.date}</td>
                          <td>{item.type}</td>
                          <td>{item.job}</td>
                          
                          <td>{item.backupSizeBytes}</td>
            

                          </tr>

                      ))}
                    </tbody>

                  </table>
                </div>
              </div>
              </div>
              <Wizard pointinfo={this.state.pointinfo} openVMProgressBar={this.openVMProgressBar.bind(this)} vmname={this.state.vmname} vmid={this.state.vmid}  open={this.state.openWiz2} close={this.closeWiz2.bind(this)}/>
              <VMProgressBar open={this.state.openWiz3} close={this.closeWiz3.bind(this)}/>
          </div>
        )
    }
}
const mapDispatchToProps = function(dispatch) {
    return {

      GetVmList: () => dispatch(GetVmList()),
      GetVmListDetail: (id) => dispatch(GetVmListDetail(id)),
      GetVmListDetailFull: (id) => dispatch(GetVmListDetailFull(id)),
      updatestatus: (id) => dispatch(updatestatus(id)),

    }
}

function mapStateToProps(state) {


    return {

         vmsdetail:state.toJS().ProtectedReducer.vmsdetail,
         vmsdetailFull:state.toJS().ProtectedReducer.vmsdetailFull,
         taskidlink:state.toJS().BackupReducer.vmidtoupdate,
         task_info:state.toJS().BackupReducer.task_status,
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProtectedDetail);
