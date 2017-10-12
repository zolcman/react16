import React, { Component,  PropTypes} from 'react'
import styles from './styles.scss';
import { connect} from 'react-redux';
import { Route, Switch,Link,NavLink,withRouter,  BrowserRouter as Router } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { updatestatus } from '../../containers/Backup/BackupAction'
import { cleartaskid } from '../../containers/Backup/BackupAction'
import { cleartask_info } from '../../containers/Backup/BackupAction'
import { stopTimer } from '../../containers/Backup/BackupAction'


class JobWizard extends Component {
    constructor(props) {
        super(props)
        this.timer;
        this.bla;
        this.switch2 = true;
        this.state = {

          page:'4',
          finish:false,
          lister:[{time:'9:58',action:'Job Started',duration:'22'},{time:'9:55',action:'Building',duration:'221'}]

        }
    }

    componentDidMount() {

      if (this.props.fromlist) {
        this.setState({finish:true}) // сдесь будем сразу по id выполнять запрос на обновление прогрессбара

      }

    }



    close() {
      clearTimeout(this.timer);
      var selfer = this;
      this.props.close();
      this.setState({bull:true})
      this.bla = true;
      this.bla2 = false;
    //  this.setState({turnoff:true})
      this.setState({switcher:true})
      this.setState({propro:{width:'0' + '%'}})
    //  this.props.cleartask_info();
    // setTimeout(function() {selfer.props.cleartask_info()}, 3000);
      //this.props.stopTimer();

    }

    componentDidUpdate () {
      this.bla2 = true;
      if (this.state.timer < 100) {
        this.props.cleartask_info();
      }



    }


    componentWillReceiveProps(nextProps) {


      if (nextProps.taskid != null) {
        this.props.updatestatus(nextProps.taskid.Id);
        this.props.cleartaskid();
        this.bla = false;


      //  this.setState({turnoff:false})
        console.log('first condtition');
      }

      if (nextProps.task_info && this.bla2 ) {

        console.log( 'second condtition' );

       this.setState({timer:nextProps.task_info.progress})
       var self = this;
        this.setState({propro:{width:nextProps.task_info.progress + '%'}})
         this.timer = setTimeout(function() {self.props.updatestatus(nextProps.task_info.Id)}, 2000);

         if (nextProps.task_info.progress == '100') {
           clearTimeout(this.timer);
           var selfer = this;
          // setTimeout(function() {selfer.props.cleartask_info()}, 3000);
         }
        if (this.bla) {
          console.log( 'third condtition' );
          var selfer = this;
          selfer.props.cleartask_info();
          this.setState({timer:'0'})
          this.setState({propro:{width:'0' + '%'}});
          this.bla = false;
          this.bla2 = true;
        //  this.setState({turnoff:false})
        //setTimeout(function() {selfer.props.cleartask_info()}, 3500);
        }






      }
    }




    switch (param) {
      this.setState({page:param})
    }





    add () {
      console.log('addd')
    }

    changewindow () {
      this.setState({finish:true})

    }

    cancelTask () {
        this.props.close();


      if (this.props.fromlist) {
        this.props.refreshtablelist();
        this.setState({finish:true,page:4}) // обновляем страницу если нажали cancel
      }
      else {
        this.setState({finish:false,page:4})
      }
    }



   move() {
    var elem = document.getElementById("myBar");
    var width = 1;
    var id = setInterval(frame, 10);
    function frame() {
        if (width >= 100) {
            clearInterval(id);
        } else {
            width++;
            elem.style.width = width + '%';
        }
    }
}





    render(){
      console.log(this.props.vmid)

        return (
          <div className="jobwiz">
            {this.props.open ?
              (

                <div className="freeze">
                  <div className="pop-up-window">
                    <div className="pop-up-header">
                      <div className="gt-left pop-up-h-title">
                        {this.state.finish ? (this.props.vmname): (this.props.vmname) }

                      </div>
                      <div className="gt-right"><a className="close-pop" onClick={this.close.bind(this)}></a></div>

                    </div>
                    <div className="body-popup2">
                      <div className="lvl-1">
                        <div className="progress-bar-title">
                          <div className="gt-left p_1">
                            Job progress
                          </div>

                          <div className="gt-left p_2">
                          {this.state.timer} %
                          </div>
                        </div>
                        <div className="progress-bar">
                          <div style={this.state.propro} id="myBar"></div>
                        </div>
                      </div>
                      <div className="lvl-1 martop20">
                        <table className="jobwiz-table">
                          <thead>
                            <tr>
                              <th>Summary</th>
                              <th>Data</th>
                              <th>Status</th>
                            </tr>

                          </thead>
                          <tbody>
                            <tr>
                              <td>Duration: 00 00</td>
                              <td>Processed: 4,9 GB (99%)</td>
                              <td>Success: 1</td>
                            </tr>
                              <tr>
                                <td>Processing rate: 320 MB/s</td>
                                <td>Read: 4,9 GB</td>
                                <td>Warnings: 0</td>
                              </tr>
                              <tr>
                                <td>Bottlenecks: Source</td>
                                <td>Transfered: 160,4 kb</td>
                                <td>Errors: 0</td>
                              </tr>

                          </tbody>
                        </table>
                      </div>
                      <div className="lvl-1 martop20">
                        <div className="table-content">
                          <table className="bk-table">
                            <thead>
                              <tr>
                              <th>Time</th>
                              <th>Action</th>
                              <th></th>

                              </tr>
                            </thead>
                            <tbody>


                              {this.state.lister.map((item,index) => (
                                  <tr className="" key={index}>
                                  <td>
                                      {item.time}
                                </td>
                                  <td>{item.action}</td>
                                  <td></td>


                                  </tr>

                              ))}
                            </tbody>

                          </table>
                        </div>
                      </div>
                      <div className="btns-group-jobwiz gt-clear">
                        <a className="back-btn gt-left go-btn-global">Hide log</a>
                        <a onClick={this.close.bind(this)} className=" gt-right go-btn-global">Close</a>
                        <a onClick={this.close.bind(this)} className="back-btn gt-right go-btn-global">Stop</a>

                      </div>
                    </div>


                  </div>
                </div>

              ):
              (null)}
              </div>

        )
    }
}
const mapDispatchToProps = function(dispatch) {

    return {

      updatestatus: (id) => dispatch(updatestatus(id)),
      cleartaskid: () => dispatch(cleartaskid()),
      cleartask_info: () => dispatch(cleartask_info()),
      stopTimer: () => dispatch(stopTimer()),

    }
}

function mapStateToProps(state) {


    return {

      taskid:state.toJS().BackupReducer.taskidtoupdate,
      task_info:state.toJS().BackupReducer.task_status,
      stopTimer:state.toJS().BackupReducer.stopTimers,

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(JobWizard);
