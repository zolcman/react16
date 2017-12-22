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
import  RenameVMWiz from '../RenameVMWiz/RenameVMWiz';
import  SelectContainerWiz2 from '../SelectContainerWiz2/SelectContainerWiz2';
import  SWizardAlert2 from '../SmWizAlert2/SWizardAlert2';
import { TreeFlat } from '../../containers/Backup/BackupAction';

var bytes = require('bytes');

class Wizard extends Component {
    constructor(props) {
        super(props)
        this.timer

        this.state = {
          checkOriginalLocaiton:true, //change to true
          checkNewLocaiton:false,// change to false
          page:'1', 
          finish:false,
      jjj:true,
      selectedOnFourthStage:true, // change to false if need block 4 step
      disableAddbtn:true, 
      disableRecoveryBtn:true,
      BlockBubble:true, 
   //   tableWithDiff:true,
      
          emu:[],
          ObjFromFirstSreen: {},

          nodes:[
            {
            label:"cl-1",
            value:"cl-1",
            restorePoint:"25/10/2017 10:00:29 PM",
            vmcount:"2",
            restorePointsCount:"",
            children:[
              {label:"disk111111111111111",
              value:"disk1",
             restorePoint:"3 days ago",
              vmcount:"",
             restorePointsCount:"11",
           },
           {label:"disk22222222222222",
           value:"disk2",
           name:"jobname2",
           restorePoint:"4 days ago",
            vmcount:"",
            restorePointsCount:"11"},
            {label:"disk555",
            value:"disk552",
            name:"jobnam555e2",
            restorePoint:"4 days ago",
            vmcount:"",
            restorePointsCount:"11"}
          ]
        }
          ,

          {
            label:"cl-12",
            value:"cl-12",
            restorePoint:"25/10/2017 10:00:29 PM",
            vmcount:"22",
            restorePointsCount:"",
            children:[
            {label:"disk111111111111111",
              value:"egorka",
              restorePoint:"2 days ago",
              vmcount:"",
              restorePointsCount:"12",
            },
            {label:"disk22222222222222",
            value:"oleg",
            name:"jobname2",
            restorePoint:"restorepoint4",
           vmcount:"",
            restorePointsCount:"12",}
          ]
        },

         
          ],



        }
    }

    componentDidMount() {
      this.props.TreeFlat('test1')

      if (this.props.fromlist) {
        this.setState({finish:true}) // сдесь будем сразу по id выполнять запрос на обновление прогрессбара

      }


    }




CloseNotitficationRename(val) {
  if (val) {
    this.setState({OpenNotitficationRename:false});
    if (this.state.selectedOnFourthStage) {
      this.setState({page:this.state.pageDop,disableAddbtn:false});
      console.log(this.state.pageDop)
    }
    if (!this.state.selectedOnFourthStage) {
      this.setState({page:4,disableAddbtn:true});
      console.log(this.state.pageDop)
    }
    else {
      return
    }
    
  }

  if (!val) {
    this.setState({OpenNotitficationRename:false});
    this.setState({page:3});
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
        if (!this.state.checkNewLocaiton) {
          this.setState({openAlert:true})
          console.log('ssss')
        }
        else {
          this.runAlert(4);
         // this.setState({page:4})
        }
        
      //  this.setState({page:4})
      }

      if (this.state.page == 4) {
        this.setState({page:5})
      }
      if (this.state.page == 5) {
       
       this.setState({openAlert:true})
      }


    }


    runAlertDeleted() {
      
      let emulatedArr = this.props.tree_flat;
      let diffValue = this.state.renamedName || this.state.ObjFromFirstSreen.VmName;
      let finalValue = emulatedArr.filter(function(item) {
        return item.name == diffValue;
      });

      if (finalValue.length > 0) {
        this.setState({openAlert:true})
      }
      if (finalValue.length == 0) {
        this.gopage4()
      }

    }

    pagechangeB() {
      if (this.state.page == 6) {
        this.setState({page:5})
      }
      if (this.state.page == 5) {
        this.setState({page:4})
      }

      if (this.state.page == 4) {
        this.setState({page:3,disableAddbtn:false})
      }
      if (this.state.page == 3) {
        this.setState({page:2,disableAddbtn:false})
      }
      if (this.state.page == 2) {
        this.setState({page:1,disableAddbtn:false})
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
        if (!this.state.checkNewLocaiton) {
          return (<div>{this.windowsvm3()}</div>)
        }
        else {
          return (<div>{this.windowsvm31()}</div>)
        }
       
      }
      if (this.state.page == 4) {

        if  (!this.state.checkNewLocaiton) {
          return (<div>{this.windows5()}</div>)
         }
         else {
          return (<div>{this.windowsvm41()}</div>)
         }

      
      }

      if (this.state.page == 5) {
        return (<div>{this.windowsvm3()}</div>)
      }

      if (this.state.page == 6) {
        return (<div>{this.windows5()}</div>)
      }

    }

    handleTEXT (event) {
       this.setState({HANDLETEXT: event.target.value});
    }

    closeRename() {
      this.setState({closeRename:false})
    }

    selectNameFor31popUp(selectedVM) {
      this.setState({selectedVMFor31PopUp:selectedVM})
      $('.trtr').addClass('selected-green')
    }

    updateRenamed(val) {
      this.setState({renamedName:val})
    }
   
    runAlert(param) {
      this.setState({pageDop:param})
      let emulatedArr = this.props.tree_flat;
   //   console.log(emulatedArr)
      let diffValue = this.state.renamedName || this.state.ObjFromFirstSreen.VmName;
      let finalValue = emulatedArr.filter(function(item) {
        return item.name == diffValue;
      });

      if (finalValue.length > 0) {
        this.setState({OpenNotitficationRename:true});
        this.setState({tableWithDiff:finalValue})
      }
      if (finalValue.length == 0 && this.selectedOnFourthStage) {
        this.setState({page:4});
      }

   //  if (finalValue.length == 0 && !this.selectedOnFourthStage) {
   //     this.setState({page:param});
  //    }

    }


    renameOpen() {
      if (!this.state.selectedVMFor31PopUp) {
        alert('Please choose VM')
        return;
      }
      else {
        this.setState({closeRename:true})
      }
    }

    windowsvm31() {
      return (
        <div>
          <div className="zagname">Restore Mode</div>
          <div className="pagetwoundertxt marnvz">Specify virtual machine name</div>
          <a onClick={this.renameOpen.bind(this)} className="rename-vm-btn">Rename VM</a>
          <div className="tbl1op">
          <div className="tbls1 clear-gt">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>New Name</th>
            
          </tr>
        </thead>
        <tbody>

              <tr className="trtr" onClick={this.selectNameFor31popUp.bind(this,this.state.ObjFromFirstSreen.VmName)} >
                <td>{this.state.ObjFromFirstSreen.VmName}</td>
                <td>{this.state.renamedName ? (this.state.renamedName):(this.state.ObjFromFirstSreen.VmName)}</td>
                
              </tr>
              


        </tbody>
      </table>
    </div>
          </div>
          
        </div>
      )
    }


    hideOrShow(value,checked) {
      
          
      return; // delete when we want this open
          
      
          if (this.state.filteredItems) {
      
            let  positiveArr112 = this.state.filteredItems.map(function(item) {
              return ( (item.value == value) ? ( (checked == true) ?
               ({...item,'expand':false})
               :({...item,'expand':true})
         
              )
               : ({...item,'expand':item.expand})
             );
           });
            this.setState({filteredItems:positiveArr112})
          }
          if (!this.state.filteredItems) {
      
            let  positiveArr112 = this.state.nodes.map(function(item) {
              return ( (item.value == value) ? ( (checked == true) ?
               ({...item,'expand':false})
               :({...item,'expand':true})
         
              )
               : ({...item,'expand':item.expand})
             );
           });
            
      
            this.setState({nodes:positiveArr112})
          }
          }


          filter(e) {
            var value = e.target.value;
          
            this.setState({filterval: value})
            this.setState({
              filteredItems: !value
                ? false
                : this.state.nodes.map(item => ({
                  ...item,
                  children: item.children
                  .filter(child => child.label.toLowerCase().indexOf(value.toLowerCase()) !== -1)
                }))
                .filter(item => item.children.length > 0)
            })
          }

          saveId(val,key,indexer,label) {

            return; // delete when we want this open
            
                if(this.state.checkedId===key){
                  this.setState({
                     checkedId: '',
                     indexer:'',
                     selectedOnFourthStage:true, //change to false if need block
                     disableAddbtn:true,
                     labelFor3step:''
                    });
                  }else{
                  this.setState({
                     checkedId: key,
                     indexer:indexer,
                     selectedOnFourthStage:true,
                     disableAddbtn:false,
                     labelFor3step:label
                    });
                  }
          }

          selectContainer2() {
            this.setState({selectContainer2:false})
          }

    windowsvm41() {

      let loopArray =this.state.filteredItems || this.state.nodes ||  [];
      return (
        <div>

<div>
		<div className="zagname">Select container</div>
		<div className="font13px">By default, original container and disk type are used for each VM file.This can be changed by selecting desired VM file, and selecting "
      Container"
      or "Disk types" buttons
    </div>
        <div className="iconboxtbsearch gt-clear">
			<div className="gt-left window1line3 lp-5">File location:</div>
			<div className="searchiccont">
				<input value={this.state.filterval} onChange={this.filter.bind(this)} placeholder="Search" type="text"/><input type="button" className="search-icon-jh"/>
			</div>
		</div>
        <div className="consteptwo">
        <table className="standart-table">
        <thead>
          <tr>
            <th>File</th>
            <th>Size</th>
            <th>Container</th>
            <th>Disk type</th>
          </tr>
        </thead>
        
      </table>
      <div className="looper">
          
          {loopArray.map((item,indexer) => (
            <div key={indexer} className="loop-lvl1 gt-clear">
                   <div className={(item.expand) ? ('hider minus'):('hider plus')} onClick={this.hideOrShow.bind(this,item.value,item.expand)}>
                    <div className="col-4 back_upicon">{item.label}</div>
                    <div className="col-4">{item.restorePoint}</div>
                    <div className="col-4">{item.vmcount}</div>
                    <div className="col-4">{item.restorePointsCount}</div>
                   
                   </div>
                  {
                     (item.expand) ?
                      (<div className="loop-lvl2 ">
                   {item.children.map((child,index) => (

      <div key={index} onClick={this.saveId.bind(this,child.value,index,indexer,child.label)} className={`${this.state.checkedId===index && this.state.indexer===indexer ? 
                        
                        'selected-green gt-clear childtable text-alignCenter': 'gt-clear childtable text-alignCenter'}`}>
                        <div className="gt-left cliptext vm-icon col-4">{child.label}</div>
                        <div className="gt-left col-4">{child.restorePoint}</div>
                        <div className="gt-left col-4">{child.vmcount}</div>
                        <div className="gt-left col-4">{child.restorePointsCount}</div>
                      </div>

                      ))}
                   </div>)
                   :
                   (null)
                   }
                   
            </div>
            ))}
          
      </div>

        </div>
        <div className="gt-clear martop20px">
        <div className="gt-right"><a  className=" btns-browser-change">Disk type..</a></div>
          <div className="gt-right marr12px"> <a onClick={()=> {this.setState({selectContainer2:true})}} className=" btns-browser-change ">Container..</a></div>
          
         
            
        </div>
	</div>

        </div>
      )
    }

	 windowsvm3 () {
      return (
	  <div>
		 <div className="zagname">Reason</div>
		  <div className="pagetwoundertxt marnvz">Enter the reason for performing this restore operation. This information will be logged in the restore sessions history for later reference.</div>

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
		  <div className="checkboxstyling greenst"><label><input type="checkbox" onChange={this.changeLocaiton.bind(this,1)} checked={this.state.checkOriginalLocaiton} name="dva"/> Restore to the original location</label></div>
	<div className="pagetwoundertxt">Quickly initiate restore of selected VMs to the original location, 
    and with original name and settings. This option minimizes the  chance of user input error.</div>
      </div>
      <div className="somevizcont martop50px">
		  <div className="checkboxstyling greenst"><label><input type="checkbox" onChange={this.changeLocaiton.bind(this,2)} checked={this.state.checkNewLocaiton} name="dva"/> Restore to a new location</label></div>
	<div className="pagetwoundertxt">Customize restore VM location, 
    and change its settings. This wizard will automatically  poplulate all controls with the orginal VM settings as the default settings.</div>
      </div>
</div>
	  )
    }
    
    changeLocaiton (location) {
      if( location == 1) {
        this.setState({checkOriginalLocaiton:true})
        this.setState({checkNewLocaiton:false})
      }
      if( location == 2) {
        this.setState({checkOriginalLocaiton:false})
        this.setState({checkNewLocaiton:true})
      }
      
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
  
        
  
    //    console.log(arrayVmsToFilter[0])
  
  
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

      

      if (Object.keys(this.state.ObjFromFirstSreen).length == 0) {
        return
      }

      if(this.state.BlockBubble) {
        this.setState({page:1})
      }
      if (param == 1 || param == 2 || param == 3) {
        this.setState ({ disableAddbtn:false})
        this.setState({page:param})
      }
      else {
        if (param == 4 && !this.state.checkNewLocaiton) {
          this.setState({openAlert:true})
          }

          if ((param == 4 || param == 5 || param == 6) && this.state.checkNewLocaiton && !this.state.selectedOnFourthStage  && (this.state.page == 3 || this.state.page == 2 || this.state.page == 1)) {
            
            if (param == 4) {
              this.setState({disableAddbtn:true})
              this.runAlert(param);
              console.log('30')
            }
            console.log('31')
             return; // test future delete this if go 4 page every time
             }


          if ((param == 4 || param == 5 || param == 6) && this.state.checkNewLocaiton  && (this.state.page == 3 || this.state.page == 2 || this.state.page == 1)) {
            this.runAlert(param);
            console.log('4')
            return;
            }
            
          if ((param == 6 && this.state.checkNewLocaiton) && this.state.selectedOnFourthStage) {
            this.setState({openAlert:true})
            console.log('5')
            }
            if ((param == 5 || param == 6) && !this.state.selectedOnFourthStage) {
              console.log('6')
              return;
            }
            if ((param == 5 || param == 6) && this.state.selectedOnFourthStage) {
              this.setState({page:param})
              console.log('56')
            }
      
          else {
            this.setState({page:param})
            console.log('else')
          }
      }
      

    }



    componentWillReceiveProps(nextProps) {
      if (nextProps.vmid ) {
        
        let Id = nextProps.vmid
        let arrayVmsToFilter = nextProps.vmsList || [];
        console.log(Id);
        if (Object.keys(nextProps.vmid).length != 0) {
         
          arrayVmsToFilter = arrayVmsToFilter.filter(function(item) {
            return ( item.Id == Id )
            });
  
         console.log(arrayVmsToFilter)
  
            const ObjConsturctor = {
              VmName:arrayVmsToFilter[0].name,
              vmUid:arrayVmsToFilter[0].Id,
              size:arrayVmsToFilter[0].sizeInGb,
              point:(nextProps.pointinfo) ? (nextProps.pointinfo.point):("Last Recovery Point"),
              recoveryPointUid:(nextProps.pointinfo) ? (nextProps.pointinfo.recoveryPointUid):(""),
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
		  <div className="pagetwoundertxt">Select virtual machines to be restored.Individual virtual machines can be added from the backup list.</div>
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
            <th className="textAlignLeft">Name</th>
            <th>Size</th>
            <th className="width30">Point</th>
          </tr>
        </thead>
        <tbody>

              <tr >
                <td className="textAlignLeft" >{this.state.ObjFromFirstSreen.VmName}</td>
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
           Please review the restore setting before continuing. The restore process will begin by selecting Finish.
            Progress can be monitored by selecting the restore session under history
          </div>
          <div className="windows-lister">
          <table>
              <thead>
                <tr>
                  <th>Original VM name</th>
                  <th>{this.state.ObjFromFirstSreen.VmName}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>New VM name</td>
                  <td>{this.state.renamedName ? (this.state.renamedName):(this.state.ObjFromFirstSreen.VmName)}</td>
                </tr>
                <tr>
                  <td>Restore point</td>
                  <td>{this.state.ObjFromFirstSreen.point}</td>
                </tr>

              </tbody>
              </table>
            
          </div>
        </div>
      )
    }


    

    gopage4() {
      if (!this.state.checkNewLocaiton) {
        this.setState({page:4})
      }
      if (this.state.checkNewLocaiton) {
        this.setState({page:6})
      }
      
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

    renderBubbles2() {
      return (
        <div className="width40px gt-left">
          
          <a onClick={this.switch.bind(this,1)} className={this.state.page == 1 || this.state.page == 2 || this.state.page == 3 || this.state.page == 4 || this.state.page == 5 || this.state.page == 6 ? ('bubble bubblegreen') :('bubble')}>1</a>
         
          <div className={ this.state.page == 2 || this.state.page == 3 || this.state.page == 4 || this.state.page == 5 || this.state.page == 6  ? ('line-x bubblegreen') :('line-x')}></div>

          <a onClick={this.switch.bind(this,2)} className={this.state.page == 2 || this.state.page == 3 || this.state.page == 4 || this.state.page == 5 || this.state.page == 6  ? ('bubble bubblegreen') :('bubble')}>2</a>
         
          <div className={ this.state.page == 3 || this.state.page == 4 || this.state.page == 5 || this.state.page == 6  ? ('line-x bubblegreen') :('line-x')}></div>

          

          <a onClick={this.switch.bind(this,3)} className={this.state.page == 3 || this.state.page == 4 || this.state.page == 5 || this.state.page == 6  ? ('bubble bubblegreen') :('bubble')}>3</a>

          <div className={ this.state.page == 4 || this.state.page == 5 || this.state.page == 6  ? ('line-x bubblegreen') :('line-x')}></div>

          <a onClick={this.switch.bind(this,4)} className={this.state.page == 4 || this.state.page == 5 || this.state.page == 6  ? ('bubble bubblegreen') :('bubble')}>4</a>

          <div className={  this.state.page == 5 || this.state.page == 6 ? ('line-x bubblegreen') :('line-x')}></div>

          <a onClick={this.switch.bind(this,5)} className={this.state.page == 5 || this.state.page == 6 ? ('bubble bubblegreen') :('bubble')}>5</a>

          <div className={  this.state.page == 6 ? ('line-x bubblegreen') :('line-x')}></div>

          <a onClick={this.switch.bind(this,6)} className={this.state.page == 6  ? ('bubble bubblegreen') :('bubble')}>6</a>
        </div>
      )
    }

    renderbublenames() {
      return (
        <div className="titles-settings gt-left">

          <div className={this.state.page == 1 || this.state.page == 2 || this.state.page == 3 || this.state.page == 4 || this.state.page == 5 ? (' ') :('greyfixer34')}>Virtual <br/> Machines</div>
          <div className={ this.state.page == 2 || this.state.page == 3 || this.state.page == 4 || this.state.page == 5 ? ('mar69px') :('mar69px greyfixer34')}> Restore <br/> Mode</div>
          <div className={  this.state.page == 3 || this.state.page == 4 || this.state.page == 5 ? ('martop78') :('martop78 greyfixer34')} >Reason</div>
          <div className={ this.state.page == 4  ? ('martop78') :('martop78 greyfixer34')} >Summary</div>

        </div>


      )
    }

    renderbublenames2() {
      return (
        <div className="titles-settings gt-left">

          <div className={this.state.page == 1 || this.state.page == 2 || this.state.page == 3 || this.state.page == 4 || this.state.page == 5 ||  this.state.page == 6 ? (' ') :('greyfixer34')}>Virtual <br/> Machines</div>
          <div className={ this.state.page == 2 || this.state.page == 3 || this.state.page == 4 || this.state.page == 5 ||  this.state.page == 6 ? ('mar69px') :('mar69px greyfixer34')}> Restore <br/> Mode</div>
          <div className={  this.state.page == 3 || this.state.page == 4 || this.state.page == 5 ||  this.state.page == 6 ? ('martop78') :('martop78 greyfixer34')} >VM name</div>
          <div className={ this.state.page == 4 || this.state.page == 5 || this.state.page == 6 ? ('martop76') :('martop76 greyfixer34')} >Select <br/> Container</div>
          <div className={  this.state.page == 5 || this.state.page == 6 ? ('martop78') :('martop78 greyfixer34')} >Reason</div>
          <div className={ this.state.page == 6  ? ('martop78') :('martop78 greyfixer34')} >Summary</div>

        </div>


      )
    }

    add () {
      console.log('addd')
    }

    changewindow () {

     // this.setState({finish:false});
      this.setState({switcher:false})
     
      let location = ''

     if (this.state.checkOriginalLocaiton) {
          location = 'RestoreVmFromLastPoint'
     }
     if (!this.state.checkOriginalLocaiton) {
      location = 'RestoreVmAsNewFromPoint'
      }
      if (this.state.ObjFromFirstSreen.recoveryPointUid !== '' ) {
        location = 'RestoreVmFromPoint'
      }

     let ObjFromFirstSreen = Object.assign({}, this.state.ObjFromFirstSreen);    //creating copy of object
     ObjFromFirstSreen.restoreMode = location;
     ObjFromFirstSreen.newName = this.state.renamedName || this.state.ObjFromFirstSreen.VmName;                       
     this.setState({ObjFromFirstSreen});

     console.log(ObjFromFirstSreen);

      this.props.StartVMTask(ObjFromFirstSreen);
      this.setState({page:1});
      this.setState({disableAddbtn:true,disableRecoveryBtn:true,ObjFromFirstSreen:{},BlockBubble:true,page:1, checkOriginalLocaiton:true, 
        checkNewLocaiton:false,checkedId: '',  indexer:'',
        selectedOnFourthStage:true}); // change to false selectedOnFourthStage if need block 4 step
        
      this.props.openVMProgressBar();
      this.props.close();
     // this.props.openVMProgressBar();

    }

    
    close() {
      this.setState({disableAddbtn:true,disableRecoveryBtn:true,ObjFromFirstSreen:{},BlockBubble:true,page:1, checkOriginalLocaiton:true, checkedId: '',
      indexer:'',  selectedOnFourthStage:true,  checkNewLocaiton:false}) // change to selectedOnFourthStage false if need block 4 step
      this.props.close();

    }



    closeAlert() {
      this.setState({openAlert:false})
    }

    renderFinish() {
      return (
        <div></div>
      )
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
                          {this.state.checkNewLocaiton ? (
                            <div>
                            {this.renderBubbles2()}
                           {this.renderbublenames2()}
                       </div>
                          ):(
                            <div>
                                 {this.renderBubbles()}
                                {this.renderbublenames()}
                            </div>
                          )}
                         

                        </div>
                        <div className="view-change gt-left">
                          {this.renderPage()}
                        </div>
                        </div>

                    )}


                    </div>
                    <div className="btns-go-back gt-clear">
                    <div>
                    {this.state.page == 4 && !this.state.checkNewLocaiton || this.state.page == 6 ?
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
              <RenameVMWiz getName={this.updateRenamed.bind(this)} name={this.state.selectedVMFor31PopUp} close={this.closeRename.bind(this)} open={this.state.closeRename}/>
              <SelectContainerWiz2 open={this.state.selectContainer2} close={this.selectContainer2.bind(this)}  />
              <SWizardAlert2 nameto={this.state.tableWithDiff} open={this.state.OpenNotitficationRename} close={this.CloseNotitficationRename.bind(this)}/>
              </div>

        )
    }
}
const mapDispatchToProps = function(dispatch) {

    return {

      StartVMTask: (param) => dispatch(StartVMTask(param)),
      GetPointList: (id) => dispatch(GetPointList(id)),
      TreeFlat: (id) => dispatch(TreeFlat(id)),
    //  updatestatus: (id) => dispatch(updatestatus(id)),
    //  cleartask_info: () => dispatch(cleartask_info()),

    }
}

function mapStateToProps(state) {


    return {
        vmsList:state.toJS().ProtectedReducer.vms,
        tree_flat:state.toJS().BackupReducer.tree_flat,
   //   taskid:state.toJS().BackupReducer.vmidtoupdate,
    //  task_info:state.toJS().BackupReducer.task_status,

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Wizard);
