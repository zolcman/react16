import React, { Component,  PropTypes} from 'react'
import styles from './styles.scss';
import { connect} from 'react-redux';
import { Route, Switch,Link,NavLink,withRouter,  BrowserRouter as Router } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import CheckboxTree from 'react-checkbox-tree';

var bytes = require('bytes');


class SelectContainerWiz2 extends Component {
    constructor(props) {
        super(props)


        this.state = {

          page:'1',
          finish:false,
        //  tree:[{
         //     value: 'mars',
          //    label: 'Mars',
           //       children: [
           //         { value: 'phobos', label: 'Phobos' },
             //       { value: 'deimos', label: 'Deimos' },
             //           ],
             //   }],
             tree:[],
                checked: [],
            expanded: [],

			
			
        }
    }

    componentDidMount() {

    


    }

    componentWillReceiveProps(nextProps) {

		
	
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

	
	
	
      $('.childtable').on('click', function(){
        $('.childtable').removeClass('selected-green-for-table');
        $(this).addClass('selected-green-for-table')
    
      
        });

    }


    saveId(val) {
      console.log(val);
    }

    
  hideOrShow(value,checked) {
    
        
      

          let  positiveArr112 = this.state.tree.map(function(item) {
            return ( (item.value == value) ? ( (checked == true) ?
             ({'label':item.label,'value':item.value,'children':item.children,'expand':false})
             :({'label':item.label,'value':item.value,'children':item.children,'expand':true})
       
            )
             : ({'label':item.label,'value':item.value,'children':item.children,'expand':item.expand})
           );
         });
          
    
          this.setState({tree:positiveArr112})
        
        }


    render(){
        var elemns = this.state.array || []
        let loopArray =this.state.tree ||   [];
        return (
          <div className="modalWizPro122">
              {this.props.open ? (<div className="freeze">
                  <div className="pop-up-windowsmall">
                      <div className="pop-up-header">
                        <div className="gt-left pop-up-h-title">Select Container</div>
                        <div className="gt-right"><a className="close-pop" onClick={this.close.bind(this)}></a></div>
                      </div>
                      <div className="body-popup3 gt-clear">
                        <div className="gt-clear heigth30px">
                          <div className="gt-left">
                            <div className="popup3-title">
                            Select Container
                            </div>
                          </div>
                          <div className="gt-right">

                        

                          </div>
                        </div>
                        
                      
                        <div className="consteptwo">
                        <table className="standart-table">
                        <thead>
                          <tr>
                            <th className="jq-2"> Name</th>
                            
                          </tr>
                        </thead>
                        
                      </table>
                      <div className="looper">
                          
                          {loopArray.map((item,index) => (
                            <div className="loop-lvl1 gt-clear">
                                   <div className={(item.expand) ? ('hider minus'):('hider plus')} onClick={this.hideOrShow.bind(this,item.value,item.expand)}>
                                    <div className="col-4 back_upicon jg-1">{item.label}</div>
                                    
                                   
                                   </div>
                                  {
                                     (item.expand) ?
                                      (<div className="loop-lvl2 ">
                                   {item.children.map((child,index) => (
                
                                      <div onClick={this.saveId.bind(this,child.label)} className="gt-clear childtable text-alignCenter">
                                        <div className="gt-left jg-3 vm-icon col-4">{child.label}</div>
                                       
                                      </div>
                
                                      ))}
                                   </div>)
                                   :
                                   (null)
                                   }
                                   
                            </div>
                            ))}
                          
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
export default connect(mapStateToProps, mapDispatchToProps)(SelectContainerWiz2);
