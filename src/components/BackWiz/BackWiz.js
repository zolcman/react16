import React, { Component,  PropTypes} from 'react'
import styles from './styles.scss';
import { connect} from 'react-redux';
import { Route, Switch,Link,NavLink,withRouter,  BrowserRouter as Router } from 'react-router-dom';
import Select from 'react-select';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import  SWizard from '../SmWiz/SWizard';
import  Clock from '../Clock/Clock';
import { addJobSS } from '../../containers/Backup/BackupAction';
import { TreeFlat } from '../../containers/Backup/BackupAction';
import { GetRepos } from '../../containers/Backup/BackupAction';
import { clearJobEditInfo } from '../../containers/Backup/BackupAction';
import { clearReposInRedux } from '../../containers/Backup/BackupAction';
import { TreeProtected } from '../../containers/Backup/BackupAction';
import { UpdateJob } from '../../containers/Backup/BackupAction';


class BackWiz extends Component {
    constructor(props) {
        super(props)

          this.backupForSheduler = {};
         // this.filtered = [];
        this.state = {

          page:'1',
          openWiz3:false,
          array:[],
          hours: 12,
          minutes: 20,
          enabled: true,
          ProtectedID:null,
          options:[{label:'Repository 1',value:'Repository 1'},{label:'Repository 2',value:'Repository 2'}],
          dailyBasisDaysPresetOptions: [
            {label:'On week days',value:'WeekDays'},
            {label:'EveryDay',value:'EveryDay'},
            {label:'On this days',value:'ThisDays'}
          ],
          dailyBasisThisDaysOptions: [
            {label:'Sunday',value:'Sunday'},
            {label:'Monday',value:'Monday'},
            {label:'Tuesday',value:'Tuesday'},
            {label:'Wednesday',value:'Wednesday'},
            {label:'Thursday',value:'Thursday'},
            {label:'Friday',value:'Friday'},
            {label:'Saturday',value:'Saturday'}
          ],
          MonthlyBasisDaysPresets: [
            {label:'First Week',value:'FirstWeek'},
            {label:'Second Week',value:'SecondWeek'},
            {label:'Third Week',value:'ThirdWeek'},
            {label:'Fourth week',value:'FourthWeek'},
            {label:'Day Of Month',value:'DayOfMonth'},
            {label:'Last Day',value:'LastDay'},
            
          ],
          MonthPreset:[
            {label:'January',value:'January'},
            {label:'February',value:'February'},
            {label:'March',value:'March'},
            {label:'April',value:'April'},
            {label:'May',value:'May'},
            {label:'June',value:'June'},
            {label:'July',value:'July'},
            {label:'August',value:'August'},
            {label:'September',value:'September'},
            {label:'October',value:'October'},
            {label:'November',value:'November'},
            {label:'December',value:'December'},
          ],

          modePreset:[
            {label:'Every Hour',value:'EveryHour'},
            {label:'Every Minute',value:'EveryMinute'},
           // {label:'Continuously',value:'Continuously'},
          ],
          checked5:false,
          checked41:false,
          selected: {},
          filteredItems: false,
          filterval: '',
          repos:[],
          disableMultiDaysDaily:true,
          DescToServer:'',
          //selectedStartTime: '18:00',
          
          retentionMaxRecoveryPoints: 5,

          schedulerSettings: {
            "@odata.type": "SchedulerSettings",
            schedulerEnabled:false,
            scheduleBasis: "Daily", // [Daily | Monthly | Periodic]
            dailyBasis: {
              startTime: "12:00",
              daysPreset: "WeekDays", // [WeekDays | Everyday | ThisDays]
              thisDays: []
             },
            monthlyBasis:  {
              startTime: "12:00",
              weekNumberOrSpecifiedDay:"FirstWeek", // [FirstWeek | ...  | FoursWeek | DayOfMonth | LastDay]
              dayOfWeek: "Monday",
              dayOfMonth: 10,
              months: []
            },
            periodicBasis: {
              timeOffset : 1,
              mode: "EveryHour", // [EveryHour | EveryMinute | Continuously]
              specificTimeIntervals: [[]]
            }
          },
          editmode:false,
          blockNext:true,
          auto_retry:5,
          retry:5,

          
        }
    }


    

    componentDidMount() {

     
     
  
      this.props.TreeFlat('test1')
      this.props.GetRepos('veeamserver1');
      this.props.TreeProtected('test1',true);

      var dayarray = [];
      var minarray = [];
      var hourarray = [];

      for (var i=1; i <= 31;i++) {
        dayarray.push({label:i,value:i})
      }
      this.setState({NumberDayList:dayarray})

      for (var i=1; i <= 60;i++) {
        minarray.push({label:i,value:i})
      }
      this.setState({minutesPreset:minarray})

      for (var i=1; i <= 24;i++) {
        hourarray.push({label:i,value:i})
      }
      this.setState({hoursPreset:hourarray})
    }
    

    componentWillReceiveProps(nextProps) {

      if (nextProps.tree_flat) {
        this.setState({tree_flat:nextProps.tree_flat})

      }
      if (nextProps.repos) {
      //  console.log(nextProps.repos)
        let camlistpre = nextProps.repos.map((xf) => ({value:xf.Id,label:xf.name}));
        this.setState({repos:camlistpre,reposselected:camlistpre[0]
        })
        this.props.clearReposInRedux();
      }


      if (nextProps.backup) {
       
        let camlistpre = nextProps.backup.map((xf) => ({value:xf.Id,label:xf.name}));
        this.setState({backupjobssimple:camlistpre,backupjobssimpleselected:camlistpre[0]
        })
       
      }

      if (nextProps.edit_info) {
      //  console.log('222')
        this.props.clearJobEditInfo();
        this.setState({editmode:true})
        this.setState({blockNext:false})
        this.setState({backUpNameForEdit:nextProps.edit_info.name})
        this.setState({nameToServer:nextProps.edit_info.name,description:nextProps.edit_info.description,reposselected:nextProps.edit_info.repositoryUid});
        this.setState({policyIdToUpdate:nextProps.edit_info.Id})
        this.setState({schedulerSettings:nextProps.edit_info.schedulerSettings,checked41:nextProps.edit_info.schedulerSettings.schedulerEnabled})
        if (nextProps.edit_info.schedulerSettings.dailyBasis.daysPreset == 'ThisDays') {
          this.setState({disableMultiDaysDaily:false})
        }
        if (nextProps.edit_info.schedulerSettings.monthlyBasis.weekNumberOrSpecifiedDay == 'DayOfMonth') {
          this.setState({turnOnDaysSelector:true})
        }
        if (nextProps.edit_info.schedulerSettings.periodicBasis.mode == 'EveryMinute') {
          this.setState({displayHourSelector:false})
        }
        if (nextProps.edit_info.pDs[0]) {
        //    console.log('uppper')

            let returnedInfo = this.findDomain(nextProps.edit_info.pDs[0]);
         //   console.log(returnedInfo)
            this.uptableprotected(returnedInfo[0].children);

        }
        if (!nextProps.edit_info.pDs[0]) {
          this.uptable(nextProps.edit_info.vmsUids);
        }
        

      }

     }

     findDomain (elem) {
      
      let result2 = this.props.tree.map(item => ({
          ...item,
          children: item.children
             .filter(child => child.value.includes(elem))
        }))
         .filter(item => item.children.length > 0)
      return result2;
     }



    close() {
      this.props.close();
      this.resetData();
    }

    

    pagechange() {
      if (this.state.page == 1) {

        
        
        let filter = this.Checkname();
       // console.log(filter);

        if (filter.length > 0 && filter[0].name != this.state.backUpNameForEdit) {
          alert('name exists! please enter another name')
          this.setState({page:1,blockNext:true})
        }
        else {
          if(this.state.array.length > 0) {
            this.setState({page:2,blockNext:false})
          }
          if(this.state.array.length == 0) {
            this.setState({page:2,blockNext:true})
          }
          
        }
      }
      if (this.state.page == 2) {
        this.setState({page:3})
      }
      if (this.state.page == 3) {
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
      if (this.state.page == 3) {
        this.setState({page:2})
      }
      if (this.state.page == 2) {
        this.setState({page:1,blockNext:false})
      }

    }


	chRepo(val) {
      //  this.props.toastrActions2();
      this.setState({reposselected:val})

    }


    nameToServer(e){
      this.setState({nameToServer:e.target.value})
      if (e.target.value.length == 0) {
        this.setState({blockNext:true})
      } 
      if (e.target.value.length > 0) {
        this.setState({blockNext:false})
      } 
    }

	window1(){
	return(
	<div>
		<div className="zagname">General Settings</div>
		<div className="upperlbl">Job Name:</div>
		<input value={this.state.nameToServer} onChange={this.nameToServer.bind(this)} className="jobname" type="text" />
		<div className="upperlbl">Job Description:</div>
		<textarea onChange={(e)=> this.setState({DescToServer:e.target.value})} value={this.state.DescToServer} className="firstscreent"></textarea>

	</div>
	)
	}

  filter(e) {
    var value = e.target.value;
    this.setState({filterval: value})
    this.setState({
      filteredItems: !value
        ? false
        : this.state.array.filter(function (item) {
          return item.name.toLowerCase().indexOf(value.toLowerCase()) !== -1;
        })
    })
  }

	window2(){
    var filer = this.state.filteredItems || this.state.array
  
	return(
	<div>

		<div className="zagname">Assign VMs</div>
		<div className="pagetwoundertxt">Total VMs in cluster: 254</div>
		<div className="pagetwoundertxt">Selected objects: {this.state.array.length}</div>
		<div className="iconboxtbsearch">
			<div onClick={this.openWiz3.bind(this)} className="addic">Add</div>
			<div onClick={this.removeElem.bind(this)} className="removeic">Remove</div>
			<div className="exclusionsic">Exclusions</div>
			<div className="searchiccont">
				<input value={this.state.filterval} onChange={this.filter.bind(this)} placeholder="Search" type="text"/><input type="button" className="search-icon-jh"/>
			</div>
		</div>

		<div className="consteptwo">
      <table>
        <thead>
          <tr>
            <th><input checked={this.state.bigcheck}  onChange={this.bigcheck.bind(this,this.state.bigcheck)} type="checkbox"/>Name</th>
            <th>Type</th>
            <th>Size</th>
          </tr>
        </thead>
        <tbody>
          {filer.map((item,index) => (
              <tr key={index}>
                <td><input checked={item.checked}  onChange={this.tblcheck.bind(this,item.Id,item.checked)} type="checkbox"/>{item.name}</td>
                <td>{item.type}</td>
                <td>{(item.size) ? (item.size + ' ' + 'GB') :('-')}</td>
              </tr>

          ))}
        </tbody>
      </table>
		</div>


	</div>
	)

	}

  removeElem() {
    var arrDelete = this.state.array;

    for (var i = arrDelete.length - 1; i >= 0; i--) {

    if(arrDelete[i].checked == true) {

        arrDelete.splice(i, 1);


    }
    if(arrDelete.length == 0) {
      this.setState({blockNext:true})
    }

    this.setState({array:arrDelete})
}



    if (this.state.bigcheck) {
      this.setState({bigcheck:false})
    }
  }

  bigcheck(state) {
    if (state) {
    let  positiveArr112 = this.state.array.map(function(name) {
       return ({'Id':name.Id,'size':name.size,'name':name.name,'type':name.type,'checked':false} );
    });
    this.setState({array:positiveArr112,bigcheck:false})
    }
    if (!state) {
    let  positiveArr112 = this.state.array.map(function(name) {
       return ({'Id':name.Id,'size':name.size,'name':name.name,'type':name.type,'checked':true} );
    });
    this.setState({array:positiveArr112,bigcheck:true})
    }
  }

  tblcheck(index,checked) {
  let  positiveArr112 = this.state.array.map(function(name) {
     return ( (name.Id == index) ? ( (checked == true) ?
      ({'Id':name.Id,'size':name.size,'name':name.name,'type':name.type,'checked':false})
      :({'Id':name.Id,'size':name.size,'name':name.name,'type':name.type,'checked':true})

     )
      : ({'Id':name.Id,'size':name.size,'name':name.name,'type':name.type,'checked':name.checked})
    );
  });


  this.setState({array:positiveArr112})
  }


  sumofGB () {
   var b = this.state.array.reduce(function(sum, current) {
  return sum + current.size;
}, 0);
  return (b)
  }

	window3(){

		return(
	<div>

		<div className="zagname">Backup Destination</div>
		<div className="pagetwoundertxt">Selected VMs: {(this.state.ProtectedID) ? ('N/A'):(this.state.array.length)} </div>
		<div className="pagetwoundertxt">Approximate Backup size: {(this.state.ProtectedID) ? ('N/A'):(this.sumofGB() + '' + 'GB')}</div>

		<div className="pagetwoundertxt bckprpstr">Backup repository:</div>
		<Select
                      className="repo1"

                      name="form-field-name"
                      value={this.state.reposselected}
                      options={this.state.repos}
                      searchable={false}
                      onChange={this.chRepo.bind(this)}
        />
		<div className="capacitycont">

			<span className="storageic"></span><span className="cap">Capacity:</span><span className="quant"></span>

		</div>

		<div className="bottomelse">
			<div className="onltext">Advanced job settings</div>
			<div className="onltextbtn">Advanced</div>

		</div>

	</div>
	)
	}

  check41 () {
    if( this.state.checked41) {
      this.setState({checked41:false})
    }
    if( !this.state.checked41) {
      this.setState({checked41:true})
    }
  }


  changeSelect2 (val) {
      this.setState({selectOP2:val})
  }

  getTime(val) {
   
    let newSchedulerSettingsDailyBasis = Object.assign({}, this.state.schedulerSettings.dailyBasis, { startTime: val } );
    let newSchedulerSettings = Object.assign({}, this.state.schedulerSettings, { dailyBasis: newSchedulerSettingsDailyBasis } );
	  this.setState({schedulerSettings:newSchedulerSettings});
  }

  getTime2(val) {
    let schedulerSettings = Object.assign({}, this.state.schedulerSettings);    //creating copy of object
    schedulerSettings.monthlyBasis.startTime = val;                        //updating value
    this.setState({schedulerSettings});
  }

  changeDailyBasisDaysPreset (val) {
    let newSchedulerSettingsDailyBasis = Object.assign({}, this.state.schedulerSettings.dailyBasis, { daysPreset: val.value } );
    let newSchedulerSettings = Object.assign({}, this.state.schedulerSettings, { dailyBasis: newSchedulerSettingsDailyBasis } );
    this.setState({schedulerSettings:newSchedulerSettings});
    
    if (val.value == 'ThisDays') {
      this.setState ({
        disableMultiDaysDaily:false
      })
    }
    if (val.value != 'ThisDays') {
      this.setState ({
        disableMultiDaysDaily:true
      })
    }
  }

  changeDailyBasisThisDays (val) {

   

    let schedulerSettings = Object.assign({}, this.state.schedulerSettings);    //creating copy of object
    schedulerSettings.dailyBasis.thisDays = val;                        //updating value
    this.setState({schedulerSettings});

    
  }

  changeMonthlyBasisDays (val) {
    if (val.value == 'DayOfMonth' ) {
      this.setState({turnOnDaysSelector:true})
    }
    if (val.value != 'DayOfMonth' ) {
      this.setState({turnOnDaysSelector:false})
    }

    //if (val.value == 'LastDay' ) {
     // this.setState({disableWeekDays:true})
    //}
    //if (val.value != 'LastDay' ) {
     // this.setState({disableWeekDays:false})
    //}
    let schedulerSettings = Object.assign({}, this.state.schedulerSettings);    //creating copy of object
    schedulerSettings.monthlyBasis.weekNumberOrSpecifiedDay = val;                        //updating value
    this.setState({schedulerSettings});
  }

  changeMonthlyDayOfWeek (val) {
    let schedulerSettings = Object.assign({}, this.state.schedulerSettings);    //creating copy of object
    schedulerSettings.monthlyBasis.dayOfWeek = val;                        //updating value
    this.setState({schedulerSettings});
  }

  changeMonthlyBasisMonth (val) {
    let schedulerSettings = Object.assign({}, this.state.schedulerSettings);    //creating copy of object
    schedulerSettings.monthlyBasis.months = val;                        //updating value
    this.setState({schedulerSettings});
  }


  changeNumberDayList(val) {
    let schedulerSettings = Object.assign({}, this.state.schedulerSettings);    //creating copy of object
    schedulerSettings.monthlyBasis.dayOfMonth = val;                        //updating value
    this.setState({schedulerSettings});
  }

  ChangeTimeMode(val) {

    if (val.value == 'EveryHour') {
      this.setState({displayHourSelector:true})
    }
    if (val.value != 'EveryHour') {
      this.setState({displayHourSelector:false})
    }
    if (val.value == 'Continuously' ) {
      this.setState({disabledWhenContiniusly:true})
    }
    if (val.value != 'Continuously' ) {
      this.setState({disabledWhenContiniusly:false})
    }

    let schedulerSettings = Object.assign({}, this.state.schedulerSettings);    //creating copy of object
    schedulerSettings.periodicBasis.mode = val; 
    schedulerSettings.periodicBasis.timeOffset = {label:1,value:1};                        //updating value
    this.setState({schedulerSettings});
  }

  changeTimeOffset(val) {
    let schedulerSettings = Object.assign({}, this.state.schedulerSettings);    //creating copy of object
    schedulerSettings.periodicBasis.timeOffset = val;                        //updating value
    this.setState({schedulerSettings});
  }

  changeTimeOffset2(val) {
    let schedulerSettings = Object.assign({}, this.state.schedulerSettings);    //creating copy of object
    schedulerSettings.periodicBasis.timeOffset = val;                        //updating value
    this.setState({schedulerSettings});
  }

  
  

	window4(){

		return(
		<div>
		<div className="zagname">Configure Schedule</div>
		<div>Specify the job scheduling. If a schedule is not not set, <br/> the job will need to be controlled manualy</div>
		<div className="runthehob"><label><input onChange={this.check41.bind(this)} type="checkbox" checked={this.state.checked41} name="dva"/>Run the job automatically</label></div>

<div className="myown">
      <div className={this.state.checked41 ? ('') : ('disabled-block')}></div>
			<Tabs defaultIndex={0} onSelect={index => this.setState({SelectedTab:index})}>
    <TabList>
      <Tab>Daily at this time:</Tab>
      <Tab>Monthly at this time:</Tab>
	  <Tab>Periodically</Tab>
	  <Tab>After this job:</Tab>
    </TabList>
<div className="tabs-con-panel">
    <TabPanel>
<div className="withclock">
		<Clock time={this.getTime.bind(this)} currentTime={this.state.schedulerSettings.dailyBasis.startTime}/>
    <div className="gt-left width150px">

      <Select
        placeholder="On theese days"
        name="form-field-name"
        value={this.state.schedulerSettings.dailyBasis.daysPreset}
        options={this.state.dailyBasisDaysPresetOptions}
  			searchable={false}
        onChange={this.changeDailyBasisDaysPreset.bind(this)}
      />

    </div>
    <div className="gt-left width150px">
      { (this.state.disableMultiDaysDaily) ? (''):(<Select
              multi={true}
              closeOnSelect = {false}
              removeSelected = {false}
              disabled = {this.state.disableMultiDaysDaily}
	  					placeholder="Days"

              name="form-field-name"
              value={this.state.schedulerSettings.dailyBasis.thisDays}
              options={this.state.dailyBasisThisDaysOptions}
  					  searchable={false}
              onChange={this.changeDailyBasisThisDays.bind(this)}
          />)}
      
    </div>
</div>



    </TabPanel>
    <TabPanel>
			  <div className="withclock">
      <Clock time={this.getTime2.bind(this)} currentTime={this.state.schedulerSettings.monthlyBasis.startTime}/>

		<Select
			  		  placeholder="Fourth"
                      className="tabs2"
                      name="form-field-name"
                      value={this.state.schedulerSettings.monthlyBasis.weekNumberOrSpecifiedDay}
                      options={this.state.MonthlyBasisDaysPresets}
					  searchable={false}
                      onChange={this.changeMonthlyBasisDays.bind(this)}
        />
      <div>
       { (this.state.turnOnDaysSelector) ? (
       <Select
					  placeholder="Thursday"
                      className="tabs3"
                      name="form-field-name"
                      value={this.state.schedulerSettings.monthlyBasis.dayOfMonth}
                      options={this.state.NumberDayList}
                      searchable={false}
                      disabled = {this.state.disableWeekDays}
                      onChange={this.changeNumberDayList.bind(this)}
        />):(
          <Select
          placeholder="Thursday"
                    className="tabs3"
                    name="form-field-name"
                    disabled = {this.state.disableWeekDays}
                    value={this.state.schedulerSettings.monthlyBasis.dayOfWeek}
                    options={this.state.dailyBasisThisDaysOptions}
          searchable={false}
                    onChange={this.changeMonthlyDayOfWeek.bind(this)}
      />
        )}
      
      </div>
		

		<Select
					  placeholder="Mounths"
            multi={true}
            closeOnSelect = {false}
                      className="tabs4"
                      name="form-field-name"
                      value={this.state.schedulerSettings.monthlyBasis.months}
                      options={this.state.MonthPreset}
					  searchable={false}
                      onChange={this.changeMonthlyBasisMonth.bind(this)}
        />
		</div>
    </TabPanel>
	<TabPanel>
			<div className="withclock">
        <div>
       { (this.state.displayHourSelector) ? (
          <Select
			          placeholder="1"
                      className="tabf1 hours"
                      name="form-field-name"
                      value={this.state.schedulerSettings.periodicBasis.timeOffset}
                      options={this.state.hoursPreset}
                      disabled= {this.state.disabledWhenContiniusly}
					  searchable={false}
                      onChange={this.changeTimeOffset.bind(this)}
        />
        )
        :
        (
          <Select
			          placeholder="1"
                      className="tabf1"
                      name="form-field-name minutes"
                      value={this.state.schedulerSettings.periodicBasis.timeOffset}
                      options={this.state.minutesPreset}
                      disabled= {this.state.disabledWhenContiniusly}
					  searchable={false}
                      onChange={this.changeTimeOffset2.bind(this)}
        />
        )}
        </div>
    

		<Select
		              placeholder="Hours"
                      className="tabf2"
                      name="form-field-name"
                      value={this.state.schedulerSettings.periodicBasis.mode}
                      options={this.state.modePreset}
					  searchable={false}
                      onChange={this.ChangeTimeMode.bind(this)}
        />

		<Select
		              placeholder="Schedule"
                      className="tabf3"
                      disabled= {!this.state.disabledWhenContiniusly}
                      name="form-field-name"
                      value={this.state.selectOP2}
                      options={this.state.options}
					  searchable={false}
                      onChange={this.changeSelect2.bind(this)}
        />
		</div>
    </TabPanel>
	<TabPanel>
			<div className="withclock">
      <Select
					  placeholder="Backup Job 3"
                      className="tabl1"
                      name="form-field-name"
                      value={this.state.backupjobssimpleselected}
                      options={this.state.backupjobssimple}
					  searchable={false}
                      onChange={this.changeSelect2.bind(this)}
        />
		</div>
    </TabPanel>
</div>

  </Tabs>
</div>
	<div className="restorepointsinput">Restore Points to keep on disk:
    <input className="respoints" onBlur={
      this.onBlurRestore.bind(this)}
       onKeyPress={this.handleKeyPress.bind(this)}
        pattern="[0-9]{10}" min="1" max="999" type="number"

   value={this.state.retentionMaxRecoveryPoints} 
   onChange={this.changeRestorePoints.bind(this)}/></div>

<div className="autoretry">
			<div className="checkboxstyling"><label><input type="checkbox" onChange={this.autoRetry.bind(this)} value={this.state.autoRetry} name="dva"/> Automatic retry</label></div>
			<div className="clear">
			<div className="autoretryleft">
			<div>Retry failed VMs processing:</div>
			<div><input value="10" onBlur={
      this.onBlurRestore2.bind(this)} onChange={this.changeRestorePoints2.bind(this)} onKeyPress={this.handleKeyPress2.bind(this)} value={this.state.retry}  pattern="[0-9]{10}" min="1" max="999" type="number"/> times</div>
			</div>
			<div className="autoretryright">
			<div>Wait before each retry attempt for </div>
			<div><input value="10" 
      onBlur={
      this.onBlurRestore3.bind(this)}
       onKeyPress={this.handleKeyPress3.bind(this)} onChange={this.changeRestorePoints3.bind(this)} value={this.state.auto_retry}  pattern="[0-9]{10}" min="1" max="999" type="number"/> minutes</div>
			</div>
			</div>

</div>

			<div className="bckpchkbx disabled"><label><input type="checkbox" checked name="dva"/> Backup window</label></div>
			<div className="bottomwith disabled">
			<span>Terminate job of it exceeds allowed backup window<input className="windbtn" type="button" value="Window..."/></span>
			</div>

			<div className="bottomwithline ">
			If the job does not complete within allocated backup window, it will be terminated
			</div>


	    </div>
			)
  }

 

  autoRetry () {
    if( this.state.autoRetry) {
      this.setState({autoRetry:false})
    }
    if( !this.state.autoRetry) {
      this.setState({autoRetry:true})
    }
  }

  onBlurRestore() {
    if (!this.state.retentionMaxRecoveryPoints) {
      this.setState({retentionMaxRecoveryPoints:5});
    }
    
  }
  onBlurRestore2() {
    if (!this.state.retry) {
      this.setState({retry:5});
    }
    
  }

  onBlurRestore3() {
    if (!this.state.auto_retry) {
      this.setState({auto_retry:5});
    }
    
  }

  handleKeyPress(evt) {
    evt = evt || window.event;
    var charCode = evt.which || evt.keyCode;
    var charStr = String.fromCharCode(charCode);
    if (charStr == "-") {
        this.setState({retentionMaxRecoveryPoints:''});
        
    }
  }

  handleKeyPress2(evt) {
    evt = evt || window.event;
    var charCode = evt.which || evt.keyCode;
    var charStr = String.fromCharCode(charCode);
    if (charStr == "-") {
        this.setState({retry:''});
        
    }
  }

  handleKeyPress3(evt) {
    evt = evt || window.event;
    var charCode = evt.which || evt.keyCode;
    var charStr = String.fromCharCode(charCode);
    if (charStr == "-") {
        this.setState({auto_retry:''});
        
    }
  }
  
  changeRestorePoints(e) {
    let prop = e.target.value;
    const re = /^[0-9\b]+$/;

   if (e.target.value == '' || re.test(e.target.value)) {
     if (prop >= 1  && prop <= 999  || prop == '' ) {
        this.setState({retentionMaxRecoveryPoints:prop});
       
      }
      else {
        return;
      }
 
   }
     
  }

  changeRestorePoints2(e) {
    let prop = e.target.value;
    const re = /^[0-9\b]+$/;

   if (e.target.value == '' || re.test(e.target.value)) {
     if (prop >= 1  && prop <= 999  || prop == '' ) {
        this.setState({retry:prop});
       
      }
      else {
        return;
      }
 
   }
     
  }

  changeRestorePoints3(e) {
    let prop = e.target.value;
    const re = /^[0-9\b]+$/;

   if (e.target.value == '' || re.test(e.target.value)) {
     if (prop >= 1  && prop <= 999  || prop == '' ) {
        this.setState({auto_retry:prop});
       
      }
      else {
        return;
      }
 
   }
     
  }

check5 () {
  if( this.state.checked5) {
    this.setState({checked5:false})
  }
  if( !this.state.checked5) {
    this.setState({checked5:true})
  }
}

	window5(){

		return(
		<div>
  <div className="zagname">Review Summary</div>
			<dl className="floated">
  <dt>Name</dt>
  <dd>{this.state.nameToServer}</dd>
 {/* <dt>Source Cluster</dt>
  <dd>[ToDo]</dd> */}
  <dt>VMs</dt>
  <dd>
    <div className="pl-1">
  {this.state.array.length}
  </div>
  </dd>
  
  <dt>Target repository</dt>
  <dd>{this.state.reposselected.label}</dd>
 {/* <dt>Target path</dt>
  <dd>[ToDo]</dd> 
  <dt>Schedule</dt>
  <dd>[ToDo]</dd> */}
  <dt>Retention</dt>
  <dd>{this.state.retentionMaxRecoveryPoints}</dd>
</dl>
	<div className="lp-20"><label><input type="checkbox" onChange={this.check5.bind(this)} checked={this.state.checked5} name="dva"/> Run backup job when i click add</label></div>
</div>
		)
  }
  

  

  CreateShedule() {

    let maped = this.state.schedulerSettings.dailyBasis.thisDays.map((item)=> {
      return item = item.label
    }) 
    

    let periodBasis;

    switch (this.state.SelectedTab) {
      case 0:
      periodBasis = 'Daily' + ' ' + this.state.schedulerSettings.dailyBasis.startTime + ' ' + this.state.schedulerSettings.dailyBasis.daysPreset + maped
        break;
      case 1:
        periodBasis = 'Monthly' + ' ' + this.state.schedulerSettings.monthlyBasis.startTime + ' ' + this.state.schedulerSettings.monthlyBasis.weekNumberOrSpecifiedDay + ' ' +
        this.state.schedulerSettings.monthlyBasis.dayOfWeek + ' ' + this.state.schedulerSettings.monthlyBasis.dayOfMonth + 'th day of the month'
          break;
     case 2:
        periodBasis = 'Periodic' + ' ' + this.state.schedulerSettings.periodicBasis.timeOffset + ' ' + this.state.schedulerSettings.periodicBasis.mode
          break;   
      case 3:
        periodBasis = 'Daily'
          break;
      default:
      periodBasis = 'Daily' + ' ' + this.state.schedulerSettings.dailyBasis.startTime + ' ' + this.state.schedulerSettings.dailyBasis.daysPreset + maped
      
      }


      

   

    return (
      <div>{periodBasis}</div>
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

    Checkname() {
      let value = this.state.nameToServer
      let filter = this.props.backup.filter(function(number) {
        return number.name == value;
      });

      return filter;
    }

    switch (param) {
      
      if (param != 1 && !this.state.nameToServer) {
        this.setState({page:1})
        
      }
      if (param != 2 && param == 1 && this.state.array.length == 0) {
        this.setState({page:1})
        
        this.setState({blockNext:false})
      }
      if (param == 2  && this.state.array.length == 0 && this.state.nameToServer) {
        //this.setState({page:2})
        
        let filter = this.Checkname();

        if(filter.length > 0 && filter[0].name != this.state.backUpNameForEdit) {
          this.setState({page:1})
          alert('name exist! please enter another name')
        }
        if(filter.length == 0 ||  filter[0].name == this.state.backUpNameForEdit) {
          this.setState({page:2})
        }
        this.setState({blockNext:true})
      }
      if (this.state.array.length != 0 && this.state.nameToServer) {

        let filter = this.Checkname();

        if(filter.length > 0 && filter[0].name != this.state.backUpNameForEdit) {
          this.setState({page:1})
          alert('name exist! please enter another name')
          this.setState({blockNext:false})
        }
        if(filter.length == 0 || filter[0].name == this.state.backUpNameForEdit) {
          this.setState({page:param})
          this.setState({blockNext:false})
          
        }



        
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

          <div className={this.state.page == 1 || this.state.page == 2 || this.state.page == 3 || this.state.page == 4 || this.state.page == 5 ? (' ') :('greyfixer34')}>General <br/> Settings</div>
          <div className={ this.state.page == 2 || this.state.page == 3 || this.state.page == 4 || this.state.page == 5 ? ('mar69px') :('mar69px greyfixer34')}> Assign <br/> VM's</div>
          <div className={  this.state.page == 3 || this.state.page == 4 || this.state.page == 5 ? ('mar69px') :('mar69px greyfixer34')} >Backup <br/> Destination</div>
          <div className={ this.state.page == 4 || this.state.page == 5 ? ('mar69px') :('mar69px greyfixer34')} >Configure <br/> Schedule</div>
          <div className={  this.state.page == 5 ? ('mar69px') :('mar69px greyfixer34')}>Review <br/> Summary</div>
        </div>
      )
    }

    createPolicyObject() {
      let policyObj = new Object();

      

      policyObj["@odata.type"] = "PolicyCreationSettings";
      policyObj.name = this.state.nameToServer;
      policyObj.vmsUids = Array.from(
        this.state.filteredItems || this.state.array,
        function(el){
          return el.Id
        }
      );
      policyObj.PDs = [this.state.ProtectedID];
      policyObj.description = this.state.DescToServer;
      policyObj.repositoryUid = this.state.reposselected.value || this.state.reposselected;

      policyObj.retentionMaxRecoveryPoints = this.state.retentionMaxRecoveryPoints;

      let thisDays = this.state.schedulerSettings.dailyBasis.thisDays.map((xf) => (xf.value)) || [];
      let months = this.state.schedulerSettings.monthlyBasis.months.map((xf) => (xf.value)) || [];
      
      //let timeOffSet = this.state.schedulerSettings.periodicBasis.timeOffset.map((xf) => (xf.value)) || [];
      
      policyObj.schedulerSettings = this.state.schedulerSettings; //schedulerSettingsObj;
      policyObj.schedulerSettings.dailyBasis.thisDays = thisDays;
      policyObj.schedulerSettings.monthlyBasis.months = months;


      policyObj.automaticRetry = this.state.autoRetry,
      policyObj.retryCount = this.state.retry,
      policyObj.retryTimeDelay = this.state.auto_retry,
      
      policyObj.schedulerSettings.monthlyBasis.months = policyObj.schedulerSettings.monthlyBasis.months.value || policyObj.schedulerSettings.monthlyBasis.months;
      policyObj.schedulerSettings.periodicBasis.timeOffset = policyObj.schedulerSettings.periodicBasis.timeOffset.value || policyObj.schedulerSettings.periodicBasis.timeOffset;
      policyObj.schedulerSettings.monthlyBasis.dayOfWeek = policyObj.schedulerSettings.monthlyBasis.dayOfWeek.value || policyObj.schedulerSettings.monthlyBasis.dayOfWeek;
      policyObj.schedulerSettings.monthlyBasis.weekNumberOrSpecifiedDay = policyObj.schedulerSettings.monthlyBasis.weekNumberOrSpecifiedDay.value || policyObj.schedulerSettings.monthlyBasis.weekNumberOrSpecifiedDay      
      policyObj.schedulerSettings.periodicBasis.mode = policyObj.schedulerSettings.periodicBasis.mode.value || policyObj.schedulerSettings.periodicBasis.mode;
      policyObj.schedulerSettings.schedulerEnabled = this.state.checked41;

      if(this.state.SelectedTab == 0) {
        policyObj.schedulerSettings.scheduleBasis = "Daily"
      }
      if(this.state.SelectedTab == 1) {
        policyObj.schedulerSettings.scheduleBasis = "Monthly"
      }
      if(this.state.SelectedTab == 2) {
        policyObj.schedulerSettings.scheduleBasis = "Periodic"
      }

      if(this.state.SelectedTab == 3) {
        policyObj.schedulerSettings.scheduleBasis = "Daily"
      }
      

      return policyObj;
    }

    add () {
      let policyObj = this.createPolicyObject();
      let runner = this.state.checked5;
    // console.log(policyObj);
      this.props.addJobSS(policyObj,runner);
      this.props.close();
      this.resetData();
    }

    updateJob() {
      let policyObj = this.createPolicyObject();
      let runner = this.state.checked5;
    //  console.log(policyObj);
      this.props.UpdateJob(this.state.policyIdToUpdate,policyObj,runner);
      this.props.close();
      this.resetData();
    }

    resetData() {
      this.setState({page:1})
      this.setState({checked41:false,nameToServer:'',DescToServer:'',filteredItems:false,array:[]})
      this.setState({editmode:false})

      const  schedulerSettings = {
        "@odata.type": "SchedulerSettings",
        schedulerEnabled:false,
        scheduleBasis: "Daily", 
        dailyBasis: {
          startTime: "12:00",
          daysPreset: "WeekDays", 
          thisDays: []
         },
        monthlyBasis:  {
          startTime: "12:00",
          weekNumberOrSpecifiedDay:"FirstWeek",
          dayOfWeek: "Monday",
          dayOfMonth: 10,
          months: []
        },
        periodicBasis: {
          timeOffset : 1,
          mode: "EveryHour",
          specificTimeIntervals: [[]]
        }
      };
      
      this.setState({schedulerSettings:schedulerSettings});

      this.setState ({disableMultiDaysDaily:true})
      this.setState({turnOnDaysSelector:false})
      this.setState({displayHourSelector:true})
    }

    openWiz3() {
      this.setState({openWiz3:true})
    }

    closeWiz3() {
      this.setState({openWiz3:false})
    }

    uptable(array) {
      if (array.length > 0) {
        this.setState({blockNext:false})
      }

      this.setState({bigcheck:false})
      this.setState({array:array})
      let clearArr = this.clearArrFunc(array,this.state.tree_flat);
      clearArr = clearArr.map(function(name) {
        return ({'Id':name.Id,'size':name.sizeInGb,'name':name.name,'type':name['@odata.type'],'checked':false});
     });
     
      this.setState({array:clearArr})
      this.setState({ProtectedID:null})

    }

    uptableprotected(array) {
      if (array.length > 0) {
        this.setState({blockNext:false})
      }
     // console.log(array)
      this.setState({bigcheck:false})
      let newArray = [{'Id':array[0].value,'size':'','name':array[0].label,'type':'Protection Domain','checked':false}]
      
      this.setState({ProtectedID:array[0].value})
      this.setState({array:newArray})
    }


    clearArrFunc(arr1,arr2) {
      var arj = [];
      var vbn = '';
      for (var i = 0; i < arr1.length; i++) {

        vbn = arr2.filter(function(number) {
          return ( number.Id == arr1[i])
        });
      // arj.push({vbn})
       arj = arj.concat(vbn);

      }


    return arj;

  }




    render(){

        

        return (
          <div>
            {this.props.open ?
              (
                <div className="freeze">
                  <div className="pop-up-window">
                    <div className="pop-up-header">
                      <div className="gt-left pop-up-h-title">{(this.state.editmode) ? ('Edit backup job for "Nutanix Cluster 1"'):('Add new backup job for "Nutanix Cluster 1"')}</div>
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
                        ((this.state.editmode) ?(<a onClick={this.updateJob.bind(this)} className="go-btn gt-right go-btn-global">Edit</a>):(<a onClick={this.add.bind(this)} className="go-btn gt-right go-btn-global">Add</a>)) 
                       :
                        (
                          (this.state.blockNext) ? (<a className="go-btn gt-right go-btn-global disabled">Next</a>)
                           :
                            (<a onClick={this.pagechange.bind(this)} className="go-btn gt-right go-btn-global">Next</a>)
                        

                      )
                        }


                      {this.state.page == 1 ? (null) : (<a onClick={this.pagechangeB.bind(this)} className="back-btn gt-right go-btn-global">Previous</a>)}


                    </div>
                  </div>
                </div>

              ):
              (null)}
              <SWizard arrayProtected={this.uptableprotected.bind(this)} array={this.uptable.bind(this)} open={this.state.openWiz3} close={this.closeWiz3.bind(this)}/>
              </div>

        )
    }
}
const mapDispatchToProps = function(dispatch) {

    return {

      addJobSS: (id,runner) => dispatch(addJobSS(id,runner)),
        TreeFlat: (id) => dispatch(TreeFlat(id)),
        GetRepos: (id) => dispatch(GetRepos(id)),
        clearJobEditInfo: () => dispatch(clearJobEditInfo()),
        clearReposInRedux: () => dispatch(clearReposInRedux()),
        TreeProtected: (id,bool) => dispatch(TreeProtected(id,bool)),
        UpdateJob: (id,obj,runner) => dispatch(UpdateJob(id,obj,runner)),
        
        

    }
}

function mapStateToProps(state) {


    return {

      backup:state.toJS().BackupReducer.backups,
      tree_flat:state.toJS().BackupReducer.tree_flat,
      repos:state.toJS().BackupReducer.repos,
      edit_info:state.toJS().BackupReducer.job_info_for_edit,
      tree:state.toJS().BackupReducer.tree

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(BackWiz);
