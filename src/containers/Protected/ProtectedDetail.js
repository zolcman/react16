import React, { Component,  PropTypes} from 'react'
import { Link } from 'react-router-dom';
import { connect} from 'react-redux';
import styles from './styles.scss';
import { GetVmListDetail } from './ProtectedAction'

class ProtectedDetail extends Component {
    constructor(props) {
        super(props)

        this.state = {


    }
}
    componentDidMount() {


      this.props.GetVmListDetail(this.props.match.params.id);

    }

    componentWillReceiveProps(nextProps) {

      if (nextProps.vms) {
     this.setState({table:nextProps.vms})
      }
     }




    render(){

  var list = this.state.table || []

  console.log(this.state.table)

        return (
          <div>
            <div className="filters">
              <div className="filter-wrapper gt-clear">
                <div className="gt-left">
                  <div className="breadcrumbs">
                    <Link to='/'>Home</Link> / <Link to='/protectedvms'>Protected VM's</Link> / {this.props.match.params.id}
                  </div>
                  <div className="vm-counter gt-left">Protected VM's (2)</div>
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
                  <a className="gt-left res-btns">Restore VM</a>
                  <a className="gt-left res-btns">Quick Backup</a>
                  <a className="gt-left res-btns">Refresh</a>
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
                      <th>Job</th>
                      <th>Status</th>
                      <th>Backup Site</th>
                      <th>Last sucsess</th>
                      </tr>
                    </thead>
                    <tbody>


                      {list.map((item,index) => (
                          <tr className="" key={index}>
                          <td><a className="link-table">{item.name}</a></td>
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
          </div>
        )
    }
}
const mapDispatchToProps = function(dispatch) {
    return {


      GetVmListDetail: (id) => dispatch(GetVmListDetail(id)),


    }
}

function mapStateToProps(state) {


    return {

      //    vms:state.toJS().ProtectedReducer.vms,

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProtectedDetail);
