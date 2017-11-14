import React, { Component,  PropTypes} from 'react'

import { connect} from 'react-redux';
import Upload from "../../components/Upload/Upload"


class Alert extends Component {
    constructor(props) {
        super(props)

        this.state = {


    }
}
    componentDidMount() {

    }



    render(){


        return (
          <div><Upload/></div>
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
export default connect(mapStateToProps, mapDispatchToProps)(Alert);
