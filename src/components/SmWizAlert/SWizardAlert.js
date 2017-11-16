import React, { Component,  PropTypes} from 'react'
import styles from './styles.scss';
import { connect} from 'react-redux';
import { Route, Switch,Link,NavLink,withRouter,  BrowserRouter as Router } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import CheckboxTree from 'react-checkbox-tree';
import { GetVmListDetail } from '../../containers/Protected/ProtectedAction';

class SWizardAlert extends Component {
    constructor(props) {
        super(props)


        this.state = {

          page:'1',
          finish:false,
          tree:[{
              value: 'mars',
              label: 'Mars',
                  children: [
                    { value: 'phobos', label: 'Phobos' },
                    { value: 'deimos', label: 'Deimos' },
                        ],
                }],
                checked: [],
            expanded: [],

        }
    }

    componentDidMount() {




    }

    componentWillReceiveProps(nextProps) {

     }








    close() {
      this.setState({page:1}) // binded when all ok change to 1
      this.props.close();


    }




    add () {
      this.props.close();
      this.props.gopage4();
    }



    render(){
        var elemns = this.state.array || []
        return (
          <div className="modalWizPro12">
              {this.props.open ? (<div className="freeze">
                  <div className="pop-up-windowsmall">
                      <div className="pop-up-header">
                        <div className="gt-left pop-up-h-title">
                          The following existing VMs<br/>will be deleted from the infrastructure.
                        </div>
                        <div className="gt-right"><a className="close-pop" onClick={this.close.bind(this)}></a></div>
                      </div>
                      <div className="body-popup3 gt-clear">
                        <div className="popup3-title">

                        </div>
                        <div className="popup3-con">
                          <div className="tbls123 clear-gt">
                            <table>
                              <thead>
                                <tr>
                                  <th>VM Name</th>

                                </tr>
                              </thead>
                              <tbody>

                                    <tr >
                                      <td>{this.props.nameto}</td>

                                    </tr>


                              </tbody>
                            </table>
                          </div>
                        </div>
                        <div className="btns-group">

                          <a onClick={this.add.bind(this)} className="go-btn gt-right go-btn-global mar154px ">OK</a>
                          <a onClick={this.close.bind(this)} className="go-btn gt-right go-btn-global mr10r">Hide VM(s)</a>


                        </div>
                      </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(SWizardAlert);
