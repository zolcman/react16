import React, { Component,  PropTypes} from 'react'

import { connect} from 'react-redux';



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
          <div>Backup</div>
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
