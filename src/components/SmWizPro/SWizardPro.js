import React, { Component,  PropTypes} from 'react'
import styles from './styles.scss';
import { connect} from 'react-redux';
import { Route, Switch,Link,NavLink,withRouter,  BrowserRouter as Router } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import CheckboxTree from 'react-checkbox-tree';
import { GetVmListDetail } from '../../containers/Protected/ProtectedAction';
var bytes = require('bytes');
class SWizardPro extends Component {
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
	
      if (nextProps.vmsdetail) {
     this.setState({array:nextProps.vmsdetail})


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


    choosen(id,date,type,size) {
      this.setState({choosen:{id:id,date:date,type:type,size:size}})
    }




    render(){
        var elemns = this.state.array || []
        return (
          <div className="modalWizPro1">
              {this.props.open ? (<div className="freeze">
                  <div className="pop-up-windowsmall">
                      <div className="pop-up-header">
                        <div className="gt-left pop-up-h-title">Backups Browser</div>
                        <div className="gt-right"><a className="close-pop" onClick={this.close.bind(this)}></a></div>
                      </div>
                      <div className="body-popup3 gt-clear">
                        <div className="popup3-title">
                          Select virtual machine:
                        </div>
                        <div className="popup3-con">
                          <div className="tbls12 clear-gt">
                            <table>
                              <thead>
                                <tr>
                                  <th>Date</th>
                                  <th>Type</th>
                                  <th>Size</th>
                                 
                                </tr>
                              </thead>
                              <tbody>
                                {elemns.map((item,index) => (
                                    <tr onClick={this.choosen.bind(this,item.Id,item.date,item.type,item.backupSizeBytes)} key={index}>
                                      <td>{item.date}</td>
                                      <td>{item.type}</td>
                                      <td>{bytes(item.backupSizeBytes, {unitSeparator: ' ', thousandsSeparator: ' '})}</td>
                                     
                                    </tr>

                                ))}
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
              </div>) : (null) }

              </div>

        )
    }
}
const mapDispatchToProps = function(dispatch) {

    return {

      GetVmListDetail: (id) => dispatch(GetVmListDetail(id)),

    }
}

function mapStateToProps(state) {


    return {

       vmsdetail:state.toJS().ProtectedReducer.vmsdetail,

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SWizardPro);
