import React, { Component,  PropTypes} from 'react'
import styles from './styles.scss';
import { connect} from 'react-redux';
import { Route, Switch,Link,NavLink,withRouter,  BrowserRouter as Router } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { StartVMTask } from '../../containers/Backup/BackupAction'
import { cleartaskvmid } from '../../containers/Backup/BackupAction'
import { updatestatus } from '../../containers/Backup/BackupAction'
import { cleartask_info } from '../../containers/Backup/BackupAction'
import  SWizardPro from '../SmWizPro/SWizardPro';
import  SWizardAlert from '../SmWizAlert/SWizardAlert';


class Wizard extends Component {
    constructor(props) {
        super(props)
        this.timer

        this.state = {

          page:'1',
          finish:false,
			jjj:true,
          emu:[{name:'sss',size:'10 GB',point:'20 aug 2017' },{name:'vfg',size:'20 GB',point:'45 aug 2017' }]

        }
    }

    componentDidMount() {

      if (this.props.fromlist) {
        this.setState({finish:true}) // сдесь будем сразу по id выполнять запрос на обновление прогрессбара

      }


    }





    pagechange() {
      if (this.state.page == 1) {
        this.setState({page:2})
      }
      if (this.state.page == 2) {
        this.setState({page:3})
      }
      if (this.state.page == 3) {
        this.setState({openAlert:true})
      //  this.setState({page:4})
      }


    }

    pagechangeB() {

      if (this.state.page == 4) {
        this.setState({page:3})
      }
      if (this.state.page == 3) {
        this.setState({page:2})
      }
      if (this.state.page == 2) {
        this.setState({page:1})
      }

    }

    renderPage () {
      if (this.state.page == 1) {
        return (<div>{this.windowsvm()}</div>)
      }
      if (this.state.page == 2) {
        return (<div>{this.windowsvm2()}</div>)
      }
      if (this.state.page == 3) {
        return (<div>{this.windowsvm3()}</div>)
      }
      if (this.state.page == 4) {

       return (<div>{this.windows5()}</div>)
      }

    }

    handleTEXT (event) {
       this.setState({HANDLETEXT: event.target.value});
    }

	 windowsvm3 () {
      return (
	  <div>
		 <div className="zagname">Reason</div>
		  <div className="pagetwoundertxt marnvz">Type in reason for performing this restore operation. This information will be logged in the restore sessions history for later reference.</div>

		  <div className="zagname somevizstep3">Restore reason</div>

		  <textarea value={this.state.HANDLETEXT} onChange={this.handleTEXT.bind(this)} className="someviztextarea" placeholder="Text input"></textarea>



</div>
	  )
		}


		 windowsvm2 () {
      return (
	  <div>
		 <div className="zagname">Restore Mode</div>
		  <div className="pagetwoundertxt marnvz">Specify whether selected VMs should be restored back to the original location, or to a new location or with different settings.</div>

		<div className="somevizcont">
		  <div className="checkboxstyling greenst"><label><input type="checkbox" checked name="dva"/> Restore to the original location</label></div>
	<div className="pagetwoundertxt">Quickly initiate restore of selected VMs to the original location, and with original name and settings. This option minimizes the  chance of user input error.</div>
      </div>
</div>
	  )
		}

    updatefirsttable(item) {
      console.log(item)
      this.setState({emu:item})
    }


 windowsvm () {
      return (
	  <div>
		 <div className="zagname">Virtual Machines</div>
		  <div className="pagetwoundertxt">Select virtual machines to be restore. You can add individual virtual machines from backup list).</div>
	  <div className="iconboxtbsearch gt-clear">
		    <div className="addic disabled">Add</div>
			<div onClick={()=> this.setState({closeWizPRO:true})} className="pointjob">Point</div>
			<div className="removeic vmonwizzzr">Remove</div>
	<div className="searchiccont"><input type="text" placeholder="Search"/><input type="button" className="search-icon-jh" value=""/>
		</div>

		</div>
    <div className="tbls1 clear-gt">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Size</th>
            <th>Restore Point</th>
          </tr>
        </thead>
        <tbody>

              <tr >
                <td>{this.state.emu.id}</td>
                <td>{this.state.emu.last}</td>
                <td>Restore Point</td>
              </tr>


        </tbody>
      </table>
    </div>

      </div>

	  )
		}

    closeWizPRO() {
      this.setState({closeWizPRO:false})
    }

    windows5 () {
      return (
        <div>
          <div className="windows-title">Summary</div>
          <div className="windows-text">
            Please review the restore setting before continuing. The restore process will begin will after you click Finish.
            Navigate to corresponding restore session under history node to monitor the progress
          </div>
          <div className="windows-list">
            <dl className="floated">
                <dt>Proxy</dt>
                <dd>definition for first item in list</dd>
                <dt>Original VM name</dt>
                <dd>{this.props.vmid} </dd>
                <dt>Restore point</dt>
                <dd>35</dd>
                <dt>Target host</dt>
                <dd>TestRepo1</dd>
                <dt>Target resource pool</dt>
                <dd>C:\Backup\</dd>
                <dt>Target VM folder</dt>
                <dd>Daily at 10:00 PM</dd>
                <dt>Target data store</dt>
                <dd>5 restore points</dd>
                <dt>Network mapping</dt>
                <dd>5 restore points</dd>
              </dl>
          </div>
        </div>
      )
    }


    switch (param) {
      if (param == 4) {
      this.setState({openAlert:true})
      }
      else {
        this.setState({page:param})
      }

    }

    gopage4() {
      this.setState({page:4})
    }

    renderBubbles() {
      return (
        <div className="width40px gt-left">
          <a onClick={this.switch.bind(this,1)} className={this.state.page == 1 || this.state.page == 2 || this.state.page == 3 || this.state.page == 4  ? ('bubble bubblegreen') :('bubble')}>1</a>
          <div className={ this.state.page == 2 || this.state.page == 3 || this.state.page == 4 || this.state.page == 5 ? ('line-x bubblegreen') :('line-x')}></div>

          <a onClick={this.switch.bind(this,2)} className={this.state.page == 2 || this.state.page == 3 || this.state.page == 4   ? ('bubble bubblegreen') :('bubble')}>2</a>
          <div className={ this.state.page == 3 || this.state.page == 4 || this.state.page == 5 ? ('line-x bubblegreen') :('line-x')}></div>

          <a onClick={this.switch.bind(this,3)} className={this.state.page == 3 || this.state.page == 4  ? ('bubble bubblegreen') :('bubble')}>3</a>
          <div className={ this.state.page == 4 || this.state.page == 5 ? ('line-x bubblegreen') :('line-x')}></div>

          <a onClick={this.switch.bind(this,4)} className={this.state.page == 4   ? ('bubble bubblegreen') :('bubble')}>4</a>



        </div>
      )
    }

    renderbublenames() {
      return (
        <div className="titles-settings gt-left">

          <div className={this.state.page == 1 || this.state.page == 2 || this.state.page == 3 || this.state.page == 4 || this.state.page == 5 ? (' ') :('greyfixer34')}>Virtual <br/> Machines</div>
          <div className={ this.state.page == 2 || this.state.page == 3 || this.state.page == 4 || this.state.page == 5 ? ('mar69px') :('mar69px greyfixer34')}> Restore <br/> Mode</div>
          <div className={  this.state.page == 3 || this.state.page == 4 || this.state.page == 5 ? ('mar79px') :('mar69px greyfixer34')} >Reason</div>
          <div className={ this.state.page == 4  ? ('mar85px') :('mar85px greyfixer34')} >Summary</div>

        </div>


      )
    }

    add () {
      console.log('addd')
    }

    changewindow () {
      this.setState({finish:true});
      this.setState({switcher:false})

      this.props.StartVMTask(this.props.vmid);

    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.taskid != null) {
        this.props.updatestatus(nextProps.taskid.Id);
        console.log('brbrbrbr');
        this.props.cleartaskvmid()
      }

      if (nextProps.task_info && nextProps.task_info.progress == 100) {
        console.log('ddddd')
        var self = this;
        this.timer =  setTimeout(function() {self.props.cleartask_info()}, 3500);
        this.setState({switcher:true})
      }

      if (nextProps.task_info && !this.state.switcher  ) {

       this.setState({timer:nextProps.task_info.progress}) // TODO: Egor, why we set Timer to value of progress?

       this.setState({task_info:nextProps.task_info});

       var self = this;
        this.setState({propro:{width:nextProps.task_info.progress + '%'}})
        setTimeout(function() {self.props.updatestatus(nextProps.task_info.Id)}, 2000);

      }

    }
    componentDidUpdate () {
      this.props.cleartask_info()
    }

    cancelTask () {
        clearTimeout(this.timer);
        this.props.close();
        this.setState({finish:false,page:1})
        this.setState({switcher:true})
        this.setState({timer:0})
        this.setState({propro:{width:'0' + '%'}})

        var selfer = this;
      setTimeout(function() {selfer.props.cleartask_info()}, 3500);
    }

    close() {
      clearTimeout(this.timer);
      this.props.close();

    }

    renderFinish() {
      return (
        <div>
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
                <dd>{this.state.task_info.startTime}</dd>
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
      )
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


    firsttab() {

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
              <dd>{this.state.task_info.statistic.processingRate} MB/s</dd>
              <dt>Time remaining</dt>
              <dd>00:22:03</dd>

            </dl>
      </div>
        </div>

      )
    }

    closeAlert() {
      this.setState({openAlert:false})
    }



    render(){
      console.log(this.props.vmid)

        return (
          <div className="VmVizViz">
            {this.props.open ?
              (

                <div className="freeze">
                  <div className="pop-up-window">
                    <div className="pop-up-header">
                      <div className="gt-left pop-up-h-title">
                        {this.state.finish ? ('VM restore'): ('Full VM Restore Wizard') }

                      </div>
                      <div className="gt-right"><a className="close-pop" onClick={this.close.bind(this)}></a></div>

                    </div>
                    <div className={this.state.finish ? ('body-popup3 gt-clear') : ('body-popup2 gt-clear')}>
                      {this.state.finish ? (<div>{this.renderFinish()}</div>) :(
                        <div>
                        <div className="pagination-buble gt-left">
                        {this.renderBubbles()}
                        {this.renderbublenames()}

                        </div>
                        <div className="view-change gt-left">
                          {this.renderPage()}
                        </div>
                        </div>

                    )}


                    </div>
                    <div className="btns-go-back gt-clear">
                      {this.state.finish ? (<div>
                        <a onClick={this.close.bind(this)} className="go-btn gt-right go-btn-global ">Close</a>
                        <a onClick={this.cancelTask.bind(this)} className="go-btn gt-right go-btn-global mar11px">Cancel restore task</a>


                      </div>) : (

                        <div>
                          {this.state.page == 4 ?
                            (
                              <div>
                                <a onClick={this.close.bind(this)} className="go-btn gt-right go-btn-global">Cancel</a>
                                 <a onClick={this.changewindow.bind(this)} className="go-btn gt-right go-btn-global mar11px">Finish</a>

                              </div>

                            )
                             :
                             (<a onClick={this.pagechange.bind(this)} className="go-btn gt-right go-btn-global">Next</a>)
                           }
                         {this.state.page == 1 ? (null)
                            :
                             (<a onClick={this.pagechangeB.bind(this)} className="back-btn gt-right go-btn-global">Previous</a>
                           )}
                        </div>

                      )}



                    </div>
                  </div>
                </div>

              ):
              (null)}
              <SWizardPro array={this.updatefirsttable.bind(this)} open={this.state.closeWizPRO} close={this.closeWizPRO.bind(this)} selectedVmId={this.props.vmid}/>
              <SWizardAlert gopage4={this.gopage4.bind(this)} nameto={this.state.emu.id} open={this.state.openAlert} close={this.closeAlert.bind(this)}/>
              </div>

        )
    }
}
const mapDispatchToProps = function(dispatch) {

    return {

      StartVMTask: (id) => dispatch(StartVMTask(id)),
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
export default connect(mapStateToProps, mapDispatchToProps)(Wizard);
