import React, { Component,  PropTypes} from 'react'
import styles from './styles.scss';
import { connect} from 'react-redux';
import { Route, Switch,Link,NavLink,withRouter,  BrowserRouter as Router } from 'react-router-dom';
import { AddSettingsNewServer } from '../../containers/Settings/SettingsAction';
import { EditSettingsNewServer } from '../../containers/Settings/SettingsAction';
import { clearDataFromServerDetail } from '../../containers/Settings/SettingsAction';

class SettingsAddVeeamServerWiz extends Component {
    constructor(props) {
        super(props)


        this.state = {
            disabledbtn:true,
            port:10006,
            Ip:'',
            userName:'',
            password:'',
            description:'',
        }
    }

    componentDidMount() {

    


    }

    componentWillReceiveProps(nextProps) {
        
        if (nextProps.detailed_info) {
            this.setState({
                Ip:nextProps.detailed_info.ip,
                port:nextProps.detailed_info.port,
                userName:nextProps.detailed_info.userName,
                password:nextProps.detailed_info.password,
                IdToUpdate:nextProps.detailed_info.Id,
                description:nextProps.detailed_info.description,
                disabledbtn:false})
                this.props.clearDataFromServerDetail();
        }
        
	
     }




    close() {
       this.setState({ Ip:'',  port:'', userName:'', password:'', IdToUpdate:'',  description:'',disabledbtn:true}) 
      this.props.close();


    }




    add () {

       

        let objs = { 
            ip:this.state.Ip,
            port:this.state.port,
            userName:this.state.userName,
            password:this.state.password,
            description:this.state.description,
            
            name: this.state.Ip,
            ["@odata.type"]: "string",
        }
    
      this.props.AddSettingsNewServer(objs)
      this.setState({ Ip:'',  port:'', userName:'', password:'', IdToUpdate:'',  description:''}) 
      this.props.close();
      
    }

    Edit() {
        let objs = {
            ip:this.state.Ip,
            port:this.state.port,
            userName:this.state.userName,
            password:this.state.password,
            description:this.state.description,
            name: this.state.Ip,
            ["@odata.type"]: "string",
        }
    
      this.props.EditSettingsNewServer(objs,this.state.IdToUpdate)
      this.setState({ Ip:'',  port:'', userName:'', password:'', IdToUpdate:'',  description:''}) 
      this.props.close();
    }


    componentDidUpdate () {


    }

    empty () {
        if (!this.state.Ip || !this.state.port  || !this.state.userName || !this.state.password) {
        this.setState({disabledbtn:true})
        console.log('first condidtion')
        }

        if (this.state.Ip && this.state.port  && this.state.userName && this.state.password) {
            this.setState({disabledbtn:false})
            console.log('second condidtion')
        }
    }


    render(){
       
        return (
          <div className="modalWizPro156">
              {this.props.open ? (<div className="freeze">
                  <div className="pop-up-windowsmall">
                      <div className="pop-up-header">
                          {this.props.editable ? (<div className="gt-left pop-up-h-title">Edit Veeam Server</div>):(<div className="gt-left pop-up-h-title">Add Veeam Server</div>)}
                        
                        <div className="gt-right"><a className="close-pop" onClick={this.close.bind(this)}></a></div>
                      </div>
                      <div className="body-popup3 gt-clear">

                      <div className="gt-clear row-label-input2">
                             <div className="gt-left j-1">
                                    DNS Name or IP:
                            </div>
                            <div className="gt-right">
                                 <input onChange={(e)=>{this.setState({Ip:e.target.value},()=>{this.empty()})}} value={this.state.Ip}/>
                            </div>
                    </div>
                    <div className="gt-clear row-label-input2">
                             <div className="gt-left j-1">
                                   Port:
                            </div>
                            <div className="gt-right">
                                 <input type="number" onChange={(e)=>{this.setState({port:e.target.value},()=>{this.empty()})}} value={this.state.port}/>
                            </div>
                    </div>
                    <div className="gt-clear row-label-input2">
                             <div className="gt-left j-1">
                                    Description:
                            </div>
                            <div className="gt-right">
                                 <input onChange={(e)=>{this.setState({description:e.target.value},()=>{this.empty()})}} value={this.state.description}/>
                            </div>
                    </div>
                    <div className="gt-clear row-label-input2">
                             <div className="gt-left j-1">
                                    User Name:
                            </div>
                            <div className="gt-right">
                                 <input onChange={(e)=>{this.setState({userName:e.target.value},()=>{this.empty()})}} value={this.state.userName}/>
                            </div>
                    </div>
                    <div className="gt-clear row-label-input2">
                             <div className="gt-left j-1">
                                    Password:
                            </div>
                            <div className="gt-right">
                                 <input type="password" value={this.state.password}  onChange={(e)=>{this.setState({password:e.target.value},()=>{this.empty()})}}/>
                            </div>
                    </div>
                    {this.state.disabledbtn ? (
                         this.props.editable ? (<a className="add-serv-btn disabled">Edit</a>):(<a  className="add-serv-btn disabled">Add</a>)
                    ): 
                    
                    (
                    this.props.editable ? (<a onClick={this.Edit.bind(this)} className="add-serv-btn">Edit</a>):(<a onClick={this.add.bind(this)} className="add-serv-btn">Add</a>)
                    )}
                    
                    
                      </div>
                  </div>
              </div>) : (null) }

              </div>

        )
    }
}
const mapDispatchToProps = function(dispatch) {

    return {

        AddSettingsNewServer: (objs) => dispatch(AddSettingsNewServer(objs)),
        EditSettingsNewServer: (objs,id) => dispatch(EditSettingsNewServer(objs,id)),
        clearDataFromServerDetail: () => dispatch(clearDataFromServerDetail()),
        
    }
}

function mapStateToProps(state) {


    return {

        detailed_info:state.toJS().SettingsReducer.detailed_info,
        

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SettingsAddVeeamServerWiz);
