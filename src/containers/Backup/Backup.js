import React, { Component,  PropTypes} from 'react'
import styles from './styles.scss';
import { connect} from 'react-redux';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import BackWiz from '../../components/BackWiz/BackWiz';
import { GetBackList } from './BackupAction'



class Backup extends Component {
    constructor(props) {
        super(props)

        this.state = {
          options:[
            { value: 'one', label: 'One' },
            { value: 'two', label: 'Two' }
          ],
          table:[
            {name:'test job1',cluster:'Ntnx1',cur_stat:'running',lst_run:'sucsess',linked:'test PD',pro:'every 2 HR',srt_time:'6:15 AM',last_run:'6:45 AM 10/10/1200',WMs:'35',desription:'ssss'},
            {name:'test job2',cluster:'Ntnx2',cur_stat:'failure',lst_run:'sucsess',linked:'test PD',pro:'every 2 HR',srt_time:'6:15 AM',last_run:'6:45 AM 10/10/1200',WMs:'35',desription:'ssss'}
          ],
          openWiz:false,

    }
}
    componentDidMount() {

        this.props.GetBackList();

    }

    componentWillReceiveProps(nextProps) {

      if (nextProps.backup) {
     this.setState({table:nextProps.backup})
}
     }

    changeSelect(val) {
      //  this.props.toastrActions2();
      this.setState({selectOP:val})

    }

    changeSelect2(val) {
      //  this.props.toastrActions2();
      this.setState({selectOP2:val})

    }

    changeSelect3(val) {
      //  this.props.toastrActions2();
      this.setState({selectOP3:val})

    }

    openWiz() {
      this.setState({openWiz:true})
    }

    closeWiz() {
      this.setState({openWiz:false})
    }

    render(){
console.log(this.state.selectOP)


        var list = this.state.table || []

        return (
          <div>
            <div className="filters">
              <div className="filter-wrapper gt-clear">
              <div className="breadcrumbs">
                <Link to='/'>Home</Link> / Backup Jobs
              </div>
              <div className="filter-blocks gt-clear">
                <div className="jobs-counter gt-left">Backup Jobs (3)</div>
                <div className="filter-1 gt-left marr20">
                  <div className="gt-left filter-label">Nutanix claster:</div>
                  <div className="gt-left filter-select">
                    <Select
                      className="cusselect"
                      name="form-field-name"
                      value={this.state.selectOP}
                      options={this.state.options}
                      onChange={this.changeSelect.bind(this)}
                    />
                  </div>

                </div>
                <div className="filter-1 gt-left marr20">
                  <div className="gt-left filter-label">Backup server:</div>
                  <div className="gt-left filter-select">
                    <Select
                      className="cusselect"
                      name="form-field-name"
                      value={this.state.selectOP2}
                      options={this.state.options}
                      onChange={this.changeSelect2.bind(this)}
                    />
                  </div>

                </div>
                <div className="filter-1 gt-left">
                  <div className="gt-left filter-label">Last Result:</div>
                  <div className="gt-left filter-select">
                    <Select
                      className="cusselect"
                      name="form-field-name"
                      value={this.state.selectOP3}
                      options={this.state.options}
                      onChange={this.changeSelect3.bind(this)}
                    />
                  </div>

                </div>

              </div>

            </div>



            </div>

            <div className="cntrl-btns gt-clear">
              <div className="btns-wrapper gt-clear">
                  <div className="btns-group gt-left">
                      <a className="bk-btn gt-left start-btn fixpad">Start</a>
                      <a className="bk-btn gt-left stop-btn fixpad">Stop</a>
                      <a onClick={this.openWiz.bind(this)} className="bk-btn gt-left add-btn fixpad">Add</a>
                      <a className="bk-btn gt-left edit-btn fixpad">Edit</a>
                      <a className="bk-btn gt-left delete-btn fixpad">Delete</a>
                      <a className="bk-btn gt-left refresh-btn fixpad">Refresh</a>
                  </div>
                  <div className="search-panel gt-right">
                    <input className="srch-comp" placeholder="search"/>
                  </div>
              </div>
            </div>
            <div className="table-wrapper">

              <div className="table-content">
                <table className="bk-table">
                  <thead>
                    <tr>
                    <th>Name</th>
                    <th>Cluster</th>
                    <th>Curent Status</th>
                    <th>Last Run Result</th>
                    <th>Linked PD's</th>
                    <th>RPO</th>
                    <th>Start time</th>
                    <th>Last run</th>
                    <th>VM's</th>
                    <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {list.map((item,index) => (
                        <tr className="" key={index}>
                        <td><Link className="link-table" to={`/jobdetail/${ item.Id }`}>{item.name}</Link></td>
                        <td>{item.cluster}</td>
                        <td>{item.status}</td>
                        <td className="width11">{item.lastRunResult}</td>
                        <td>{item.linkedPds}</td>
                        <td>{item.rpo}</td>
                        <td>{item.startTime}</td>
                        <td className="width16">{item.lastRun}</td>
                        <td>{item.vmsCount}</td>
                        <td>{item.description}</td>
                        </tr>

                    ))}
                  </tbody>

                </table>
              </div>
            </div>
            <BackWiz open={this.state.openWiz} close={this.closeWiz.bind(this)}/>
          </div>
        )
    }
}
const mapDispatchToProps = function(dispatch) {
    return {


      GetBackList: () => dispatch(GetBackList()),


    }
}

function mapStateToProps(state) {

//console.log(state.Reducer.emulate);
    return {

      backup:state.toJS().BackupReducer.backups,

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Backup);
