import React, { Component,  PropTypes} from 'react'
import styles from './styles.scss';
import { connect} from 'react-redux';
import { Link } from 'react-router-dom';


class Backup extends Component {
    constructor(props) {
        super(props)

        this.state = {


    }
}
    componentDidMount() {

    }



    render(){


        return (
          <div>
            <div className="filters">
              <div className="filter-wrapper">
              <div className="breadcrumbs">
                <Link to='/'>Home</Link> / Backup Jobs
              </div>
              <div className="filter-blocks gt-clear">

              </div>
            </div>
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


    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Backup);
