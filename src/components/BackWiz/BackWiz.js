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

class BackWiz extends Component {
    constructor(props) {
        super(props)


        this.state = {

          page:'1',
          openWiz3:false,
          array:[],
          hours: 12,
          minutes: 20,
          enabled: true,
          options:[{label:'Repository 1',value:'Repository 1'},{label:'Repository 2',value:'Repository 2'}],
          dailyBasisDaysPresetOptions: [
            {label:'On week days',value:'WeekDays'},
            {label:'Everyday',value:'Everyday'},
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
            {label:'Continuously',value:'Continuously'},
          ],
          checked5:false,
          selected: {},
          filteredItems: false,
          filterval: '',
          repos:[],
          disableMultiDaysDaily:true,
          //selectedStartTime: '18:00',
          

          schedulerSettings: {
            "@odata.type": "SchedulerSettings",
            scheduleBasis: "Daily", // [Daily | Monthly | Periodic]
            dailyBasis: {
              startTime: "12:00",
              daysPreset: "WeekDays", // [WeekDays | Everyday | ThisDays]
              thisDays: ["Sunday"]
             },
            monthlyBasis:  {
              startTime: "12:00",
              weekNumberOrSpecifiedDay:"FirstWeek", // [FirstWeek | ...  | FoursWeek | DayOfMonth | LastDay]
              dayOfWeek: "Monday",
              dayOfMonth: 10,
              months: ["January", "July"]
            },
            periodicBasis: {
              timeOffset : 0,
              mode: "EveryHour", // [EveryHour | EveryMinute | Continuously]
              specificTimeIntervals: [[]]
            }
          }
        }
    }

    componentDidMount() {

      this.props.TreeFlat('test1')
      this.props.GetRepos('veeamserver1')

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
        console.log(nextProps.repos)
        let camlistpre = nextProps.repos.map((xf) => ({value:xf.Id,label:xf.name}));
        this.setState({repos:camlistpre,reposselected:camlistpre[0].value})
      }

     }



    close() {
      this.setState({page:1})
      this.props.close();
    }

    pagechange() {
      if (this.state.page == 1) {
        this.setState({page:2})
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
        this.setState({page:1})
      }

    }


	chRepo(val) {
      //  this.props.toastrActions2();
      this.setState({reposselected:val})

    }



	window1(){
	return(
	<div>
		<div className="zagname">General Settings</div>
		<div className="upperlbl">Job Name:</div>
		<input value={this.state.nameToServer} onChange={(e)=> this.setState({nameToServer:e.target.value})} className="jobname" type="text" />
		<div className="upperlbl">Job Description:</div>
		<textarea className="firstscreent"></textarea>

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
		<div className="pagetwoundertxt">Selected objects: 5</div>
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
                <td>{item.size} GB</td>
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
		<div className="pagetwoundertxt">Selected VMs: {this.state.array.length}</div>
		<div className="pagetwoundertxt">Approximate Backup size: {this.sumofGB()} GB</div>

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
			<div className="onltext">Advanced job settings including compression, <br/> deduplicating and other settings</div>
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
    console.log(val);
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

    console.log(val)

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
		<div>Specify the job scheduling option. If you do not set schedule, <br/> the job will need to be controlled manualy</div>
		<div className="runthehob"><label><input onChange={this.check41.bind(this)} type="checkbox" checked={this.state.checked41} name="dva"/> Run the job automaticaly</label></div>

<div className="myown">
      <div className={this.state.checked41 ? ('disabled-block') : ('')}></div>
			<Tabs>
    <TabList>
      <Tab>Daily at this time:</Tab>
      <Tab>Monthly at this time:</Tab>
	  <Tab>Periodicaly every:</Tab>
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
      <Select
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
          />
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
                      value={this.state.selectOP2}
                      options={this.state.options}
					  searchable={false}
                      onChange={this.changeSelect2.bind(this)}
        />
		</div>
    </TabPanel>
</div>

  </Tabs>
</div>
	<div>Restore Points to keep on disc:<input className="respoints" type="number"/></div>

<div className="autoretry">
			<div className="checkboxstyling"><label><input type="checkbox" checked name="dva"/> Automatic retry</label></div>
			<div className="clear">
			<div className="autoretryleft">
			<div>Retry failed VMs processing:</div>
			<div><input value="10" type="number"/> times</div>
			</div>
			<div className="autoretryright">
			<div>Wait before each retry attempt for </div>
			<div><input value="10" type="number"/> minutes</div>
			</div>
			</div>

</div>

			<div className="bckpchkbx"><label><input type="checkbox" checked name="dva"/> Backup window</label></div>
			<div className="bottomwith">
			<span>Terminate job of it exceeds allowed backup window<input className="windbtn" type="button" value="Window..."/></span>
			</div>

			<div className="bottomwithline">
			If the job does not complete within allocated backup window, it will be terminated to prevent snapshot commit during production hours
			</div>


	    </div>
			)
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
  <dt>Source Cluster</dt>
  <dd>NTNXCL 1</dd>
  <dt>VMs</dt>
  <dd>35</dd>
  <dt>Target repository</dt>
  <dd>TestRepo1</dd>
  <dt>Target path</dt>
  <dd>C:\Backup\</dd>
  <dt>Schedule</dt>
  <dd>Daily at 10:00 PM</dd>
  <dt>Retention</dt>
  <dd>5 restore points</dd>
</dl>
	<div><label><input type="checkbox" onChange={this.check5.bind(this)} checked={this.state.checked5} name="dva"/> Run backup job when i click add</label></div>
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
      this.setState({page:param})
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

      // let schedulerSettingsObj = new Object();
      // schedulerSettingsObj["@odata.type"] = "SchedulerBackupJobSettings";      
      // schedulerSettingsObj.scheduleBasis = "Daily", // [Daily | Monthly | Periodic]
      
      // schedulerSettingsObj.dailyBasis = new Object();
      // schedulerSettingsObj.dailyBasis.startTime = this.state.selectedStartTime;
      // schedulerSettingsObj.dailyBasis.daysPreset = "WeekDays"; // [WeekDays | Everyday | ThisDays]
      // schedulerSettingsObj.dailyBasis.thisDays = ["Sunday", "Monday"];

      // schedulerSettingsObj.monthlyBasis = new Object();
      // schedulerSettingsObj.monthlyBasis.startTime = "12:00";
      // schedulerSettingsObj.monthlyBasis.weekNumberOrSpecifiedDay = "DayOfMonth"; // [FirstWeek | ...  | FoursWeek | DayOfMonth | LastDay]
      // schedulerSettingsObj.monthlyBasis.dayOfWeek = "Monday",
      // schedulerSettingsObj.monthlyBasis.dayOfMonth = 1;
      // schedulerSettingsObj.monthlyBasis.months = ["January", "July"];
      
      // schedulerSettingsObj.periodicBasis = new Object();
      // schedulerSettingsObj.periodicBasis.timeOffset = 0; // Hour number or minute number
      // schedulerSettingsObj.periodicBasis.mode = "EveryHour"; // [EveryHour | EveryMinute | Continuously]
      // schedulerSettingsObj.periodicBasis.specificTimeIntervals = [[]]; // TODO: Format TBD

      //schedulerSettingsObj.toRunEvery = 1;
      //schedulerSettingsObj.toRunEveryTimeInterval = "Days";
      //schedulerSettingsObj.atTime = this.state.selectedStartTime;

      policyObj["@odata.type"] = "PolicyCreationSettings";
      policyObj.name = this.state.nameToServer;
      policyObj.vmsUids = Array.from(
        this.state.filteredItems || this.state.array,
        function(el){
          return el.Id
        }
      );

      policyObj.repositoryUid = this.state.reposselected;

      policyObj.scheduleSettings = this.state.schedulerSettings; //schedulerSettingsObj;
    
      policyObj.schedulerEnabled = this.state.checked41;

      return policyObj;
    }

    add () {
      let policyObj = this.createPolicyObject();
      let runner = this.state.checked5;
      this.props.addJobSS(policyObj,runner);
      this.props.close();
      this.setState({page:1})
    }

    openWiz3() {
      this.setState({openWiz3:true})
    }

    closeWiz3() {
      this.setState({openWiz3:false})
    }

    uptable(array) {

      this.setState({bigcheck:false})
      this.setState({array:array})
      let clearArr = this.clearArrFunc(array,this.state.tree_flat);
      clearArr = clearArr.map(function(name) {
        return ({'Id':name.Id,'size':name.sizeInGb,'name':name.name,'type':name['@odata.type'],'checked':false});
     });
      this.setState({array:clearArr})

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
                      <div className="gt-left pop-up-h-title">Add new backup job for "Nutanix Cluster 1"</div>
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
                       {this.state.page == 5 ? (<a onClick={this.add.bind(this)} className="go-btn gt-right go-btn-global">Add</a>) : (<a onClick={this.pagechange.bind(this)} className="go-btn gt-right go-btn-global">Next</a>)}
                      {this.state.page == 1 ? (null) : (<a onClick={this.pagechangeB.bind(this)} className="back-btn gt-right go-btn-global">Previous</a>)}


                    </div>
                  </div>
                </div>

              ):
              (null)}
              <SWizard array={this.uptable.bind(this)} open={this.state.openWiz3} close={this.closeWiz3.bind(this)}/>
              </div>

        )
    }
}
const mapDispatchToProps = function(dispatch) {

    return {

      addJobSS: (id,runner) => dispatch(addJobSS(id,runner)),
        TreeFlat: (id) => dispatch(TreeFlat(id)),
        GetRepos: (id) => dispatch(GetRepos(id)),


    }
}

function mapStateToProps(state) {


    return {

      tree_flat:state.toJS().BackupReducer.tree_flat,
      repos:state.toJS().BackupReducer.repos

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(BackWiz);
