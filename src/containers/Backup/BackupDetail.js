import React, { Component,  PropTypes} from 'react'
import { Link } from 'react-router-dom';
import { connect} from 'react-redux';
import styles from './styles.scss';
import { GetBackDetail } from './BackupAction'
import { GetBackDetail2 } from './BackupAction'

import BackWiz from '../../components/BackWiz/BackWiz';
import Wizard from '../../components/VmWiz/Wizard';
import { cleartask_info } from './BackupAction';
//import { GetVmListDetail } from '../Protected/ProtectedAction';

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

      if (nextProps.backdetail) {
     this.setState({table:nextProps.backdetail})
      }
      if (nextProps.backdetail2) {
       console.log(nextProps.backdetail2)
         }
     }


     openWiz() {
       this.setState({openWiz:true})
     }

     closeWiz() {
       this.setState({openWiz:false})
     }

     openWiz2() {
       this.setState({openWiz2:true})
     }

     closeWiz2() {
       this.setState({openWiz2:false})
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

     

    render(){

  var list = this.state.filteredItems || this.state.table || []

  console.log(this.state.table)

        return (
          <div className="backup-page">
            <div className="filters">
              <div className="filter-wrapper gt-clear">
                <div className="gt-left">
                  <div className="breadcrumbs">
                    <Link to='/'>Home</Link> / <Link to='/backupjobs'>Backup Jobs</Link> / {this.props.backdetail2.name}
                  </div>
                  <div className="vm-counter gt-left">Protected VMs ({this.props.backdetail2.vmsCount})</div>
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
                  <div className="label-view-counter">{this.props.backdetail2.status}</div>
                </div>

              </div>
              <div className="cntrl-btns gt-clear">
                <div className="btns-wrapper gt-clear">
                    <div className=" gt-left">
                        <a className="bk-btn gt-left start-btn">Start</a>
                        <a className="bk-btn gt-left stop-btn">Stop</a>
                        <a onClick={this.openWiz.bind(this)} className="bk-btn gt-left add-btn">Add</a>
                        <a className="bk-btn gt-left edit-btn">Edit</a>
                        <a className="bk-btn gt-left delete-btn">Delete</a>
                        <a className="bk-btn gt-left refresh-btn">Refresh</a>
                    </div>

                </div>
              </div>
              <div className="clear-wrapper gt-clear mar2020 he36">
              {/*  <div className="gt-left">
                  {this.state.choosen ? (  <a onClick={this.openWiz2.bind(this)} className="gt-left res-btns restore-icon  ">Restore VM</a>)
                  :
                  (  <a  className="gt-left  turnoff-btn">Restore VM</a>)
                }

                  <a className="gt-left res-btns qiuk-icon">Quick Backup</a>
                  <a className="gt-left res-btns refrsh">Refresh</a>
                </div> */} 
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
                          <td><Link className="link-table" to={`/vmsdetail/${ item.Id }`}>{item.name}</Link></td>
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
              <Wizard  vmname={this.state.vmname} vmid={this.state.vmid}  open={this.state.openWiz2} close={this.closeWiz2.bind(this)}/>
          </div>
        )
    }
}
const mapDispatchToProps = function(dispatch) {
    return {


      GetBackDetail: (id) => dispatch(GetBackDetail(id)),
      GetBackDetail2: (id) => dispatch(GetBackDetail2(id)),
      cleartask_info: () => dispatch(cleartask_info()),
	  GetVmListDetail: (id) => dispatch(GetVmListDetail(id)),

    }
}

function mapStateToProps(state) {


    return {

         backdetail:state.toJS().BackupReducer.backupdetail,
         backdetail2:state.toJS().BackupReducer.backupdetail2,

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(BackupDetail);
