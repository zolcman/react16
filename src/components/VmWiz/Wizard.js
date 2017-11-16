import React, { Component,  PropTypes} from 'react'
import styles from './styles.scss';
import { connect} from 'react-redux';
import { Route, Switch,Link,NavLink,withRouter,  BrowserRouter as Router } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { StartVMTask } from '../../containers/Backup/BackupAction'
import  { GetPointList } from '../../containers/Protected/ProtectedAction'
import  SWizardPro from '../SmWizPro/SWizardPro';
import  SWizardAlert from '../SmWizAlert/SWizardAlert';
import  AddBtnWmWizard from '../AddBtnWmWizard/AddBtnWmWizard';


var bytes = require('bytes');

class Wizard extends Component {
    constructor(props) {
        super(props)
        this.timer

        this.state = {

          page:'1',
          finish:false,
      jjj:true,
      disableAddbtn:true,
      disableRecoveryBtn:true,
      BlockBubble:true,
          emu:[],
          ObjFromFirstSreen: {},

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
      
      if (item.length > 0) {
        this.setState({disableAddbtn:false,disableRecoveryBtn:false})
        let splitter = item[0];
        let resultsplited = splitter.split(';')
        let backupId = resultsplited[0];
        let vmId = resultsplited[1];
  
        let arrayVmsToFilter = this.props.vmsList;
  
        arrayVmsToFilter = arrayVmsToFilter.filter(function(item) {
          return ( item.Id == vmId )
          });
        
          const ObjConsturctor = {
            VmName:arrayVmsToFilter[0].name,
            vmUid:vmId,
            size:arrayVmsToFilter[0].sizeInGb,
            point:"Last Recovery Point",
            recoveryPointUid:"",
            policyUid:backupId
          }
  
        
  
        console.log(arrayVmsToFilter[0])
  
  
        this.setState({ObjFromFirstSreen:ObjConsturctor}) 
        this.setState({BlockBubble:false})

      }
      if (item.length == 0) {
        this.setState({disableAddbtn:true,disableRecoveryBtn:true,ObjFromFirstSreen:{},BlockBubble:true})
      }
      
    }


    updatefirsttable2(item) {

      console.log(item);

      const ObjConsturctor = {
        VmName:this.state.ObjFromFirstSreen.VmName,
        vmUid:this.state.ObjFromFirstSreen.vmUid,
        size:item.size,
        point:item.date,
        recoveryPointUid:item.id,
        policyUid:this.state.ObjFromFirstSreen.policyUid
      }
      this.setState({ObjFromFirstSreen:ObjConsturctor})
    }


    switch (param) {
      if(this.state.BlockBubble) {
        this.setState({page:1})
      }
      else {
        if (param == 4) {
          this.setState({openAlert:true})
          }
          else {
            this.setState({page:param})
          }
      }
      

    }



    componentWillReceiveProps(nextProps) {
      if (nextProps.vmid ) {
        
        let Id = nextProps.vmid
        let arrayVmsToFilter = nextProps.vmsList;
        
        if (Object.keys(nextProps.vmid).length != 0) {
         
          arrayVmsToFilter = arrayVmsToFilter.filter(function(item) {
            return ( item.Id == Id )
            });
  
         console.log(arrayVmsToFilter)
  
            const ObjConsturctor = {
              VmName:arrayVmsToFilter[0].name,
              vmUid:arrayVmsToFilter[0].Id,
              size:arrayVmsToFilter[0].sizeInGb,
              point:"Last Recovery Point",
              recoveryPointUid:"",
              policyUid:""
            }  
            this.setState({ObjFromFirstSreen:ObjConsturctor})
            this.setState({disableAddbtn:false,disableRecoveryBtn:false,BlockBubble:false})


         }

         else {
          this.setState({ObjFromFirstSreen:{},disableAddbtn:true,disableRecoveryBtn:true,BlockBubble:true})
         }


         
        
      }
     }

removeTable () {
  this.setState({disableAddbtn:true,disableRecoveryBtn:true,ObjFromFirstSreen:{},BlockBubble:true})
}

pointClick () {
  console.log(this.state.ObjFromFirstSreen)
  this.setState({closeWizPRO:true});
  this.props.GetPointList(this.state.ObjFromFirstSreen)
}

 windowsvm () {
      return (
	  <div>
		 <div className="zagname">Virtual Machines</div>
		  <div className="pagetwoundertxt">Select virtual machines to be restore. You can add individual virtual machines from backup list).</div>
	  <div className="iconboxtbsearch gt-clear">
		    <div onClick={()=> this.setState({closeAddBtnWmWizard:true})}  className="addic">Add</div>
        {
          (this.state.disableRecoveryBtn) ? (<div  className="pointjob disabled">Point</div>)
        :
        (<div onClick={this.pointClick.bind(this)} className="pointjob">Point</div>)
        }

          {
          (Object.keys(this.state.ObjFromFirstSreen).length != 0) ? (<div onClick={this.removeTable.bind(this)} className="removeic vmonwizzzr">Remove</div>)
        :
        (<div  className="removeic vmonwizzzr disabled-remove">Remove</div>)
        }
			
			
	<div className="searchiccont"><input type="text" placeholder="Search"/><input type="button" className="search-icon-jh" value=""/>
		</div>

		</div>
    <div className="tbls1 clear-gt">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Size</th>
            <th className="width30"></th>
          </tr>
        </thead>
        <tbody>

              <tr >
                <td>{this.state.ObjFromFirstSreen.VmName}</td>
                <td>{bytes(this.state.ObjFromFirstSreen.size, {unitSeparator: ' ', thousandsSeparator: ' '})}</td>
                <td>{this.state.ObjFromFirstSreen.point}</td>
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

    closeAddBtnWmWizard() {
      this.setState({closeAddBtnWmWizard:false})
      
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
                <dd>[ToDo]</dd>
                <dt>Original VM name</dt>
                <dd>{this.state.ObjFromFirstSreen.VmName} </dd>
                <dt>Restore point</dt>
                <dd>[ToDo]</dd>
                <dt>Target host</dt>
                <dd>[ToDo]</dd>
                <dt>Target resource pool</dt>
                <dd>[ToDo]</dd>
                <dt>Target VM folder</dt>
                <dd>[ToDo]</dd>
                <dt>Target data store</dt>
                <dd>[ToDo]</dd>
                <dt>Network mapping</dt>
                <dd>[ToDo]</dd>
              </dl>
          </div>
        </div>
      )
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

     // this.setState({finish:false});
      this.setState({switcher:false})
     // console.log(this.state.ObjFromFirstSreen)
      this.props.StartVMTask(this.state.ObjFromFirstSreen);
      this.setState({page:1})
      this.props.openVMProgressBar();
      this.props.close();
     // this.props.openVMProgressBar();

    }

    
    close() {
      this.setState({disableAddbtn:true,disableRecoveryBtn:true,ObjFromFirstSreen:{},BlockBubble:true,page:1})
      this.props.close();

    }



    closeAlert() {
      this.setState({openAlert:false})
    }



    render(){
     // console.log(this.props.vmid);

        return (
          <div className="VmVizViz">
            {this.props.open ?
              (

                <div className="freeze">
                  <div className="pop-up-window unclear">
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
                    <div>
                    {this.state.page == 4 ?
                      (
                        <div>
                          <a onClick={this.close.bind(this)} className="go-btn gt-right go-btn-global">Cancel</a>
                           <a onClick={this.changewindow.bind(this)} className="go-btn gt-right go-btn-global mar11px">Finish</a>

                        </div>

                      )
                       :
                       (<div>
                          {this.state.disableAddbtn ? (<a  className="go-btn gt-right go-btn-global disabled">Next</a>)
                          :
                          (<a onClick={this.pagechange.bind(this)} className="go-btn gt-right go-btn-global">Next</a>)}
                       </div>
                      
                      )
                     }
                   {this.state.page == 1 ? (null)
                      :
                       (<a onClick={this.pagechangeB.bind(this)} className="back-btn gt-right go-btn-global">Previous</a>
                     )}
                  </div>



                    </div>
                  </div>
                </div>

              ):
              (null)}
              <SWizardPro array={this.updatefirsttable2.bind(this)} open={this.state.closeWizPRO} close={this.closeWizPRO.bind(this)} selectedVmId={this.props.vmid}/>
              <AddBtnWmWizard array={this.updatefirsttable.bind(this)} open={this.state.closeAddBtnWmWizard} close={this.closeAddBtnWmWizard.bind(this)}/>
              <SWizardAlert gopage4={this.gopage4.bind(this)} nameto={this.state.ObjFromFirstSreen.VmName} open={this.state.openAlert} close={this.closeAlert.bind(this)}/>
              </div>

        )
    }
}
const mapDispatchToProps = function(dispatch) {

    return {

      StartVMTask: (param) => dispatch(StartVMTask(param)),
      GetPointList: (id) => dispatch(GetPointList(id)),
    //  updatestatus: (id) => dispatch(updatestatus(id)),
    //  cleartask_info: () => dispatch(cleartask_info()),

    }
}

function mapStateToProps(state) {


    return {
        vmsList:state.toJS().ProtectedReducer.vms,
   //   taskid:state.toJS().BackupReducer.vmidtoupdate,
    //  task_info:state.toJS().BackupReducer.task_status,

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Wizard);
