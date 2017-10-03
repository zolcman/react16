import React, { Component,  PropTypes} from 'react'
import styles from './styles.scss';
import { connect} from 'react-redux';



class Dashboard extends Component {
    constructor(props) {
        super(props)

        this.state = {


    }
}
    componentDidMount() {

    }



    render(){


        return (
        <div className="container">
		 
			<div className="leftclmn">
				<div className="sqare">
				<div className="sqareheading">Protection Status</div>
				</div>
				<div className="sqare">
				<div className="sqareheading">Protection Status</div>
				</div>
				<div className="sqare">
				<div className="sqareheading">Protection Status</div>
				</div>
				<div className="sqare">
				<div className="sqareheading">Protection Status</div>
				</div>
				<div className="sqarestats">
				<div className="sqareheading">Performance Statistics</div>
				</div>
			</div>
			<div className="rightclmn">right</div>
				
			
			
       </div>




        )
    }
}
const mapDispatchToProps = function(dispatch) {
    return {





    }
}

function mapStateToProps(state) {

//console.log(state.Reducer.emulate);
    return {


    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
