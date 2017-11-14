import React, { Component,  PropTypes} from 'react'
import styles from './styles.scss';
import { connect} from 'react-redux';
import { Route, Switch,Link,NavLink,withRouter,  BrowserRouter as Router } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import CheckboxTree from 'react-checkbox-tree';
import { Tree } from '../../containers/Backup/BackupAction';

class SWizard extends Component {
    constructor(props) {
        super(props)


        this.state = {

          page:'4',
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
      this.props.array(this.state.checked)
      
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
        this.setState({ checked });
    }


reset () {
  this.setState({checked:[]})
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
                          <a onClick={this.add.bind(this)} className="go-btn gt-right go-btn-global mr10r">Add</a>
                          <a onClick={this.reset.bind(this)} className="go-btn gt-right go-btn-global mr10r">Reset</a>
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

    }
}

function mapStateToProps(state) {


    return {

        tree:state.toJS().BackupReducer.tree,

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SWizard);
