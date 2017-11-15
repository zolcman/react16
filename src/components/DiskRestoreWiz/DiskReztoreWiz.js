import React, { Component,  PropTypes} from 'react'
import styles from './styles.scss';
import { connect} from 'react-redux';
import { Route, Switch,Link,NavLink,withRouter,  BrowserRouter as Router } from 'react-router-dom';
import Select from 'react-select';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import  Clock from '../Clock/Clock';



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
          
        
          checked5:false,
          checked41:false,
          selected: {},
          filteredItems: false,
          filterval: '',
          repos:[],
          disableMultiDaysDaily:true,
          DescToServer:'',

          
          editmode:false,

          
        }
    }

    componentDidMount() {

     
   
     
    }

    componentWillReceiveProps(nextProps) {


     }



    close() {
      this.props.close();
      this.resetData();
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
    
	return(
    
	<div>



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

  changeRestorePoints(val) {
    this.setState({retentionMaxRecoveryPoints:val.target.value});
  }
  

	window4(){

		return(
		<div>
		

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

     

      policyObj["@odata.type"] = "PolicyCreationSettings";
      policyObj.name = this.state.nameToServer;
      policyObj.vmsUids = Array.from(
        this.state.filteredItems || this.state.array,
        function(el){
          return el.Id
        }
      );
      policyObj.description = this.state.DescToServer;
      policyObj.repositoryUid = this.state.reposselected.value || this.state.reposselected;

      policyObj.retentionMaxRecoveryPoints = this.state.retentionMaxRecoveryPoints;

      let thisDays = this.state.schedulerSettings.dailyBasis.thisDays.map((xf) => (xf.value)) || [];
      let months = this.state.schedulerSettings.monthlyBasis.months.map((xf) => (xf.value)) || [];
      
      //let timeOffSet = this.state.schedulerSettings.periodicBasis.timeOffset.map((xf) => (xf.value)) || [];
      
      policyObj.schedulerSettings = this.state.schedulerSettings; //schedulerSettingsObj;
      policyObj.schedulerSettings.dailyBasis.thisDays = thisDays;
      policyObj.schedulerSettings.monthlyBasis.months = months;
      
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
     // this.props.addJobSS(policyObj,runner);
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
                       : (<a onClick={this.pagechange.bind(this)} className="go-btn gt-right go-btn-global">Next</a>)}
                      {this.state.page == 1 ? (null) : (<a onClick={this.pagechangeB.bind(this)} className="back-btn gt-right go-btn-global">Previous</a>)}


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

     
        
        

    }
}

function mapStateToProps(state) {


    return {

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DiskRestoreWiz);
