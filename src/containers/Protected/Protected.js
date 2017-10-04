import React, { Component,  PropTypes} from 'react'
import { Link } from 'react-router-dom';
import { connect} from 'react-redux';
import styles from './styles.scss';


class Protected extends Component {
    constructor(props) {
        super(props)

        this.state = {

          table:[
            {name:'test job1',cluster:'Ntnx1',cur_stat:'running',lst_run:'sucsess',linked:'test PD',pro:'every 2 HR',srt_time:'6:15 AM',last_run:'6:45 AM 10/10/1200',WMs:'35',desription:'ssss'},
            {name:'test job2',cluster:'Ntnx2',cur_stat:'failure',lst_run:'sucsess',linked:'test PD',pro:'every 2 HR',srt_time:'6:15 AM',last_run:'6:45 AM 10/10/1200',WMs:'35',desription:'ssss'}
          ]

    }
}
    componentDidMount() {

    }



    render(){

  var list = this.state.table || []

        return (
          <div>
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
                  <a className="gt-left res-btns">Restore VM</a>
                  <a className="gt-left res-btns">Quick Backup</a>
                  <a className="gt-left res-btns">Delete</a>
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
                      <th>Date</th>
                      <th>Snapshots</th>
                      <th>Backups</th>
                      <th>Status</th>
                      <th>Cluster</th>
                      <th>Last Protection</th>

                    </thead>
                    <tbody>
                      {list.map((item,index) => (
                          <tr className="" key={index}>
                          <td><a className="link-table">{item.name}</a></td>
                          <td>{item.cluster}</td>
                          <td>{item.cur_stat}</td>
                          <td className="width11">{item.lst_run}</td>
                          <td>{item.linked}</td>
                          <td>{item.pro}</td>

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





    }
}

function mapStateToProps(state) {

//console.log(state.Reducer.emulate);
    return {


    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Protected);
