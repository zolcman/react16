import React, { Component,  PropTypes} from 'react'
import styles from './styles.scss';
import { connect} from 'react-redux';
import { Route, Switch,Link,NavLink,withRouter,  BrowserRouter as Router } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

class SWizard extends Component {
    constructor(props) {
        super(props)


        this.state = {

          page:'4',
          finish:false,

        }
    }

    componentDidMount() {




    }



    close() {
      this.setState({page:1}) // binded when all ok change to 1
      this.props.close();


    }




    add () {
      console.log('addd')
    }









    render(){
      console.log(this.props.vmid)

        return (
          <div>
              {this.props.open ? (<div className="freeze">
                  <div className="pop-up-windowsmall">
                      <div className="pop-up-header">
                        <div className="gt-left pop-up-h-title">Add new</div>
                        <div className="gt-right"><a className="close-pop" onClick={this.close.bind(this)}>X</a></div>
                      </div>
                      <div className="body-popup3 gt-clear">111</div>
                  </div>
              </div>) : (null) }

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
export default connect(mapStateToProps, mapDispatchToProps)(SWizard);
