import React, { Component} from 'react'
import styles from './styles.scss';
import { connect} from 'react-redux';
//import { Route, Switch,Link,NavLink,withRouter,  BrowserRouter as Router } from 'react-router-dom';
import Script from 'react-load-script';


class Clock extends Component {
    constructor(props) {
        super(props)


        this.state = {



        }
    }


    componentDidMount() {

		}
	componentDidUpdate() {
    var self = this;

	$('.clockpicker').clockpicker()
	.find('input').change(function(){
	   self.props.time(this.value);
	});
var input = $('#single-input').clockpicker({
	placement: 'bottom',
	align: 'left',
	autoclose: true,
	'default': 'now'
});

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
		console.log(this.value);
	});

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


    render(){

        return (
			<div >
			<Script
      url="https://cdnjs.cloudflare.com/ajax/libs/clockpicker/0.0.7/bootstrap-clockpicker.min.js"
      onCreate={this.handleScriptCreate.bind(this)}
      onError={this.handleScriptError.bind(this)}
      onLoad={this.handleScriptLoad.bind(this)}

    /> 





          <div className="form-group clockpickerc">
		<div className="input-group clockpicker" data-placement="bottom" data-align="left" data-donetext="Done">
			<input type="text" className="form-control" onChange={(e)=>{this.setState({changef:e.target.value})}} value={this.props.currentTime}/>
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



    }
}

function mapStateToProps(state) {


    return {


    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Clock);
