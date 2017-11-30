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

			
			
        }
    }

    componentDidMount() {

    
    

    }

    componentWillReceiveProps(nextProps) {

     // this.setState({name:this.props.name})
      
     }





    close() {
      this.setState({page:1}) // binded when all ok change to 1
      this.props.close();
      this.setState({name:'',pre:'',su:''})

    }



    add () {
      this.props.close();
      let name = this.state.pre + this.state.name + this.state.su
      this.props.getName(name)
      this.setState({name:'',pre:'',su:''})
    }


    componentDidUpdate () {

    }


   


    render(){
       
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
                          <input placeholder="enter new name" onChange={(e)=> {this.setState({name:e.target.value})}} value={this.state.name} type="text"/>
                          <div className="lp-2">Add prefix</div>
                          <input onChange={(e)=> {this.setState({pre:e.target.value})}} value={this.state.pre} placeholder="_new" type="text"/>
                          <div  className="lp-2" >Add sufix</div>
                          <input onChange={(e)=> {this.setState({su:e.target.value})}} value={this.state.su} placeholder="_restored" type="text"/>
                        </div>
                        <div className="btns-group">


                          
                          <a onClick={this.add.bind(this)} className="go-btn lp-1 go-btn-global mr10r">Add</a>

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
