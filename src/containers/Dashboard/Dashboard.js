import React, { Component,  PropTypes} from 'react'
import styles from './styles.scss';
import { connect} from 'react-redux';



class Dashboard extends Component {
    constructor(props) {
        super(props)

        this.state = {
			
			log:[
				{id:1,name:'Backup job "Test Backup Job" has finished successfully at 17.09.2017'},{id:2,name:'Backup job "Test Backup Job" has finished successfully at 17.09.2017'},
				{id:2,name:'Backup job "Test Backup Job" has finished successfully at 17.09.2017'}
				],


    }
}
    componentDidMount() {

    }


	componentWillReceiveProps(nextProps) {
		console.log(nextProps.showInstall)
		if(nextProps.showInstall) {
			this.setState({showInstall:true})
		}
		if(!nextProps.showInstall) {
			this.setState({showInstall:false})
		}
	 }


    render(){


        return (
        <div className="container dashmrgn">
			{(this.props.showInstall)? (<div></div>):(<div></div>)}
			<div className="leftclmn">
				<div className="sqare">
				<div className="sqareheading">Protection Status</div>
				</div>
				<div className="sqare">
				<div className="sqareheading">Job Status</div>
				</div>
				<div className="sqare">
				<div className="sqareheading">Repository Status</div>
				</div>
				<div className="sqare">
				<div className="sqareheading">Backup Server Status</div> 
				</div>
				<div className="sqarestats">
				<div className="sqareheading">Performance Statistics</div>
				</div>
			</div>
			<div className="rightclmn">
			<div className="sqareheading">Event Log</div>
			
			<ul className="eventlog">
                                        {this.state.log.map((itembc,index) => (
                                            <li className="eventlogli" key={index}>{itembc.name}</li>

                                        ))}
                                      </ul>
			
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

//console.log(state.Reducer.emulate);
    return {

		showInstall:state.toJS().LoginReducer.showInstall,

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
