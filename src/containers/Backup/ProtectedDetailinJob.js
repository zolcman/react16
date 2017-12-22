import React, { Component,  PropTypes} from 'react'
import { Link } from 'react-router-dom';
import { connect} from 'react-redux';
import styles from './styles.scss';
import { GetVmListDetail } from '../Protected/ProtectedAction'
import { GetVmListDetailFull } from '../Protected/ProtectedAction'

class ProtectedDetailinJob extends Component {
    constructor(props) {
        super(props)

        this.state = {


    }
}
    componentDidMount() {


      this.props.GetVmListDetail(this.props.match.params.id);
      this.props.GetVmListDetailFull(this.props.match.params.id);
      
    }

    componentWillReceiveProps(nextProps) {

      if (nextProps.vmsdetail) {
     this.setState({table:nextProps.vmsdetail})
      }
      if (nextProps.vmsdetailFull) {
        this.setState({name:nextProps.vmsdetailFull.name})
         }
      if (nextProps.dataForBread) {
        this.setState({dataForBread:nextProps.dataForBread})
      }
     }




    render(){

  var list = this.state.table || []

  console.log(this.state.table)

        return (
          <div className="protected backProtected">
            <div className="filters">
              <div className="filter-wrapper gt-clear">
                <div className="gt-left">
                  <div className="breadcrumbs">
                    {(this.state.dataForBread) ? (<div>
                      <Link to='/'>Home</Link> / <Link to='/backupjobs'>Backup Jobs</Link> / <Link to={`/jobdetail/${ this.state.dataForBread.id }`}>{this.state.dataForBread.name}</Link> / {this.state.name}
                    </div>):
                    (<div>
                      <Link to='/'>Home</Link> / <Link to='/backupjobs'>Backup Jobs</Link> / {this.state.name}
                    </div>)}
                  
                    
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
                  <div className="label-view-status ">Current Job Status</div>
                  <div className="label-view-counter">NONE</div>
                </div>

              </div>
              <div className="clear-wrapper gt-clear mar2020 he36">
                <div className="gt-left">
                <a  className="bk-btn  quickbk-btn">Quick Backup</a>
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
                          <tr className="" key={index}>
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
          </div>
        )
    }
}
const mapDispatchToProps = function(dispatch) {
    return {


      GetVmListDetail: (id) => dispatch(GetVmListDetail(id)),
      GetVmListDetailFull: (id) => dispatch(GetVmListDetailFull(id)),
      

    }
}

function mapStateToProps(state) {


    return {

         vmsdetail:state.toJS().ProtectedReducer.vmsdetail,
         vmsdetailFull:state.toJS().ProtectedReducer.vmsdetailFull,
         dataForBread:state.toJS().BackupReducer.job_data_for_points,
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProtectedDetailinJob);
