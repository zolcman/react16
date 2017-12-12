import React, { Component,  PropTypes} from 'react'
import styles from './styles.scss';
import { connect} from 'react-redux';
import { HideAlert } from './AlertAction'


class Alert extends Component {
    constructor(props) {
        super(props)


        this.state = {

      //  showAlert:true,

        }
    }


    componentDidMount() {
	//	var height = $(this.props.containerToCenter).outerHeight();
		//console.log(height);
		}

	
        componentWillReceiveProps(nextProps) {
            if (nextProps.showAlert) {
                this.setState({showAlert:nextProps.showAlert.ShowAlert})
                this.setState({alertType:nextProps.showAlert.type})
                this.setState({alertMess:nextProps.showAlert.message})
                this.setState({showReload:nextProps.showAlert.reloadbtn})
                console.log(nextProps.showAlert);
                if (nextProps.showAlert.autohide) {
                    var self = this;
                    setTimeout(function() {
                        self.props.HideAlert()
                    }, 5000);
                }
            }
         }

    alertBox() {
        return (
            <div className="inner-box">
                {this.state.alertMess}
                <br/>
                {this.state.showReload ? (<a className="reload-link" onClick={()=>{location.reload()}}>Reload page</a>):(null)}
                <a onClick={()=>{this.props.HideAlert()}} className="close-alert">X</a>
            </div>
        )
    }

    render(){
    
        console.log(this.state.showAlert)

        return (
			<div className={"alert-wrap" + ' ' + this.state.alertType}>
                {(this.state.showAlert) ? (this.alertBox()):(null)}
			</div>
		
		)
    }
}
const mapDispatchToProps = function(dispatch) {

    return {
        HideAlert: () => dispatch(HideAlert()),
        

    }
}

function mapStateToProps(state) {


    return {

        showAlert:state.toJS().AlertReducer.showAlert,

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Alert);
