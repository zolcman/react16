import React, { Component,  PropTypes} from 'react'
//import styles from './styles.scss';
import { connect} from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { cleartaskvmid } from '../../containers/Backup/BackupAction'
import { updatestatus } from '../../containers/Backup/BackupAction'
import { cleartask_info } from '../../containers/Backup/BackupAction'
var bytes = require('bytes');
class VMProgressBar extends Component {
    constructor(props) {
        super(props)
        this.bla2 = true;
        this.timer;
        this.state = {



        }
    }


    componentDidMount() {

     }
        
    cancelTask () {
            
        this.props.close();
       //  clearTimeout(this.timer);
        this.props.close();
        this.setState({finish:false,page:1})
      //  this.setState({switcher:true})
        this.setState({timer:0})
        this.setState({propro:{width:'0' + '%'}})
        this.block = false;
        var selfer = this;
       //  setTimeout(function() {selfer.props.cleartask_info()}, 3500);            
       this.bla = true;
       this.bla2 = false;
    
    }  

    componentWillUnmount() {
      clearTimeout(this.timer);
    }

 close() {
  //  clearTimeout(this.timer);
    this.props.close();
  
   this.setState({finish:false,page:1})
  // this.setState({switcher:true})
   this.setState({timer:0})
   this.setState({propro:{width:'0' + '%'}})
   this.bla = true;
   this.bla2 = false;
   var selfer = this;
                          
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
            console.log('first');
              this.props.cleartaskvmid()
            }
      
       
          if (nextProps.task_info && this.bla2  ) {
            console.log(this.bla2)
            console.log( 'second' );
          this.setState({timer:nextProps.task_info.progress}) // TODO: Egor, why we set Timer to value of progress?
      
          this.setState({task_info:nextProps.task_info});
      
         var self = this;
        this.setState({propro:{width:nextProps.task_info.progress + '%'}})
        this.timer =  setTimeout(function() {self.props.updatestatus(nextProps.task_info.Id)}, 2000);
      
            }


            if (nextProps.task_info && nextProps.task_info.progress == 100) {
              clearTimeout(this.timer);
            //  this.props.EnableBtnRestoreChangeTaskStatus();
                }
            

            if (this.bla) {
                console.log( 'third condtition' );
                var selfer = this;
                selfer.props.cleartask_info();
                this.bla = false;
               // this.bla2 = false;
              
              }
      
      }


          

        firsttab() {
            
                  let duration = '';
                  let processingRateBytesPerSecond = '';
            
                  if(this.state.task_info != undefined)
                  {
                    duration = this.state.task_info.duration;
            
                    if(this.state.task_info.statistic != undefined)
                    {
                      processingRateBytesPerSecond = bytes(this.state.task_info.statistic.processingRate, {unitSeparator: ' ', thousandsSeparator: ' '});
                    }
                  }
            
                  return (
                    <div>
                        <div className="progress-bar-titles">
                          <div className="gt-left">Restore started</div>
                          <div className="gt-right">{this.state.timer} %</div>
                        </div>
                      <div className="progress-bar">
                        <div style={this.state.propro} id="myBar"></div>
                      </div>
            
                      <div className="windows-list">
                      <dl className="floated">
            
                          <dt>Object remaining</dt>
                          <dd className="somefix">1 of 1</dd>
                          <dt>Restore rate</dt>
                          <dd>{processingRateBytesPerSecond}/s</dd>
                          <dt>Time remaining</dt>
                          <dd>N/A</dd>
            
                        </dl>
                  </div>
                    </div>
            
                  )
                }




    


    render(){

        return (
            <div>
            {(this.props.open) ? (<div className="VmVizViz">
            <div className="freeze">
            <div className="pop-up-window unclear">
            <div className="pop-up-header">
                  <div className="gt-left pop-up-h-title">
                    VM restore

                  </div>
                  <div className="gt-right"><a className="close-pop" onClick={this.close.bind(this)}></a></div>

                </div>
                <div className="body-popup3">
                <div className="windows-list">
        <dl className="floated">
            <dt>VM name</dt>
            <dd>ID={this.props.vmid}</dd>
            <dt>Restore type</dt>
            <dd>Restore to the original location</dd>
            <dt>Restore point</dt>
            <dd>35</dd>
            <dt>Initiated by</dt>
            <dd>TestRepo1</dd>
            <dt>Status</dt>
            <dd>C:\Backup\</dd>
            <dt>Start time</dt>
            <dd>Daily at 10:00 PM</dd>
          </dl>
      </div>
      <div className="tabs">
        <Tabs>

          <TabList>
            <Tab>Statistic</Tab>
            <Tab>Reason</Tab>
          </TabList>
          <div className="tabs-con-panel">
          <TabPanel>
            <div>{this.firsttab()}</div>
          </TabPanel>
          <TabPanel>
            <div> {this.state.HANDLETEXT}</div>
          </TabPanel>
          </div>
        </Tabs>

      </div>
                </div>
                <div className="btns-go-back gt-clear">
                <a onClick={this.close.bind(this)} className="go-btn gt-right go-btn-global ">Close</a>
                    <a onClick={this.cancelTask.bind(this)} className="go-btn gt-right go-btn-global mar11px">Cancel restore task</a>
                </div>
            </div>
            </div>
             

    </div>):(null)}
    </div>	
        )
    }
}
const mapDispatchToProps = function(dispatch) {

    return {

        cleartaskvmid: (id) => dispatch(cleartaskvmid(id)),
        updatestatus: (id) => dispatch(updatestatus(id)),
        cleartask_info: () => dispatch(cleartask_info()),

    }
}

function mapStateToProps(state) {


    return {
        taskid:state.toJS().BackupReducer.vmidtoupdate,
        task_info:state.toJS().BackupReducer.task_status,
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(VMProgressBar);
