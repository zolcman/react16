import React, { Component,  PropTypes} from 'react'
import styles from './styles.scss';
import { connect} from 'react-redux';
import { Route, Switch,Link,NavLink,withRouter,  BrowserRouter as Router } from 'react-router-dom';
import Select from 'react-select';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import SelectVirtualMachineWiz from '../SelectVirtualMachineWiz/SelectVirtualMachineWiz';
import VirtualDiskProperties from '../VirtualDiskProperties/VirtualDiskProperties';
import  { GetPointList } from '../../containers/Protected/ProtectedAction'
import  Clock from '../Clock/Clock';
import { StartVMTask } from '../../containers/Backup/BackupAction'
var bytes = require('bytes');

class DiskRestoreWiz extends Component {
    constructor(props) {
        super(props)

          this.backupForSheduler = {};

        this.state = {

          page:'1',
          openWiz3:false,
          array:[],
          hours: 12,
          minutes: 20,
          enabled: true,
          options:[{label:'Repository 1',value:'Repository 1'},{label:'Repository 2',value:'Repository 2'}],
          restored_disk_types:[{label:'Same as source',value:'Repository 1'},{label:'Repository 2',value:'Repository 2'}],
          
          nodes:[],

          checked5:false,
          checked41:false,
          selected: {},
          filteredItems: false,
          filterval: '',
          block4thstep:true,
          disableAddbtn:true,
          emptyVal: ''
          
        }
    }

    

    componentWillReceiveProps(nextProps) {

     if (nextProps.list && this.state.nodes.length == 0) {
     this.setState({nodes:nextProps.list})
      console.log("received")
     }

     if (nextProps.points) {
       this.setState({points:nextProps.points})
     }

     }



    close() {
      this.props.close();
      this.resetData();
      
    }

    pagechange() {
      if (this.state.page == 1) {
        if (!this.state.selectedOnFirstStage) {
          return
        }
        if (this.state.pointId) {
          this.setState({page:2,disableAddbtn:false})
        }
        if (!this.state.pointId) {
          this.setState({page:2,disableAddbtn:true})
        }
      }
      if (this.state.page == 2) {
        this.setState({page:3,disableAddbtn:true})
      }

      if (this.state.page == 2 && !this.state.block4thstep) {
        this.setState({page:3,disableAddbtn:false})
      }

      if (this.state.page == 3) {
        if (this.state.block4thstep) {
          return
        }
        this.setState({page:4})
      }
      if (this.state.page == 4) {
        this.setState({page:5})
      }

    }

    pagechangeB() {
      if (this.state.page == 5) {
        this.setState({page:4})
      }
      if (this.state.page == 4) {
        this.setState({page:3})
      }
      if (this.state.page == 3 && this.state.pointId) {
        this.setState({page:2,disableAddbtn:false})
      }
      if (this.state.page == 3 && !this.state.pointId) {
        this.setState({page:2,disableAddbtn:true})
      }
      if (this.state.page == 2 && this.state.selectedOnFirstStage) {
        this.setState({page:1,disableAddbtn:false})
      }
      if (this.state.page == 2 && !this.state.selectedOnFirstStage) {
        this.setState({page:1,disableAddbtn:true})
      }

    }

componentDidUpdate() {

 
 // $('.childtable').on('click', function(){
  //  $('.childtable').removeClass('selected-green-for-table');
  //  $(this).addClass('selected-green-for-table')

  
  //  });

 //   $( function() {
  //    $( ".pop-up-window" ).draggable({
   //     cancel: ".close-pop",
    //    handle:'.pop-up-header'
       
   //   });
   // } );

  //  $(".pop-up-window").data({
   //   'originalLeft': $(".pop-up-window").css('left'),
    //  'origionalTop': $(".pop-up-window").css('top')
 // });
  
//  $(".close-pop").click(function() {
    //  $(".pop-up-window").css({
      //    'left': $(".pop-up-window").data('originalLeft'),
      //    'top': $(".pop-up-window").data('origionalTop')
    //  });
 // });

  
    

}

componentDidMount() {

       
      }


	window1(){
    let loopArray =this.state.filteredItems || this.state.nodes ||  [];
	return(
	<div>
		<div className="zagname">Virtual Machine</div>
		<div className="pagetwoundertxt">Select Virtual Machine disk to restore.</div>
        <div className="iconboxtbsearch gt-clear">
			<div className="gt-left window1line3">StarWind plugin WEB sphere(SWMA)_(ABykovskiy)</div>
			<div className="searchiccont">
				<input value={this.state.filterval} onChange={this.filter.bind(this)} placeholder="Search" type="text"/><input type="button" className="search-icon-jh"/>
			</div>
		</div>
        <div className="consteptwo">
        <table className="standart-table">
        <thead>
          <tr>
            <th>Job name</th>
            <th>Last Restore Point</th>
            <th>VM Count</th>
            <th>Restore Points Count</th>
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
                       'selected-green gt-clear childtable text-alignCenter': 'gt-clear childtable text-alignCenter'}`}
                      >
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
	</div>
	)
  }

  saveId(val,key,indexer,label) {

    if(this.state.checkedId===key){
      this.setState({
         checkedId: '',
         indexer:'',
         selectedOnFirstStage:false,
         disableAddbtn:true,
         labelFor3step:''
        });
      }else{
      this.setState({
         checkedId: key,
         indexer:indexer,
         selectedOnFirstStage:true,
         disableAddbtn:false,
         labelFor3step:label
        });
      }
     
    console.log(val);
    //this.setState({selectedOnFirstStage:true})
   // this.setState({disableAddbtn:false})
    
    let resultsplited = val.split(';')
    let backupId = resultsplited[0];
    let vmId = resultsplited[1];
    let idToSend = {vmUid:vmId,policyUid:backupId}
    this.setState({vmUid:vmId})
    console.log(backupId)
    this.props.GetPointList(idToSend)
  }

  hideOrShow(value,checked) {

    
  
    

    if (this.state.filteredItems) {

      let  positiveArr112 = this.state.filteredItems.map(function(item) {
        return ( (item.value == value) ? ( (checked == true) ?
         ({'label':item.label,'value':item.value,'restorePoint':item.restorePoint,'vmcount':item.vmcount,'restorePointsCount':item.restorePointsCount, 'children':item.children,'expand':false})
         :({'label':item.label,'value':item.value,'restorePoint':item.restorePoint,'vmcount':item.vmcount,'restorePointsCount':item.restorePointsCount,'children':item.children,'expand':true})
   
        )
         : ({'label':item.label,'value':item.value,'restorePoint':item.restorePoint,'vmcount':item.vmcount,'restorePointsCount':item.restorePointsCount,'children':item.children,'expand':item.expand})
       );
     });
      this.setState({filteredItems:positiveArr112})
    }
    if (!this.state.filteredItems) {

      let  positiveArr112 = this.state.nodes.map(function(item) {
        return ( (item.value == value) ? ( (checked == true) ?
         ({'label':item.label,'value':item.value,'restorePoint':item.restorePoint,'vmcount':item.vmcount,'restorePointsCount':item.restorePointsCount, 'children':item.children,'expand':false})
         :({'label':item.label,'value':item.value,'restorePoint':item.restorePoint,'vmcount':item.vmcount,'restorePointsCount':item.restorePointsCount,'children':item.children,'expand':true})
   
        )
         : ({'label':item.label,'value':item.value,'restorePoint':item.restorePoint,'vmcount':item.vmcount,'restorePointsCount':item.restorePointsCount,'children':item.children,'expand':item.expand})
       );
     });
      

      this.setState({nodes:positiveArr112})
    }
    }

  filter(e) {
    var value = e.target.value;
  //  if (!value) {
  //    let  positiveArr112 = this.state.nodes.map(function(item) {
    //    return ({'label':item.label,'value':item.value,'restorePoint':item.restorePoint,'vmcount':item.vmcount,'restorePointsCount':item.restorePointsCount,'children':item.children,'expand':false});
    //  });
    //  this.setState({nodes:positiveArr112});
  //  }
    this.setState({filterval: value})
    this.setState({
      filteredItems: !value
        ? false
        : this.state.nodes.map(item => ({
          ...item,
          children: item.children
          .filter(child => child.label.toLowerCase().indexOf(value.toLowerCase()) !== -1)
            
         //   .filter(child => child.label.includes(value.toLowerCase()))

          //  item.name.toLowerCase().indexOf(value.toLowerCase()) !== -1;
        }))
        .filter(item => item.children.length > 0)
    })
  }

	window2(){
    var elemns = this.state.points || []
	return(
    
	<div>
            <div className="zagname">Restore Point</div>
		    <div className="pagetwoundertxt">Select the desired restore point</div>
            <div className="gt-clear martop30px heigth75">
                <div className="gt-left width50">
                    <div className="gt-clear heigth25px">
                        <div className="gt-left width30">VM Name:</div>
                        <div className="gt-left width70 cliptext font600w padding0">StarWind plugin WEB sphere(SWMA)_(ABykovskiy)</div>
                    </div>
                    <div className="gt-clear">
                        <div className="gt-left width30">VM Size:</div>
                        <div className="gt-left font600w">10.0 GB</div>
                    </div>
                </div>
                <div className="gt-right">
                        <div className="gt-left width105">Original host:</div>
                        <div className="gt-left font600w">192.168.0.1</div>
                </div>
            </div>
            <div className="consteptwo">
                 <table>
                    <thead>
                        <tr>
                         <th>Date</th>
                          <th>Type</th>
                          
                         </tr>
                     </thead>
                     <tbody>
                                {elemns.map((item,index) => (
                                    <tr className={`${this.state.checkedIdPoint===index  ?  'selected-green cursorPointer': 'cursorPointer'}`}
                                     onClick={this.selectPoint.bind(this,item.Id,item.disks,index)} key={index}>
                                      <td>{item.date}</td>
                                      <td>{item.type}</td>
                                      
                                      
                                    </tr>

                                ))}
                              </tbody> 
                 </table>
            </div>


	</div>
	)

  }
  
  selectPoint (id,disks,index) {
  
    if(this.state.checkedIdPoint===index){
      this.setState({
        checkedIdPoint: '',
        disks:'',
        pointId:'',
        disableAddbtn:true,
        });
      }else{
      this.setState({
        checkedIdPoint: index,
        disks:disks,
        pointId:id,
        disableAddbtn:false,
        });
      }
      
  //  this.props.getDiskInfo(id);

  }

    chDiskType(val) {
        this.setState({restored_disk_type:val})
    }

   


    QRollBack () {
        if( this.state.QRollBack) {
          this.setState({QRollBack:false})
        }
        if( !this.state.QRollBack) {
          this.setState({QRollBack:true})
        }
      }

    removeElem() {
        var arrDelete = this.state.array;
    
        for (var i = arrDelete.length - 1; i >= 0; i--) {
    
        if(arrDelete[i].checked == true) {
    
            arrDelete.splice(i, 1);

        }
    
        this.setState({array:arrDelete})
    }
    
        if (this.state.bigcheck) {
          this.setState({bigcheck:false})
        }
      }
    
      bigcheck(state) {
        if (state) {
        let  positiveArr112 = this.state.disks.map(function(name) {
           return ({'Id':name.Id,'busType':name.busType,'diskLabel':name.diskLabel,'index':name.index,isCdrom:name.isCdrom,size:name.size,'checked':false} );
        });
        this.setState({disks:positiveArr112,bigcheck:false,block4thstep:true,disableAddbtn:true})
        }
        if (!state) {
        let  positiveArr112 = this.state.disks.map(function(name) {
          return ({'Id':name.Id,'busType':name.busType,'diskLabel':name.diskLabel,'index':name.index,isCdrom:name.isCdrom,size:name.size,'checked':true} );
        });
        this.setState({disks:positiveArr112,bigcheck:true,block4thstep:false,disableAddbtn:false})
        }
        
      }
    
      tblcheck(index,checked) {
      let  positiveArr112 = this.state.disks.map(function(name) {
         return ( (name.Id == index) ? ( (checked == true) ?
         ({'Id':name.Id,'busType':name.busType,'diskLabel':name.diskLabel,'index':name.index,isCdrom:name.isCdrom,size:name.size,'checked':false} )
          :({'Id':name.Id,'busType':name.busType,'diskLabel':name.diskLabel,'index':name.index,isCdrom:name.isCdrom,size:name.size,'checked':true} )
    
         )
          : ({'Id':name.Id,'busType':name.busType,'diskLabel':name.diskLabel,'index':name.index,isCdrom:name.isCdrom,size:name.size,'checked':name.checked} )
        );
      });

     let blocker = positiveArr112.filter(function(item){
        return item.checked == true
      })

      if ( blocker.length == 0) {
        this.setState({block4thstep:true,disableAddbtn:true})
      }
      if ( blocker.length != 0) {
        this.setState({block4thstep:false,disableAddbtn:false})
      }
    
    
      this.setState({disks:positiveArr112})
      }


     
    //  @odata.id :"disk1vm10"
    //   Id:"disk1vm10"
    //  busType:"BUSTYPE1"
    //  diskLabel:"SCSI 0:1"
    //  index:1
    //  isCdrom:false
    //  size:1024000
      

    bytesConvert(item) {
      if (item !== undefined || item !== null) {
        return bytes(item, {unitSeparator: ' ', thousandsSeparator: ' '});
      }
      else {
        return 'N/A';
      }      
    }

	window3(){
        var filer = this.state.disks  || [];
		return(
	<div>
        <div className="zagname">Disk Mapping</div>
		<div className="pagetwoundertxt">Map virtual disks from backup to virtual devices on target VM</div>
        <div className="font600w virtualMachineLabel">Virtual Machine</div>
        

            <div className="gt-clear gt-clearnew">
              <div className="gt-left width475px">
              <input value={this.state.labelFor3step} readOnly className=" virtualMachineInput marbtm12px"/>
              <div className="consteptwo heigth270 heigth25fortd">
                 <table>
                    <thead>
                        <tr>
       <th ><input checked={this.state.bigcheck}  onChange={this.bigcheck.bind(this,this.state.bigcheck)} type="checkbox"/></th>  
                          <th>Virtual Device Node</th>
                          <th>Datastore</th>
                          <th>Size</th>
                         </tr>
                     </thead>
                     <tbody>
          {filer.map((item,index) => (
              <tr onClick={this.tblcheck.bind(this,item.Id,item.checked)} key={index}>
                 <td><input checked={item.checked}  value="Submit"   type="checkbox"/>{item.name}</td> 
                <td>{item.diskLabel}</td>
                <td>{item.busType}</td>
                <td>{this.bytesConvert(item.size)}</td>
              </tr>

          ))}
        </tbody>
                 </table>
            </div>
              </div>
              <div className="gt-left marleft15px">
                   <a    className=" btns-browser-change marbtm12px disabled">Browse..</a>
                   {/*<a  onClick={()=> {this.setState({closeWizPRO:true})}}  className=" btns-browser-change marbtm12px disabled">Browse..</a>*/}
            <a  className=" btns-browser-change marbtm12px disabled">Remap disk..</a>
        {/*<a onClick={ ()=> {this.setState({closeWizPRO2:true})}}  className=" btns-browser-change marbtm12px disabled">Remap disk..</a>*/}
            <a className=" btns-browser-change disabled">Exclude</a>

              </div>
            </div>


     {/*  <div className="font600w restored_disk_type_label disabled">Restored Disk type:</div>
        <Select
                      className="repo1sd1 disabled"

                      name="form-field-name"
                      value={this.state.restored_disk_type}
                      options={this.state.restored_disk_types}
                      searchable={false}
                      onChange={this.chDiskType.bind(this)}
        />
		<div className="chwithlbl martop20px disabled">
            <label><input type="checkbox" onChange={this.QRollBack.bind(this)} checked={this.state.QRollBack} name="dva"/> Quick rollback(restore changed blocks only)</label>
        </div> */}

	</div>
	)
	}

  
    handleTEXT (event) {
        this.setState({HANDLETEXT: event.target.value});
     }

	window4(){

		return(
		<div className="window4">
		 <div className="zagname">Reason</div>
		  <div className="pagetwoundertxt marnvz ">
              Type in reason for performing this restore operation.
               This information will be logged in the restore sessions history for later reference.
           </div>

		  <div className="zagname somevizstep3 martop20px">Restore reason</div>

		  <textarea value={this.state.HANDLETEXT} onChange={this.handleTEXT.bind(this)} className="someviztextarea" placeholder="Text input"></textarea>

	    </div>
			)
	}


	window5(){

    let disks = this.state.disks.filter(function(item){
      return item.checked == true;
    })
    console.log(disks)

		return(
		<div>
                <div className="windows-title zagname">Summary</div>
          <div className="windows-list">
            <dl className="floated">
                <dt>Original VM Name:</dt>
                <dd>{this.state.labelFor3step}</dd>
                <dt>Restore point:</dt>
                <dd>{this.state.pointId} </dd>
                <dt>Target VM Name:</dt>
                <dd>{this.state.labelFor3step}</dd>
               
                
                <dt>Disk info:</dt>
                <dd></dd>
             
                <div className="diskArray">
                {disks.map((item,index) => (
                      <table  key={index}>
                        <tbody >
                        <tr >
                          <td>Source Disk:</td>
                          <td>{item.Id}</td>
                        </tr>
                        <tr>
                        <td>Target Disk:</td>
                        <td>-</td>
                      </tr>
                      </tbody>
                      </table>
                    ))}
                </div>
           {/*     <dt className="dtmodificator">Source disk:</dt>
                <dd>[ToDo]</dd>
                <dt className="dtmodificator2">Source container:</dt>
                <dd>[ToDo]</dd>
                <dt className="dtmodificator2">Target disk:</dt>
                <dd>[ToDo]</dd>
                <dt className="dtmodificator2">Target container:</dt>
                <dd>[ToDo]</dd>
                <dt className="dtmodificator2">Provisioning policy:</dt>
                <dd>[ToDo]</dd>
                */}
              </dl>
          </div>
          <div className="gt-clear">
              <div className="gt-left warning-modificator">Warning</div>
              <div className="gt-left">Specified target device will be replaced with source disk.<br/>
              Consider taking a snapshot of target VM to avoid accidental <br/> data loss.
              </div>
          </div>
          <div className="gt-clear">
            <div className="gt-left chwithlbl martop20px disabled">
            
            <label><input type="checkbox"  checked={false} name="dva"/>Power on target VM after restoring</label>
            
            </div>
            <div className="gt-right martop20px marleft18px">
    {/*   <a className=" onltextbtn2">Pick proxy to use</a> */}
            </div>
          </div>
        </div>
		)
	}



    renderPage () {
      if (this.state.page == 1) {
        return (<div className="wizzard1">{this.window1()}</div>)
      }
      if (this.state.page == 2) {
        return (<div className="wizzard1">{this.window2()}</div>)
      }
      if (this.state.page == 3) {
        return (<div className="wizzard1">{this.window3()}</div>)
      }
      if (this.state.page == 4) {
        return (<div className="wizzard1 stage4">{this.window4()}</div>)
      }
      if (this.state.page == 5) {
        return (<div className="wizzard1">{this.window5()}</div>)
      }
    }

    switch (param) {
      if (param == 2 && !this.state.selectedOnFirstStage && param > 2) { 
        console.log('1')
          return
      }
      if (param == 3 && !this.state.pointId) { 
        console.log('2')
        return
    }
    if (param == 4 && this.state.block4thstep) { 
      console.log('3')
      return
  }

    
      else if (!this.state.selectedOnFirstStage && param >= 2 || !this.state.pointId && param >= 3 || this.state.block4thstep && param >= 4)  {
        console.log(param)
        return
        
      } else {
        console.log('else')
        if (param == 2 && this.state.pointId) {
          this.setState({disableAddbtn:false})
          console.log('el222se')
        }
        if (param == 2 && !this.state.pointId) {
          this.setState({disableAddbtn:true})
          console.log('ffff')
        }
        if (param == 3 && this.state.block4thstep) {
          this.setState({disableAddbtn:true})
        }

        if (param == 1 && this.state.selectedOnFirstStage) {
          this.setState({disableAddbtn:false})
        }
        this.setState({page:param})
      }
      
    }

    renderBubbles() {
      return (
        <div className="width40px gt-left">
          <a onClick={this.switch.bind(this,1)} className={this.state.page == 1 || this.state.page == 2 || this.state.page == 3 || this.state.page == 4 || this.state.page == 5  ? ('bubble bubblegreen') :('bubble')}>1</a>
          <div className={ this.state.page == 2 || this.state.page == 3 || this.state.page == 4 || this.state.page == 5 ? ('line-x bubblegreen') :('line-x')}></div>

          <a onClick={this.switch.bind(this,2)} className={this.state.page == 2 || this.state.page == 3 || this.state.page == 4 || this.state.page == 5 ? ('bubble bubblegreen') :('bubble')}>2</a>
          <div className={ this.state.page == 3 || this.state.page == 4 || this.state.page == 5 ? ('line-x bubblegreen') :('line-x')}></div>

          <a onClick={this.switch.bind(this,3)} className={this.state.page == 3 || this.state.page == 4 || this.state.page == 5 ? ('bubble bubblegreen') :('bubble')}>3</a>
          <div className={ this.state.page == 4 || this.state.page == 5 ? ('line-x bubblegreen') :('line-x')}></div>

          <a onClick={this.switch.bind(this,4)} className={this.state.page == 4 || this.state.page == 5 ? ('bubble bubblegreen') :('bubble')}>4</a>
          <div className={ this.state.page == 5 ?  ('line-x bubblegreen') :('line-x')}></div>

          <a onClick={this.switch.bind(this,5)} className={this.state.page == 5 ? ('bubble bubblegreen') :('bubble')}>5</a>

        </div>
      )
    }
    renderbublenames() {
      return (
        <div className="titles-settings gt-left">

          <div className={this.state.page == 1 || this.state.page == 2 || this.state.page == 3 || this.state.page == 4 || this.state.page == 5 ? (' ') :('greyfixer34')}>Virtual <br/> Machine</div>
          <div className={ this.state.page == 2 || this.state.page == 3 || this.state.page == 4 || this.state.page == 5 ? ('mar69px') :('mar69px greyfixer34')}> Restore <br/> Point</div>
          <div className={  this.state.page == 3 || this.state.page == 4 || this.state.page == 5 ? ('mar69px') :('mar69px greyfixer34')} >Disk <br/> Mapping</div>
          <div className={ this.state.page == 4 || this.state.page == 5 ? ('mar69px') :('mar69px greyfixer34')} >Reason <br/> Schedule</div>
          <div className={  this.state.page == 5 ? ('mar56px') :('mar56px greyfixer34')}> <br/> Summary</div>
        </div>
      )
    }

    
    add () {
     let ObjectTosend = {}
     ObjectTosend.restoreMode = 'RestoreVmDisksFromPoint';

      let disks = this.state.disks.filter(function(item){
        return item.checked == true;
      })

     ObjectTosend.disks = disks;
     ObjectTosend.vmUid = this.state.vmUid;
     ObjectTosend.recoveryPointUid = this.state.pointId;
     ObjectTosend.policyUid = '';
     ObjectTosend.newName = '';

      console.log(ObjectTosend);
     this.props.StartVMTask(ObjectTosend);
     this.setState({page:1});
     this.setState({disableAddbtn:true});
     this.props.openVMProgressBar();
     this.resetData();
     this.props.close();

    }


    updateJob() {
      
    }

    resetData() {
      this.setState({page:1})
      this.setState({checked41:false,nameToServer:'',DescToServer:'',filteredItems:false,array:[]})
      this.setState({nodes:[],points:[]})
      this.setState({selectedOnFirstStage:false})
      this.setState({disableAddbtn:true,checkedId:false,checkedIdPoint: '', disks:'',pointId:'',})

      
     
      
      
    }

    
    closeWizPRO() {
      this.setState({closeWizPRO:false})
    }

    closeWizPRO2() {
      this.setState({closeWizPRO2:false})
    }


    updatefirsttable2() {

    }



    render(){

      console.log(this.state.filteredItems)

        return (
          <div className="diskRestoreWizard">
            {this.props.open ?
              (
                <div className="freeze">
                  <div className="pop-up-window">
                    <div className="pop-up-header">
                      <div className="gt-left pop-up-h-title">Virtual Disk Restore Wizard</div>
                      <div className="gt-right"><a className="close-pop" onClick={this.close.bind(this)}></a></div>

                    </div>
                    <div className="body-popup gt-clear">
                    <div className="pagination-buble gt-left">
                      {this.renderBubbles()}
                      {this.renderbublenames()}

                    </div>
                    <div className="view-change gt-left">
                      {this.renderPage()}
                    </div>
                    </div>
                    <div className="btns-go-back gt-clear">
                       {this.state.page == 5 ?
                        ( <a onClick={this.add.bind(this)} className="go-btn gt-right go-btn-global">Finish</a>) 
                       :
                        (this.state.disableAddbtn ? (<a  className="go-btn gt-right go-btn-global disabled">Next</a>)
                       :
                       (<a onClick={this.pagechange.bind(this)} className="go-btn gt-right go-btn-global">Next</a>))}
                      {this.state.page == 1 ? (null) : (<a onClick={this.pagechangeB.bind(this)} className="back-btn gt-right go-btn-global">Previous</a>)}


                    </div>
                  </div>
                </div>

              ):
              (null)}
              <SelectVirtualMachineWiz array={this.updatefirsttable2.bind(this)} open={this.state.closeWizPRO} close={this.closeWizPRO.bind(this)}/>
              <VirtualDiskProperties array={this.updatefirsttable2.bind(this)} open={this.state.closeWizPRO2} close={this.closeWizPRO2.bind(this)}/>
              </div>

        )
    }
}
const mapDispatchToProps = function(dispatch) {

    return {

     
      GetPointList: (id) => dispatch(GetPointList(id)),
      StartVMTask: (param) => dispatch(StartVMTask(param)),  

    }
}

function mapStateToProps(state) {


    return {
      list:state.toJS().ProtectedReducer.listAddBtnWmsWizard,
      points:state.toJS().ProtectedReducer.points,
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DiskRestoreWiz);
