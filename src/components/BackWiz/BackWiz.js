import React, { Component,  PropTypes} from 'react'
import styles from './styles.scss';
import { connect} from 'react-redux';
import { Route, Switch,Link,NavLink,withRouter,  BrowserRouter as Router } from 'react-router-dom';
import Select from 'react-select';


class BackWiz extends Component {
    constructor(props) {
        super(props)


        this.state = {

          page:'1',

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
		<div>Job Name:</div>
		<input type="text" />
		<div>Job Name:</div>
		<textarea></textarea>
		
	</div>
	)
	}
	
	window2(){
	return(
	<div>
		
		<div className="zagname">Assign VMs</div>
		<div>Total VMs in cluster: 254</div>
		<div>Selected objects: 5</div>
		<div className="iconboxtbsearch">
			<div className="addic">Add</div>
			<div className="removeic">Remove</div>
			<div className="exclusionsic">Exclusions</div>
			<div className="searchiccont">
				<input placeholder="Search" type="text"/><input type="button"/>
			</div>
		</div>
		
		
	</div>
	)
	
	}
	window3(){
		
		return(
	<div>
		
		<div className="zagname">Backup Destination</div>
		<div>Selected VMs: 24</div>
		<div>Aproximate Backup size: 954 GB</div>
		
		<div>Backup repository:</div>
		<Select
                      className="repo1"
                      name="form-field-name"
                      value={this.state.selectOP2}
                      options={this.state.options}
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
	    </div>
			)
	}
	window5(){ 
	
	}

	
	
    renderPage () {
      if (this.state.page == 1) {
        return (<div>{this.window1()}</div>)
      }
      if (this.state.page == 2) {
        return (<div>{this.window2()}</div>)
      }
      if (this.state.page == 3) {
        return (<div>{this.window3()}</div>)
      }
      if (this.state.page == 4) {
        return (<div>{this.window4()}</div>)
      }
      if (this.state.page == 5) {
        return (<div>{this.window5()}</div>)
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
