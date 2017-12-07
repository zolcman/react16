import React, { Component,  PropTypes} from 'react'
import styles from './styles.scss';
import { connect} from 'react-redux';



class Spinner extends Component {
    constructor(props) {
        super(props)


        this.state = {



        }
    }


    componentDidMount() {
	//	var height = $(this.props.containerToCenter).outerHeight();
		//console.log(height);
		}

	


    render(){
	

        return (
			<div className="spinner-wrap">
			<div style={{'margin-top':this.props.center}} className="spinner">

			</div>
		
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

export default connect(mapStateToProps, mapDispatchToProps)(Spinner);
