import React, { Component,  PropTypes} from 'react'

import { connect} from 'react-redux';
import Upload from "../../components/Upload/Upload"
import { Route, Switch } from 'react-router-dom';
//import Backup from '../Backup/Backup';
//import Protected from '../Protected/Protected';
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
          <div><Upload/>
         {/*  <Link  className="link-table" to='/alert/detail'>sssss</Link> 

         <Switch>
             <Route exact path="/alert" component={Backup} />
             <Route exact path="/alert/detail" component={Protected}/>
            </Switch> */}
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
export default connect(mapStateToProps, mapDispatchToProps)(Alert);
