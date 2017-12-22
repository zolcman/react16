import React, { Component} from 'react'
import styles from './styles.scss';
import { connect} from 'react-redux';
//import { Route, Switch,Link,NavLink,withRouter,  BrowserRouter as Router } from 'react-router-dom';
import Script from 'react-load-script';
import { ShowAlert, HideAlert } from '../Alert/AlertAction'

class Clock extends Component {
    constructor(props) {
        super(props)

		this.time = '';

        this.state = {



        }
    }


    componentDidMount() {
		var self = this;
		
		this.setState({changef:this.props.currentTime})
		
			$('.clockpicker').clockpicker({

				autoclose: true,
				
			})
		//	.find('input').change(function(){
		//		console.log(this.value)
			//   self.props.time(this.value);
			//   self.time = this.value
			//   self.setState({changef:this.value},()=>{console.log(self.state.changef)})
			//});
	//	var input = $('#single-input').clockpicker({
		//	placement: 'bottom',
		//	align: 'left',
		//	autoclose: true,
		//	'default': 'now',
			
	//	});
		
		$('.clockpicker-with-callbacks').clockpicker({
				donetext: 'Done',
				init: function() {
					console.log("colorpicker initiated");
				},
				beforeShow: function() {
					console.log("before show");
				},
				afterShow: function() {
					console.log("after show");
				},
				beforeHide: function() {
					console.log("before hide");
				},
				afterHide: function() {
					console.log("after hide");
				},
				beforeHourSelect: function() {
					console.log("before hour selected");
				},
				afterHourSelect: function() {
					console.log("after hour selected");
				},
				beforeDone: function() {
					console.log("before done");
				},
				afterDone: function() {
					console.log("after done");
				}
			})
			.find('input').change(function(){
			//	console.log(this.value);
			});
		}
	componentDidUpdate() {
    

	}

handleScriptCreate() {
  this.setState({ scriptLoaded: false })
}

handleScriptError() {
  this.setState({ scriptError: true })
}

handleScriptLoad() {
  this.setState({ scriptLoaded: true })
}

getValue() {
	

 var value = ( $('.getvalue').val());
 console.log(value)
 var self = this;
 var regexp = /^(?:[0-1]?[0-9]|2[0-3])(?::[0-5][0-9])?$/;
 let result =    regexp.test(value)

 if (result) {
	this.setState({changef:value})
	self.props.time(value);
	return
 }
 else {
	 console.log('error')
	 this.setState({changef:'12:00'})
	 this.props.dispatch(ShowAlert('warning','incorrect date',true,false));
 }
 
 
}

changeTime(e) {
	console.log(this.time)
	this.setState({changef:e.target.value})
}

    render(){

		var time =  this.state.changef 
		console.log(this.state.changef);
        return (
			<div >
			<Script
      url="https://cdnjs.cloudflare.com/ajax/libs/clockpicker/0.0.7/bootstrap-clockpicker.min.js"
      onCreate={this.handleScriptCreate.bind(this)}
      onError={this.handleScriptError.bind(this)}
      onLoad={this.handleScriptLoad.bind(this)}

    /> 





          <div className="form-group clockpickerc">
		<div className="input-group clockpicker " data-placement="bottom" data-align="left" data-donetext="Done">
			<input  type="text" className="form-control getvalue" onBlur={this.getValue.bind(this)} onChange={this.changeTime.bind(this)} value={time}/>
			<span className="input-group-addon">
				<span className="glyphicon glyphicon-time"></span>
			</span>
		</div>

	</div>
	
        </div>)
    }
}
const mapDispatchToProps = function(dispatch) {

    return {
		dispatch:dispatch,


    }
}

function mapStateToProps(state) {


    return {


    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Clock);
