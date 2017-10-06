import React, { Component,  PropTypes} from 'react'
import styles from './styles.scss';
import { connect} from 'react-redux';
import { Route, Switch,Link,NavLink,withRouter,  BrowserRouter as Router } from 'react-router-dom';
import Select from 'react-select';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import  SWizard from '../SmWiz/SWizard'

class BackWiz extends Component {
    constructor(props) {
        super(props)


        this.state = {

          page:'1',
          openWiz3:true,

        }
    }

    componentDidMount() {


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


	changeSelect2(val) {
      //  this.props.toastrActions2();
      this.setState({selectOP2:val})

    }


	window1(){
	return(
	<div>
		<div className="zagname">General Settings</div>
		<div className="upperlbl">Job Name:</div>
		<input className="jobname" type="text" />
		<div className="upperlbl">Job Description:</div>
		<textarea className="firstscreent"></textarea>

	</div>
	)
	}

	window2(){
	return(
	<div>

		<div className="zagname">Assign VMs</div>
		<div className="pagetwoundertxt">Total VMs in cluster: 254</div>
		<div className="pagetwoundertxt">Selected objects: 5</div>
		<div className="iconboxtbsearch">
			<div onClick={this.openWiz3.bind(this)} className="addic">Add</div>
			<div className="removeic">Remove</div>
			<div className="exclusionsic">Exclusions</div>
			<div className="searchiccont">
				<input placeholder="Search" type="text"/><input type="button"/>
			</div>
		</div>

		<div className="consteptwo">
		</div>


	</div>
	)

	}
	window3(){

		return(
	<div>

		<div className="zagname">Backup Destination</div>
		<div className="pagetwoundertxt">Selected VMs: 24</div>
		<div className="pagetwoundertxt">Approximate Backup size: 954 GB</div>

		<div className="pagetwoundertxt bckprpstr">Backup repository:</div>
		<Select
                      className="repo1"
                      name="form-field-name"
                      value={this.state.selectOP2}
                      options={this.state.options}
					  searchable={false}
                      onChange={this.changeSelect2.bind(this)}
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

	window4(){

		return(
		<div>
		<div className="zagname">Configure Shedule</div>
		<div>Specify the job shrduling option. If you do not set shedule, <br/> the job will need to be controlled manualy</div>
		<div><label><input type="checkbox" checked name="dva"/> run the job automaticaly</label></div>

<div className="myown">
			<Tabs>
    <TabList>
      <Tab>Daily at this time:</Tab>
      <Tab>Monthly at this time:</Tab>
	  <Tab>Periodicaly every:</Tab>
	  <Tab>After this job:</Tab>
    </TabList>
<div className="tabs-con-panel">
    <TabPanel>
      
		<Select
                      className="tabf1"
                      name="form-field-name"
                      value={this.state.selectOP2}
                      options={this.state.options}
					  searchable={false}
                      onChange={this.changeSelect2.bind(this)}
        />
		
		<Select
                      className="tabf2"
                      name="form-field-name"
                      value={this.state.selectOP2}
                      options={this.state.options}
					  searchable={false}
                      onChange={this.changeSelect2.bind(this)}
        />
		
		<Select
                      className="tabf3"
                      name="form-field-name"
                      value={this.state.selectOP2}
                      options={this.state.options}
					  searchable={false}
                      onChange={this.changeSelect2.bind(this)}
        />
		
			
    </TabPanel>
    <TabPanel>
      <Select
                      className="tabs1"
                      name="form-field-name"
                      value={this.state.selectOP2}
                      options={this.state.options}
					  searchable={false}
                      onChange={this.changeSelect2.bind(this)}
        />
		
		<Select
                      className="tabs2"
                      name="form-field-name"
                      value={this.state.selectOP2}
                      options={this.state.options}
					  searchable={false}
                      onChange={this.changeSelect2.bind(this)}
        />
		
		<Select
                      className="tabs3"
                      name="form-field-name"
                      value={this.state.selectOP2}
                      options={this.state.options}
					  searchable={false}
                      onChange={this.changeSelect2.bind(this)}
        />
		
		<Select
                      className="tabs4"
                      name="form-field-name"
                      value={this.state.selectOP2}
                      options={this.state.options}
					  searchable={false}
                      onChange={this.changeSelect2.bind(this)}
        />
    </TabPanel>
	<TabPanel>
    <Select
                      className="tabf1"
                      name="form-field-name"
                      value={this.state.selectOP2}
                      options={this.state.options}
					  searchable={false}
                      onChange={this.changeSelect2.bind(this)}
        />
		
		<Select
                      className="tabf2"
                      name="form-field-name"
                      value={this.state.selectOP2}
                      options={this.state.options}
					  searchable={false}
                      onChange={this.changeSelect2.bind(this)}
        />
		
		<Select
                      className="tabf3"
                      name="form-field-name"
                      value={this.state.selectOP2}
                      options={this.state.options}
					  searchable={false}
                      onChange={this.changeSelect2.bind(this)}
        />
    </TabPanel>
	<TabPanel>
      <Select
                      className="tabl1"
                      name="form-field-name"
                      value={this.state.selectOP2}
                      options={this.state.options}
					  searchable={false}
                      onChange={this.changeSelect2.bind(this)}
        />
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
			<div><input type="number"/></div>
			</div>
			<div className="autoretryright">
			<div>Wait before each retry attempt for </div>
			<div><input type="number"/></div>
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
	<div><label><input type="checkbox" checked name="dva"/> Run backup job when i click add</label></div>
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

    add () {
      console.log('addd')
    }

    openWiz3() {
      this.setState({openWiz3:true})
    }

    closeWiz3() {
      this.setState({openWiz3:false})
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
                      <div className="gt-right"><a className="close-pop" onClick={this.close.bind(this)}>X</a></div>

                    </div>
                    <div className="body-popup gt-clear">
                    <div className="pagination-buble gt-left">
                      {this.renderBubbles()}
                      <div className="titles-settings gt-left">
                        <div>General <br/> Settings</div>
                        <div className="mar69px">Assign <br/> VM's</div>
                        <div className="mar69px">Backup <br/> Destination</div>
                        <div className="mar69px">Configure <br/> Shedule</div>
                        <div className="mar69px">Review <br/> Summary</div>
                      </div>
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
              <SWizard open={this.state.openWiz3} close={this.closeWiz3.bind(this)}/>
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
export default connect(mapStateToProps, mapDispatchToProps)(BackWiz);
