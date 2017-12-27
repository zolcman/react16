import React, { Component,  PropTypes} from 'react'
import styles from './styles.scss';
import { connect} from 'react-redux';
import { Route, Switch,Link,NavLink,withRouter,  BrowserRouter as Router } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import CheckboxTree from 'react-checkbox-tree';
import { Tree } from '../../containers/Backup/BackupAction';
import { TreeProtected } from '../../containers/Backup/BackupAction';


class SWizard extends Component {
    constructor(props) {
        super(props)


        this.state = {

          page:'4',
          finish:false,
          tree:[],
                checked: [],
            expanded: [],

        }
    }

    componentDidMount() {

     this.props.Tree('test1');


    }

    componentWillReceiveProps(nextProps) {

      if (nextProps.tree) {
     this.setState({tree:nextProps.tree})

    

}
     }



    close() {
        this.setState({checked:[]})
      this.setState({page:1}) // binded when all ok change to 1
      this.props.close();
      


    }




    add () {
        this.setState({checked:[]})
      this.props.close();
      if(this.state.checked41) {

     var result33 = this.state.checked[0].toString();
     let result2 = this.state.tree.map(item => ({
         ...item,
         children: item.children
            .filter(child => child.value.includes(result33))
       }))
        .filter(item => item.children.length > 0)

       //console.log(result2[0].children);

       
        this.props.arrayProtected(result2[0].children)
        this.setState({checked41:false})
        this.props.Tree('test1');
      }
      if(!this.state.checked41) {
        
        this.props.array(this.state.checked)
      }
      
      
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

onCheck(checked) {
//  console.log(checked)
       

if(this.state.checked41) {
    let difference = checked.filter(x => this.state.checked.indexOf(x) == -1);
    this.setState({checked:difference});
}
if (!this.state.checked41) {
    this.setState({ checked });
}

    }


reset () {
  this.setState({checked:[]})
}

check41 () {
    if( this.state.checked41) {
      this.setState({checked41:false});
      this.setState({checked:[]})
      this.props.Tree('test1');
    }
    if( !this.state.checked41) {
        this.setState({checked:[]})
      this.setState({checked41:true})
      this.props.TreeProtected('test1');
    }
  }


    render(){
      
        return (
          <div>
              {this.props.open ? (<div className="freeze">
                  <div className="pop-up-windowsmall">
                      <div className="pop-up-header">
                        <div className="gt-left pop-up-h-title">Add new</div>
                        <div className="gt-right"><a className="close-pop" onClick={this.close.bind(this)}></a></div>
                      </div>
                      <div className="body-popup3 gt-clear">
                        <div className="popup3-title">
                          Select Objects:
                        </div>
                        <div className="popup3-con">
                        {(this.state.checked41)?(<div className="hidecluster"></div>):(null)}
                        
                          <CheckboxTree
                            nameAsArray={true}
                nodes={this.state.tree}
                checked={this.state.checked}
                expanded={this.state.expanded}
                onCheck={this.onCheck.bind(this)}
                onExpand={expanded => this.setState({ expanded })}
            />

                        </div>
                        <div className="btns-group">


                          <a onClick={this.close.bind(this)} className="go-btn gt-right go-btn-global ">Close</a>
                          {(this.state.checked.length > 0) ? ( <a onClick={this.add.bind(this)} className="go-btn gt-right go-btn-global mr10r">Add</a>)
                          :
                          ( <a className="go-btn gt-right go-btn-global mr10r disabled">Add</a>)}
                         
                          <a onClick={this.reset.bind(this)} className="go-btn gt-right go-btn-global mr10r">Reset</a>
                          <div className="gt-right dynamicMode"><label><input onChange={this.check41.bind(this)} type="checkbox" checked={this.state.checked41} name="dva"/> Dynamic mode</label></div>
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

      Tree: (id) => dispatch(Tree(id)),
      TreeProtected: (id) => dispatch(TreeProtected(id)),
      
    }
}

function mapStateToProps(state) {


    return {

        tree:state.toJS().BackupReducer.tree,

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SWizard);
