import React, { Component,  PropTypes} from 'react'
import styles from './styles.scss';
import { connect} from 'react-redux';
import { Route, Switch,Link,NavLink,withRouter,  BrowserRouter as Router } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import CheckboxTree from 'react-checkbox-tree';
import { GetVmListDetail } from '../../containers/Protected/ProtectedAction';
import SelectContainerWiz from '../SelectContainerWiz/SelectContainerWiz';
var bytes = require('bytes');
import Select from 'react-select';


class VirtualDiskProperties extends Component {
    constructor(props) {
        super(props)


        this.state = {

         
          closeWizPRO:false,
         

        }
    }

    componentDidMount() {


    }

    componentWillReceiveProps(nextProps) {

		
     }


    close() {
     
      this.props.close();


    }




    add () {
      this.props.close();
    }


    componentDidUpdate () {

	
    }

    closeWizPRO() {
      this.setState({closeWizPRO:false})
    }

    openWiz() {
      this.setState({closeWizPRO:true})
    }


 

   chNode(val) {

    this.setState({node:val})

        }

    render(){
        var elemns = this.state.array || []
        return (
          <div className="modalWizPro1">
              {this.props.open ? (<div className="freeze">
                  <div className="pop-up-windowsmall">
                      <div className="pop-up-header">
                        <div className="gt-left pop-up-h-title">Virtual Disk Properties</div>
                        <div className="gt-right"><a className="close-pop" onClick={this.close.bind(this)}></a></div>
                      </div>
                      <div className="body-popup3 gt-clear">
                        
                        
                        <div className="popup3-con-VirtualDiskProperties">
                          <div className="q-1">
                          Container:
                          </div>
                          <div className="gt-clear heigth43px">
                          <input className="gt-left virtualMachineInput w-1"/>
                           <a onClick={this.openWiz.bind(this)}  className="gt-right btns-browser-change ">Choose...</a>
                          </div>
                          <div className="grey-panel">
                            <span className="w-2">Container info:</span>
                            <span className="w-3">Capacity:</span>
                            <span className="w-4">10.9 GB</span>
                            <span className="w-3">Free space:</span>
                            <span className="w-6">8.1 TB</span>
                          </div>
                          <div className="gt-clearnew width100">
                            <div className="gt-left md-1">
                                 <div className="q-2">
                                   Disk Address
                                 </div>
                                 
                            </div>
                            <div className="gt-left md-2">
                            <Select
                                         className="repo1"

                                           name="form-field-name"
                                           value={this.state.node}
                                           options={this.state.nodes}
                                           searchable={false}
                                          onChange={this.chNode.bind(this)}
                                    />
                            </div>
                          </div>
                          
                         
                      <div className="grey-panel margintop6px">
                        <table className="tblMod-0">
                          <tbody>
                            <tr>
                              <td className="tblMod-1">Existing Device Properties:</td>
                              <td></td>
                            </tr>
                            <tr>
                              <td>Address:</td>
                              <td>SCSI 0:0 (hard disk 1)</td>
                            </tr>
                            <tr>
                              <td>UID:</td>
                              <td>[SATA HDD (RAID 0) ESXi-01] StarWind</td>
                            </tr>
                            <tr>
                              <td>Capacity:</td>
                              <td>10.0 GB</td>
                            </tr>
                            <tr>
                              <td>Container:</td>
                              <td>TestContainer</td>
                            </tr>
                          </tbody>
                        </table>
                        
                      </div>
                      <div className="gt-clearnew marbtm8px">
                        <div className="gt-left">
                        <div className="q-6">
                          Virtual disk restore result:
                        </div>
                        </div>
                        <div className="gt-left">
                        <div className="q-4">
                          Existing virtual disk will be replaced
                        </div>
                        </div>
                      </div>
                      <div className="grey-panel margintop23px">
                        <table className="tblMod-0">
                          <tbody>
                            <tr>
                              <td className="tblMod-1">New Device Properties:</td>
                              <td></td>
                            </tr>
                            <tr>
                              <td>Address:</td>
                              <td>SCSI 0:0 (hard disk 1)</td>
                            </tr>
                            <tr>
                              <td>UID:</td>
                              <td>[SATA HDD (RAID 0) ESXi-01] StarWind</td>
                            </tr>
                            <tr>
                              <td>Capacity:</td>
                              <td>10.0 GB</td>
                            </tr>
                            <tr>
                              <td>Container:</td>
                              <td>TestContainer</td>
                            </tr>
                          </tbody>
                        </table>
                        
                      </div>
                      
                        

                        </div>
                        <div className="btns-group">


                          <a onClick={this.close.bind(this)} className="go-btn gt-right go-btn-global ">Close</a>
                          <a onClick={this.add.bind(this)} className="go-btn gt-right go-btn-global mr10r">Add</a>

                        </div>
                      </div>
                  </div>
                  <SelectContainerWiz open={this.state.closeWizPRO} close={this.closeWizPRO.bind(this)}/>
              </div>) : (null) }

              </div>

        )
    }
}
const mapDispatchToProps = function(dispatch) {

    return {

    //  GetVmListDetail: (id) => dispatch(GetVmListDetail(id)),

    }
}

function mapStateToProps(state) {


    return {

    //  points:state.toJS().ProtectedReducer.points,

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(VirtualDiskProperties);
