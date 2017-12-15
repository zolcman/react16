import React, { Component,  PropTypes} from 'react'
import styles from './styles.scss';
import { connect} from 'react-redux';
import { Route, Switch,Link,NavLink,withRouter,  BrowserRouter as Router } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { updatestatus } from '../../containers/Backup/BackupAction'
import { cleartaskid } from '../../containers/Backup/BackupAction'
import { cleartask_info } from '../../containers/Backup/BackupAction'
import { stopTimer } from '../../containers/Backup/BackupAction'
import { GetBackList } from '../../containers/Backup/BackupAction'

var bytes = require('bytes');

class JobWizard extends Component {
    constructor(props) {
        super(props)
        this.timer;
		this.task_info;
        this.bla;
        this.switch2 = true;
        this.state = {

          page:'4',
          finish:false,
          lister:[{time:'9:58',action:'Job Started',duration:'22'},{time:'9:55',action:'Building',duration:'221'}],
          blockScroll:false,
          direction:'',
          lastScrollPos:0
        }

        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount() {

      if (this.props.fromlist) {
        this.setState({finish:true}) // сдесь будем сразу по id выполнять запрос на обновление прогрессбара

      }

      if (this.props.open) {
        console.log('open');
      }

      

      
    }



    close() {
      this.setState({ blockScroll:false,task_info:false})
      clearTimeout(this.timer);
      var selfer = this;
      this.props.close();
      this.setState({bull:true})
      this.bla = true;
      this.bla2 = false;
      
    //  this.setState({turnoff:true})
      this.setState({switcher:true})
      this.setState({timer:'0'})
      this.setState({propro:{width:'0' + '%'}})
    //  this.props.cleartask_info();
    // setTimeout(function() {selfer.props.cleartask_info()}, 3000);
      //this.props.stopTimer();
      this.props.cleartaskid();
      this.props.GetBackList();
    }

    componentDidUpdate () {
      this.bla2 = true;
      if (this.state.timer < 100) {
        this.props.cleartask_info();
      }

      

      

      if  (this.state.task_info) {
        
       
          if (!this.state.blockScroll) {
            
            var myDiv = document.getElementById("my_div");
            if (myDiv != undefined && myDiv != null) {
              myDiv.scrollTop = myDiv.scrollHeight + 35;
            }
           
          }
        
      }


    }

    componentWillUnmount() {
      this.setState({task_info:false})
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
//var self = this
//  var lastScrollTop = 0;
    //  $('#my_div').scroll(function(event){
      //   var st = $(this).scrollTop();

      //   if (st > lastScrollTop){

        //  if ($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
         //   self.setState({blockScroll:false})
         //  console.log("BLOCKED")
        //  }
       //  } else {
      //    self.setState({blockScroll:true})
      //    console.log("UNLOCKED")
      //   }
      //   lastScrollTop = st;
     // });
    
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

        var _this = this;

        
        
        

       this.setState({timer:nextProps.task_info.progress}) // Here we can register updated values
	   
     this.setState({task_info:nextProps.task_info}) // Here we register all updated values in 'task_info'
     
     
       
	   var self = this;
        this.setState({propro:{width:nextProps.task_info.progress + '%'}})
         this.timer = setTimeout(function() {self.props.updatestatus(nextProps.task_info.Id)}, 2000);
         //setTimeout(function() {clearTimeout(self.timer);}, 2001);


         if (nextProps.task_info.progress == '100') {
           clearTimeout(this.timer);
           var selfer = this;
          // setTimeout(function() {selfer.props.cleartask_info()}, 3000);
         }
        if (this.bla) {
          console.log( 'third condtition' );
          var selfer = this;
          selfer.props.cleartask_info();
          this.bla = false;
          this.bla2 = true;
        
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


      if (this.props.fromlist) { // TODO: Comments ONLY in English
        this.props.refreshtablelist(); // обновляем страницу если нажали cancel
        this.setState({finish:true,page:4})
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


    render(){
      console.log(this.state.blockScroll)
       var log = []
      let duration = '';
      let processedBytes = '';
      let processingRateBytesPerSecond = '';
      let readBytes = '';
      let transferedBytes = '';
      if (this.state.task_info) {
        var completed = this.state.task_info.statistic.completed;
        var warnings = this.state.task_info.statistic.warnings;
        var bottleneck = this.state.task_info.statistic.bottleneck
        var failed = this.state.task_info.statistic.failed
        if(this.state.task_info.statistic.eventLog != undefined) {
         log =  this.state.task_info.statistic.eventLog

          
         
        }
       
      }


      
          
      
      
     

      if(this.state.task_info != undefined)
      {
        duration = this.state.task_info.duration;

        if(this.state.task_info.statistic != undefined)
        {
          processedBytes = bytes(this.state.task_info.statistic.processed.amount, {unitSeparator: ' ', thousandsSeparator: ' '});
          processingRateBytesPerSecond = bytes(this.state.task_info.statistic.processingRate, {unitSeparator: ' ', thousandsSeparator: ' '});
          readBytes = bytes(this.state.task_info.statistic.read.amount, {unitSeparator: ' ', thousandsSeparator: ' '});
          transferedBytes = bytes(this.state.task_info.statistic.transferred.amount, {unitSeparator: ' ', thousandsSeparator: ' '});
        }
      }

     

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
                              <td>Duration: {duration}</td>
                              <td>Processed: {processedBytes} {/* ({this.state.task_info.statistic.processed.percent}%) */}</td>
               <td>Success:   {completed} </td> 
                            </tr>
                              <tr>
                                <td>Processing rate: {processingRateBytesPerSecond}/s</td>
                                <td>Read: {readBytes}</td>
                                <td>Warnings: {warnings}</td>
                              </tr>
                              <tr>
                                <td>Bottleneck: {bottleneck}</td>
                                <td>Transfered: {transferedBytes}</td>
                                <td>Errors: {failed}</td> 
                              </tr> 

                          </tbody>
                         
                        </table>
                      </div>
                      <div className="lvl-1 martop20">
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
      GetBackList: () => dispatch(GetBackList()),
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
