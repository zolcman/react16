import React, { Component,  PropTypes} from 'react'
import styles from './styles.scss';
import { connect} from 'react-redux';
import { Route, Switch,Link,NavLink,withRouter,  BrowserRouter as Router } from 'react-router-dom';
import { AddSettingsCluster } from '../../containers/Settings/SettingsAction';
import { EditSettingsCluster } from '../../containers/Settings/SettingsAction';
import { clearDataFromClusterDetail } from '../../containers/Settings/SettingsAction';

class SettingsAddAHVCluster extends Component {
    constructor(props) {
        super(props)


        this.state = {
            disabledbtn:true,
            port:9440,
            Ip:'',
            userName:'',
            password:'',
            description:'',
            
        }
    }

    componentDidMount() {

        

        
        
        

    }

    componentWillReceiveProps(nextProps) {
        
        
        if (nextProps.cluster_detail) {
            console.log('runthis')
            this.setState({
                Ip:nextProps.cluster_detail.ip,
                port:nextProps.cluster_detail.port,
                userName:nextProps.cluster_detail.userName,
                password:nextProps.cluster_detail.password,
                IdToUpdate:nextProps.cluster_detail.Id,
                description:nextProps.cluster_detail.description,
                disabledbtn:false
                })
                this.props.clearDataFromClusterDetail();  

                
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
            console.log(objs)
          this.props.AddSettingsCluster(objs)
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
            
         this.props.EditSettingsCluster(objs,this.state.IdToUpdate)
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
          <div className="modalWizPro157">
              {this.props.open ? (<div className="freeze">
                  <div className="pop-up-windowsmall">
                  <form > 
                      <div className="pop-up-header">
                       
                        {this.props.editable ? (<div className="gt-left pop-up-h-title">Edit AHV Cluster</div>):(<div className="gt-left pop-up-h-title">Add AHV Cluster</div>)}
                        <div className="gt-right"><a className="close-pop" onClick={this.close.bind(this)}></a></div>
                      </div>
                      <div className="body-popup3 gt-clear">
                      <div className="gt-clear row-label-input2">
                             <div className="gt-left j-1">
                                   Cluster name or IP:
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
                         this.props.editable ? (<a className="add-serv-btn disabled">Save</a>):(<a  className="add-serv-btn disabled">Add</a>)
                    ): 
                    
                    (
                    this.props.editable ? 
                    (<button type="submit" onClick={this.Edit.bind(this)} className="add-serv-btn">Save</button>):
                    (<button type="submit" onClick={this.add.bind(this)} className="add-serv-btn">Add</button>)
                    )}
                      </div>
                      </form>
                  </div>
              </div>) : (null) }

              </div>

        )
    }
}
const mapDispatchToProps = function(dispatch) {

    return {


        AddSettingsCluster: (objs) => dispatch(AddSettingsCluster(objs)),
        EditSettingsCluster: (objs,id) => dispatch(EditSettingsCluster(objs,id)),
        clearDataFromClusterDetail: () => dispatch(clearDataFromClusterDetail()),
        
        
        
    }
}

function mapStateToProps(state) {


    return {
        cluster_detail:state.toJS().SettingsReducer.cluster_detail,
        

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SettingsAddAHVCluster);
