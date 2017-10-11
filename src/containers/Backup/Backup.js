import React, { Component,  PropTypes} from 'react'
import styles from './styles.scss';
import { connect} from 'react-redux';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import BackWiz from '../../components/BackWiz/BackWiz';
import { GetBackList } from './BackupAction'
import { StartJobTask } from './BackupAction'
import JobWizard from '../../components/JobWiz/JobWizard';
import { updatestatus } from './BackupAction'

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
          openWiz2:false,
          fromlist:true,
          filteredItems: false,
          filterval: '',
          claster:false,
          status:false,
          cur:false,
    }
}
    componentDidMount() {

        this.props.GetBackList();

    }



    componentWillReceiveProps(nextProps) {

      if (nextProps.backup) {
     this.setState({table:nextProps.backup})
     this.setState({tablebackup:nextProps.backup})

     let camlistpre = nextProps.backup.map((xf) => ({value:xf.Id,label:xf.cluster}));


     let camlistpre2 = nextProps.backup.map((xf) => ({value:xf.Id,label:xf.status}));
     var camlistpre3 = nextProps.backup.map((xf) => ({value:xf.Id,label:xf.lastRunResult}));

    let change1 =  this.distinct(camlistpre) ;
    let change2 =  this.distinct(camlistpre2) ;
    let change3 =  this.distinct(camlistpre3) ;

     this.setState({options:change1});
      this.setState({options2:change2});
     this.setState({options3:change3});


        }
     }

     distinct(array) {
       var flags = {};
       var newPlaces = array.filter(function(entry) {
           if (flags[entry.label]) {
             return false;
           }
             flags[entry.label] = true;
             return true;
           });
           return newPlaces;
     }

    changeSelect(val) {
      if (val) {
        this.setState({selectOP:val})
        this.setState({claster:val.label})
        this.filters(val.label,this.state.cur,this.state.status);
        console.log(val.label)
      }
      if (!val) {
        this.setState({claster:false})
        this.setState({selectOP:val})
        this.filters(false,this.state.cur,this.state.status);
      }

    }

    changeSelect2(val) {
      if (val) {
        this.setState({selectOP2:val})
        this.setState({cur:val.label})
        this.filters(this.state.claster,val.label,this.state.status);
        console.log(val.label)
      }
      if (!val) {
        this.setState({cur:false})
        this.setState({selectOP2:val})
        this.filters(this.state.claster,false,this.state.status);
      }

    }


    changeSelect3(val) {
      if (val) {
        this.setState({selectOP3:val})
        this.setState({status:val.label})
        this.filters(this.state.claster,this.state.cur,val.label);
      }
      if (!val) {
        this.setState({status:false})
        this.setState({selectOP3:val})
        this.filters(this.state.claster,this.state.cur,false);
      }


      }

    filters(claster,cur,status) {

      if (status && claster && cur) {
        var clear = this.state.tablebackup.filter(function(item) {
                 return item.cluster == claster && item.lastRunResult == status && item.status == cur;
             });
        this.setState({table:clear})
      }


      if (!status && claster && cur) {
        console.log(claster)
        var clear = this.state.tablebackup.filter(function(item) {
                 return item.cluster == claster && item.status == cur;
             });
        this.setState({table:clear})
      }

      if (status && !claster && cur) {
        console.log(claster)
        var clear = this.state.tablebackup.filter(function(item) {
                 return item.lastRunResult == status && item.status == cur;
             });
        this.setState({table:clear})
      }

      if (status && claster && !cur) {
        console.log(claster)
        var clear = this.state.tablebackup.filter(function(item) {
                 return item.lastRunResult == status && item.cluster == claster ;
             });
        this.setState({table:clear})
      }

      if (!status && !claster && cur) {
        console.log(cur)
        var clear = this.state.tablebackup.filter(function(item) {
                 return  item.status == cur;
             });
        this.setState({table:clear})
      }

      if (status && !claster && !cur) {
        console.log(claster)
        var clear = this.state.tablebackup.filter(function(item) {
                 return  item.lastRunResult == status;
             });
        this.setState({table:clear})
      }

      if (!status && claster && !cur) {
        console.log(claster)
        var clear = this.state.tablebackup.filter(function(item) {
                 return  item.cluster == claster;
             });
        this.setState({table:clear})
      }


      if (!status && !claster && !cur) {
        console.log(claster)
        this.setState({table:this.state.tablebackup})
      }

    }








    openWiz() {
      this.setState({openWiz:true})
    }

    closeWiz() {
      this.setState({openWiz:false})
    }

    openWiz2(id,name) {
      this.props.updatestatus('backup-or-restore-task');
      this.setState({openWiz2:true})
      this.setState({jobname:name})
      this.setState({jobid:id})
      this.setState({fromlist:true})
    }

    closeWiz2() {
      this.setState({openWiz2:false})
    }

    refreshlist () {
      console.log('refrshed')
      this.props.GetBackList();
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

    chooseitem(id,status,name) {
      if (status == 'Running') {
        console.log(id);
        this.setState({choosen:false,jobid:id,jobname:name})
      }
      if (status != 'Running') {
        console.log(id);
        this.setState({choosen:true,jobid:id,jobname:name})

      }

    }


    componentDidUpdate () {

      $('.table-content tr').click(function (event) {
        $('.table-content tr').removeClass("selected-green");
        $(this).addClass( "selected-green" );
      });





    }

    openWiz234 () {
      this.setState({openWiz2:true})
      this.props.StartJobTask(this.state.jobid);
    }

    render(){



        var list = this.state.filteredItems || this.state.table || []

        return (
          <div className="backup-page">



            <div className="filters">
              <div className="filter-wrapper gt-clear">
              <div className="breadcrumbs">
                <Link to='/'>Home</Link> / Backup Jobs
              </div>
              <div className="filter-blocks gt-clear">
                <div className="jobs-counter gt-left">Backup Jobs (3)</div>
                <div className="filter-1 gt-left marr20">
                  <div className="gt-left filter-label">Nutanix cluster:</div>
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
                      options={this.state.options2}
                      onChange={this.changeSelect2.bind(this)}
                    />
                  </div>

                </div>
                <div className="filter-1 gt-right">
                  <div className="gt-left filter-label">Last Result:</div>
                  <div className="gt-left filter-select">
                    <Select
                      className="cusselect"
                      name="form-field-name"
                      value={this.state.selectOP3}
                      options={this.state.options3}
                      onChange={this.changeSelect3.bind(this)}
                    />
                  </div>

                </div>

              </div>

            </div>



            </div>

            <div className="cntrl-btns gt-clear">
              <div className="btns-wrapper gt-clear">
                  <div className=" gt-left">
                    {this.state.choosen ? (  <a onClick={this.openWiz234.bind(this)} className="bk-btn gt-left start-btn fixpad">Start</a>)
                     :
                      (  <a className="bk-btn gt-left start-btn fixpad diabledstart">Start</a>)}

                      <a className="bk-btn gt-left stop-btn fixpad">Stop</a>
                      <a onClick={this.openWiz.bind(this)} className="bk-btn gt-left add-btn fixpad">Add</a>
                      <a className="bk-btn gt-left edit-btn fixpad">Edit</a>
                      <a className="bk-btn gt-left delete-btn fixpad">Delete</a>
                      <a className="bk-btn gt-left refresh-btn fixpad">Refresh</a>
                  </div>
                  <div className="search-panel gt-right fixer91">
                    <input value={this.state.filterval} onChange={this.filter.bind(this)} className="srch-comp" placeholder="search"/>
                  </div>
              </div>
            </div>
            <div className="table-wrapper">

              <div className="table-content">
                <table className="bk-table">
                  <thead>
                    <tr >
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
                        <tr onClick={this.chooseitem.bind(this,item.Id,item.status,item.name)} className="" key={index}>
                        <td><Link className="link-table" to={`/jobdetail/${ item.Id }`}>{item.name}</Link></td>
                        <td>{item.cluster}</td>
                        <td> {item.status == 'Running' ? ( <a onClick={this.openWiz2.bind(this,item.Id,item.name)} className="link-table">{item.status}</a>)
                        : (<span>{item.status}</span>)


                      }

                         </td>
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
            <JobWizard vmname={this.state.jobname} vmid={this.state.jobid} fromlist={this.state.fromlist} refreshtablelist={this.refreshlist.bind(this)} open={this.state.openWiz2} close={this.closeWiz2.bind(this)}/>
          </div>
        )
    }
}
const mapDispatchToProps = function(dispatch) {
    return {


      GetBackList: () => dispatch(GetBackList()),
      StartJobTask: (id) => dispatch(StartJobTask(id)),
      updatestatus: (id) => dispatch(updatestatus(id)),

    }
}

function mapStateToProps(state) {

//console.log(state.Reducer.emulate);
    return {

      backup:state.toJS().BackupReducer.backups,

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Backup);
