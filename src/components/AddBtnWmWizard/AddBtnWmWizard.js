import React, { Component,  PropTypes} from 'react'
import styles from './styles.scss';
import { connect} from 'react-redux';
import { Route, Switch,Link,NavLink,withRouter,  BrowserRouter as Router } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import CheckboxTree from 'react-checkbox-tree';
import { GetListOfPoliciesForAddBtn } from '../../containers/Protected/ProtectedAction';
var bytes = require('bytes');

class AddBtnWmWizard extends Component {
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
            choosen:[],

			
			//currentSelectedVmId: undefined
        }
    }

    componentDidMount() {

     this.props.GetListOfPoliciesForAddBtn();


    }

    
    componentDidUpdate() {
      $("span.rct-icon-check").parents('.react-checkbox-tree > ol > li').addClass('green');
      $("span.rct-icon-uncheck").parents('.react-checkbox-tree > ol > li').removeClass('green');
      $("span.rct-icon-check").parents('.react-checkbox-tree > ol > li > ol > li').addClass('green');
      $("span.rct-icon-uncheck").parents('.react-checkbox-tree > ol > li > ol > li').removeClass('green');



        $("body").click(function (el) {
            setTimeout(function(){

              var all = $("body").find(".rct-node");
              var visible = $("body").find(".rct-node:odd");
              all.removeClass ("green");
              all.removeClass ("red");
              all.removeClass ("white");
              all.addClass("red");
              visible.addClass("white");

              var halfcheck = $("body").find(".rct-node span.rct-icon-half-check").parent().parent().parent().parent();
              var selected = $("body").find(".rct-node span.rct-icon-check").parent().parent().parent().parent();
              selected.removeClass ("red");
              selected.removeClass ("white");
              selected.addClass('green');
              halfcheck.removeClass ("red");
              halfcheck.removeClass ("white");
              halfcheck.addClass('green');

            }, 0);
            });

}


    componentWillReceiveProps(nextProps) {

      if(nextProps.AddBtnList) {
        this.setState({array:nextProps.AddBtnList});
      //  console.log(nextProps.AddBtnList)
      }
		
     }








    close() {
      this.setState({page:1}) // binded when all ok change to 1
      this.props.close();
      this.setState({checked:[]});

    }




    add () {
      this.props.close();
      this.props.array(this.state.checked);
      this.setState({checked:[]});
    }



    onCheck(checked) {
     
     let difference = checked.filter(x => this.state.checked.indexOf(x) == -1);
     this.setState({checked:difference});
              
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
                          <div className="tbls12  heitauto clear-gt">
                            <table>
                              <thead>
                                <tr className="displayblock">
                                  <th className="width35">Job Name</th>
                                  <th>Last restore point</th>
                                  <th>VM count</th>
                                  <th>Restore Points</th>
                                </tr>
                              </thead>
                              <CheckboxTree
                                  nodes={elemns}
                                  checked={this.state.checked}
                                  expanded={this.state.expanded}
                                  onCheck={this.onCheck.bind(this)}
                                   onExpand={expanded => this.setState({ expanded })}
                                />
                          {/*     <div>
                              {elemns.map((item,index) => (
                                    <div>
                                      <div>{item.label}</div>
                                      <div>
                                      {item.children.map((items,index) => (
                                        <div>{items.label}</div>
                                      ))}
                                      </div>
                                    </div>

                                ))}
                              </div>
                                 <tbody>
                                {elemns.map((item,index) => (
                                    <tr onClick={this.choosen.bind(this,item.Id,item.date,item.type,item.backupSizeBytes)} key={index}>
                                      <td>{item.label}</td>
                                      <td>{item.type}</td>
                                      <td></td>
                                      <td></td>
                                    </tr>

                                ))}
                              </tbody> */} 
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

      GetListOfPoliciesForAddBtn: () => dispatch(GetListOfPoliciesForAddBtn()),

    }
}

function mapStateToProps(state) {


    return {

       AddBtnList:state.toJS().ProtectedReducer.listAddBtnWmsWizard,

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddBtnWmWizard);
