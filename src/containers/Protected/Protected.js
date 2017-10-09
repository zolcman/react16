import React, { Component,  PropTypes} from 'react'
import { Link } from 'react-router-dom';
import { connect} from 'react-redux';
import styles from './styles.scss';
import { GetVmList } from './ProtectedAction'

class Protected extends Component {
    constructor(props) {
        super(props)

        this.state = {

          filteredItems: false,
          filterval: '',

    }
}
    componentDidMount() {


        this.props.GetVmList();
    }

    componentWillReceiveProps(nextProps) {

      if (nextProps.vms) {
     this.setState({table:nextProps.vms})
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

  var list = this.state.filteredItems || this.state.table || []

  console.log(this.state.table)

        return (
          <div className="protected">
            <div className="filters">
              <div className="filter-wrapper gt-clear">
                <div className="gt-left">
                  <div className="breadcrumbs">
                    <Link to='/'>Home</Link> / Protected VM's
                  </div>
                  <div className="vm-counter gt-left">Protected VM's (3)</div>
                </div>
                <div className="gt-right label-view">
                  <div className="label-view-status">Restores in Progress</div>
                  <div className="label-view-counter">NONE</div>
                </div>

              </div>
              <div className="clear-wrapper gt-clear mar2020 he36">
                <div className="gt-left">
                  <a className="gt-left res-btns restore-icon">Restore VM</a>
                  <a className="gt-left res-btns qiuk-icon">Quick Backup</a>
                  <a className="gt-left res-btns dlt0icon">Delete</a>
                  <a className="gt-left res-btns refrsh">Refresh</a>
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
              </div>
          </div>
        )
    }
}
const mapDispatchToProps = function(dispatch) {
    return {


      GetVmList: () => dispatch(GetVmList()),


    }
}

function mapStateToProps(state) {

console.log(state.toJS().ProtectedReducer.vms);
    return {

          vms:state.toJS().ProtectedReducer.vms,

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Protected);
