import React, { Component,  PropTypes} from 'react'
import styles from './styles.scss';
import { connect} from 'react-redux';
import { Route, Switch,Link,NavLink,withRouter,  BrowserRouter as Router } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import CheckboxTree from 'react-checkbox-tree';
import { GetVmListDetail } from '../../containers/Protected/ProtectedAction';
var bytes = require('bytes');


class RenameVMWiz extends Component {
    constructor(props) {
        super(props)


        this.state = {

          page:'1',
          finish:false,
          pre:'',
          su:'',
          checked5:false,
          checked6:false
			
			
        }
    }

    componentDidMount() {

    
    

    }

    componentWillReceiveProps(nextProps) {

      this.setState({name:this.props.name})
      this.setState({name:nextProps.name})
     }





    close() {
      this.setState({page:1}) // binded when all ok change to 1
      this.props.close();
      this.setState({name:'',pre:'',su:''})

    }



    add () {
      this.props.close();
      let name;
      if (this.state.checked5 && this.state.checked6) {
        name = this.state.pre + this.state.name + this.state.su
      }
      if (this.state.checked5 && !this.state.checked6) {
        name = this.state.pre + this.state.name
      }

      if (!this.state.checked5 && this.state.checked6) {
        name =  this.state.name + this.state.su
      }
      
      this.props.getName(name)
      this.setState({name:'',pre:'',su:'',checked5:false,checked6:false})
    }


    componentDidUpdate () {

    }


    checkPrefix() {
      if( this.state.checked5) {
        this.setState({checked5:false})
      }
      if( !this.state.checked5) {
        this.setState({checked5:true})
      }
    }

    checkSufix() {
      if( this.state.checked6) {
        this.setState({checked6:false})
      }
      if( !this.state.checked6) {
        this.setState({checked6:true})
      }
    }


    render(){
       console.log(this.props.name)
        return (
          <div className="modalWizPro1lp1">
              {this.props.open ? (<div className="freeze">
                  <div className="pop-up-windowsmall">
                      <div className="pop-up-header">
                        <div className="gt-left pop-up-h-title">Rename VM</div>
                        <div className="gt-right"><a className="close-pop" onClick={this.close.bind(this)}></a></div>
                      </div>
                      <div className="body-popup3 gt-clear">
                        <div className="gt-clear heigth30px">
                          <div className="gt-left">
                            
                          </div>
                          
                        </div>
                        
                        <div className="renamevm-con">
                        <div className="lp-2">Name:</div>
                          <input placeholder="enter new name" onChange={(e)=> {this.setState({name:e.target.value})}} value={ this.state.name} type="text"/>
                          <div className="lp-2">
                          <label><input type="checkbox" onChange={this.checkPrefix.bind(this)} checked={this.state.checked5} name="dva"/> Add prefix</label>
                          </div>
                          {(this.state.checked5)?(<input onChange={(e)=> {this.setState({pre:e.target.value})}} value={this.state.pre} placeholder="_new" type="text"/>)
                          :
                          (<input readOnly className="greybgf" value={this.state.pre} placeholder="_new" type="text"/>)
                          }
                          
                          <div  className="lp-2" >
                            <label><input type="checkbox" onChange={this.checkSufix.bind(this)} checked={this.state.checked6} name="dva"/> Add sufix</label>
                            </div>
                            {(this.state.checked6)?( <input onChange={(e)=> {this.setState({su:e.target.value})}} value={this.state.su} placeholder="_restored" type="text"/>
                          )
                          :
                          ( <input readOnly className="greybgf" value={this.state.su} placeholder="_restored" type="text"/>)
                          }
                         
                        </div>
                        <div className="btns-group">

                        <a onClick={this.add.bind(this)} className="go-btn lp-1 go-btn-global mr10r gt-left">Ok</a>
                        <a onClick={this.close.bind(this)} className="go-btn  go-btn-global mr10r gt-left">Cancel</a>
                          

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
export default connect(mapStateToProps, mapDispatchToProps)(RenameVMWiz);
