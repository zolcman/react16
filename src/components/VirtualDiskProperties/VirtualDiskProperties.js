import React, { Component,  PropTypes} from 'react'
import styles from './styles.scss';
import { connect} from 'react-redux';
import { Route, Switch,Link,NavLink,withRouter,  BrowserRouter as Router } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import CheckboxTree from 'react-checkbox-tree';
import { GetVmListDetail } from '../../containers/Protected/ProtectedAction';
var bytes = require('bytes');
import Select from 'react-select';


class VirtualDiskProperties extends Component {
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
            nodes:[{label:'Same as source',value:'Repository 1'},{label:'Repository 2',value:'Repository 2'}],

			
			//currentSelectedVmId: undefined
        }
    }

    componentDidMount() {

     //this.props.GetVmListDetail(this.props.selectedVmId);


    }

    componentWillReceiveProps(nextProps) {

		//if(this.props.selectedVmId)
		//{
		//	this.props.GetVmListDetail(this.props.selectedVmId);
		//}
	
      if (nextProps.points) {
     this.setState({array:nextProps.points})


    }
     }








    close() {
      this.setState({page:1}) // binded when all ok change to 1
      this.props.close();


    }




    add () {
      this.props.close();
      this.props.array(this.state.choosen)
    }


    componentDidUpdate () {

	//if(this.state.currentSelectedVmId !== this.props.selectedVmId)
	//{
	//	this.props.GetVmListDetail(this.props.selectedVmId);
	//	this.setState({currentSelectedVmId:this.props.selectedVmId})
	//}
	
	
      $('.tbls12 tr').click(function (event) {
        $('.tbls12 tr').removeClass("selected-green");
        $(this).addClass( "selected-green" );
      });

    }


    choosen(date,id,size) {
      this.setState({choosen:{date:date,id:id,size:size}})
    }

    onCheck(checked) {
      
      let difference = checked.filter(x => this.state.checked.indexOf(x) == -1);
      this.setState({checked:difference});
               
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
                            Datastore:
                          </div>
                          <div className="gt-clear heigth50px">
                          <input className="gt-left virtualMachineInput w-1"/>
                           <a  className="gt-right btns-browser-change ">Choose...</a>
                          </div>
                          <div className="grey-panel">
                            <span className="w-2">Datastore info:</span>
                            <span className="w-3">Capacity:</span>
                            <span className="w-4">10.9 GB</span>
                            <span className="w-3">Free space:</span>
                            <span className="w-6">8.1 TB</span>
                          </div>
                          <div className="q-2">
                            Virtual device node
                          </div>
                          <Select
                      className="repo1"

                      name="form-field-name"
                      value={this.state.node}
                      options={this.state.nodes}
                      searchable={false}
                      onChange={this.chNode.bind(this)}
                      />
                      <div className="grey-panel margintop23px">
                        <table className="tblMod-0">
                          <tbody>
                            <tr>
                              <td className="tblMod-1">Device statistics</td>
                              <td></td>
                            </tr>
                            <tr>
                              <td>Virtual device node:</td>
                              <td>SCSI 0:0 (hard disk 1)</td>
                            </tr>
                            <tr>
                              <td>Disk file:</td>
                              <td>[SATA HDD (RAID 0) ESXi-01] StarWind</td>
                            </tr>
                            <tr>
                              <td>Capacity:</td>
                              <td>10.0 GB</td>
                            </tr>
                          </tbody>
                        </table>
                        
                      </div>
                      <div className="q-2">
                          Virtual disk restore result:
                        </div>
                        <div className="q-4">
                          Existing virtual disk will be replaced
                        </div>

                        </div>
                        <div className="btns-group">


                          <a onClick={this.close.bind(this)} className="go-btn gt-right go-btn-global ">Close</a>
                          <a onClick={this.add.bind(this)} className="go-btn gt-right go-btn-global mr10r">Add</a>

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

    //  GetVmListDetail: (id) => dispatch(GetVmListDetail(id)),

    }
}

function mapStateToProps(state) {


    return {

    //  points:state.toJS().ProtectedReducer.points,

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(VirtualDiskProperties);
