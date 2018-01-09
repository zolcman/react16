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

          blockScroll:false,
          direction:'',
          lastScrollPos:0,


        }
        this.handleScroll = this.handleScroll.bind(this);
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

      convertDate(date) {
        var d = new Date(date);
        let month = d.getMonth()+1  // 10
        let day = d.getDate()     // 30
        let year = d.getFullYear();
        let hours = d.getHours();
        let minutes = d.getMinutes();
        minutes = minutes > 9 ? minutes : '0' + minutes;
        let seconds = d.getSeconds();
        let bestDate = year + '/' + month + '/' + day + ':' + hours + ':' +  minutes + ":" + seconds;
        return bestDate;
      }

      onWheel() {
        
            console.log('ddd');
            }

      handleScroll(event) {
        
              
             
            
            if (Object.keys(this.state.task_info.statistic.eventLog).length > 4) {
             
              if(this.state.lastScrollPos > event.currentTarget.scrollTop) {
                this.setState({
                  direction:'top',
                  lastScrollPos:event.currentTarget.scrollTop,
                  blockScroll:true,
                });
             //   console.log("UNLOCKED")
              } else if(this.state.lastScrollPos < event.currentTarget.scrollTop) {
        
                if ( $('#my_div').scrollTop() +  $('#my_div').innerHeight() >=  $('#my_div')[0].scrollHeight) {
                  this.setState({
                    direction:'bottom',
                    lastScrollPos:event.currentTarget.scrollTop,
                    blockScroll:false,
                  });
              //   console.log("BLOCKED")
                } else {
                  this.setState({
                    direction:'bottom',
                    lastScrollPos:event.currentTarget.scrollTop,
                    blockScroll:true,
                  });
                //  console.log("UNLOCKED")
                }
                
              }
        
           
        }
        
            
           }

      thirdtab() {

        var log =[]

        if (this.state.task_info) {
          
          if(this.state.task_info.statistic.eventLog != undefined) {
           log =  this.state.task_info.statistic.eventLog
  
          }
           
          }


        return (
  <div className="table-content">
  <table className="bk-table log-modificator">
    <thead>
      <tr>
      <th className="ut-1">Time</th>
      <th className="ut-2" >Action</th>
     

      </tr>
    </thead>
    
    <tbody onScroll={this.handleScroll} onWheel ={this.onWheel.bind(this)} id="my_div">


      {log.slice(0).reverse().map((item,index) => (
          <tr className="" key={index}>
          <td className="ut-3">
              {this.convertDate(item.timeStamp)}
        </td>
          <td className="ut-4" >{item.message}</td>



          </tr>

      ))}
    </tbody>
      
  </table>
</div>
    )

       
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
            
                          <dt>Objects remaining</dt>
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
      var name = '', startTime = '', status = '';

      if (this.state.task_info) {
      if (this.state.task_info.name != undefined) {
        name = this.state.task_info.name;
      }

      if (this.state.task_info.startTime != undefined) {
        startTime = this.state.task_info.startTime;
      }

      if (this.state.task_info.status != undefined) {
        status = this.state.task_info.status;
      }
    
    }

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
            <dd className="clip-text">{name}</dd>
            <dt>Restore type</dt>
            <dd>Restore to the original location</dd>
        {/*  <dt>Restore point</dt>
            <dd>ToDo</dd> */}
            <dt>Initiated by</dt>
            <dd>admin</dd>
            <dt>Status</dt>
            <dd>{status}</dd>
            <dt>Start time</dt>
            <dd>{startTime}</dd>
          </dl>
      </div>
      <div className="tabs">
        <Tabs>

          <TabList>
            <Tab>Statistics</Tab>
            <Tab>Reason</Tab>
            <Tab>Log</Tab>
          </TabList>
          <div className="tabs-con-panel">
          <TabPanel>
            <div>{this.firsttab()}</div>
          </TabPanel>
          <TabPanel>
            <div> {this.state.HANDLETEXT}</div>
          </TabPanel>
          <TabPanel>
            <div> {this.thirdtab()}</div>
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
