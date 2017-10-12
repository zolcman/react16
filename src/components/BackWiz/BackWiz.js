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
          checked5:false,
          selected: {},
          filteredItems: false,
          filterval: '',
          repos:[],
        }
    }

    componentDidMount() {

      this.props.TreeFlat('test1')
      this.props.GetRepos('veeamserver1')

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
		<input value={this.state.nameToServer} onChange={(e)=> this.setState({nameToServer:e.targetvalue})} className="jobname" type="text" />
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
  }

	window4(){

		return(
		<div>
		<div className="zagname">Configure Shedule</div>
		<div>Specify the job shrduling option. If you do not set shedule, <br/> the job will need to be controlled manualy</div>
		<div className="runthehob"><label><input onChange={this.check41.bind(this)} type="checkbox" checked={this.state.checked41} name="dva"/> Run the job automaticaly</label></div>

<div className="myown">
      <div className={this.state.checked41 ? ('disabled-block'):('')}></div>
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
		<Clock time={this.getTime.bind(this)}/>
    <div className="gt-left width150px">

      <Select
  placeholder="On theese days"
                        name="form-field-name"
                        value={this.state.selectOP2}
                        options={this.state.options}
  					  searchable={false}
                        onChange={this.changeSelect2.bind(this)}
          />

    </div>
    <div className="gt-left width150px">
      <Select
	  					placeholder="Days"

                        name="form-field-name"
                        value={this.state.selectOP2}
                        options={this.state.options}
  					  searchable={false}
                        onChange={this.changeSelect2.bind(this)}
          />
    </div>
</div>



    </TabPanel>
    <TabPanel>
			  <div className="withclock">
      <Clock/>

		<Select
			  		  placeholder="Fourth"
                      className="tabs2"
                      name="form-field-name"
                      value={this.state.selectOP2}
                      options={this.state.options}
					  searchable={false}
                      onChange={this.changeSelect2.bind(this)}
        />

		<Select
					  placeholder="Thursday"
                      className="tabs3"
                      name="form-field-name"
                      value={this.state.selectOP2}
                      options={this.state.options}
					  searchable={false}
                      onChange={this.changeSelect2.bind(this)}
        />

		<Select
					  placeholder="Mounths"
                      className="tabs4"
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
			          placeholder="1"
                      className="tabf1"
                      name="form-field-name"
                      value={this.state.selectOP2}
                      options={this.state.options}
					  searchable={false}
                      onChange={this.changeSelect2.bind(this)}
        />

		<Select
		              placeholder="Hours"
                      className="tabf2"
                      name="form-field-name"
                      value={this.state.selectOP2}
                      options={this.state.options}
					  searchable={false}
                      onChange={this.changeSelect2.bind(this)}
        />

		<Select
		              placeholder="Shedule"
                      className="tabf3"
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
  <dd>definition for first item in list</dd>
  <dt>Source Cluster</dt>
  <dd>NTNXCL 1</dd>
  <dt>VMs</dt>
  <dd>35</dd>
  <dt>Target repository</dt>
  <dd>TestRepo1</dd>
  <dt>Target path</dt>
  <dd>C:\Backup\</dd>
  <dt>Shedule</dt>
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
          <div className={ this.state.page == 4 || this.state.page == 5 ? ('mar69px') :('mar69px greyfixer34')} >Configure <br/> Shedule</div>
          <div className={  this.state.page == 5 ? ('mar69px') :('mar69px greyfixer34')}>Review <br/> Summary</div>
        </div>
      )
    }

    add () {
      let id = this.state.checked5;
      let nameToServer = this.state.nameToServer // ИМЯ ДЛЯ ОТПРАВКИ НА СЕРВЕР
      this.props.addJobSS(id);
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

      addJobSS: (id) => dispatch(addJobSS(id)),
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
