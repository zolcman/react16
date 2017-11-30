import React, { Component,  PropTypes} from 'react'
import styles from './styles.scss';
import { connect} from 'react-redux';
import { Route, Switch,Link,NavLink,withRouter,  BrowserRouter as Router } from 'react-router-dom';



class SWizardAlert2 extends Component {
    constructor(props) {
        super(props)


        this.state = {

          page:'1',
          finish:false,
          

        }
    }

    componentDidMount() {




    }

    componentWillReceiveProps(nextProps) {

        this.setState({namesToRename:this.props.nameto})

     }








    close() {
      
      this.props.close(false);


    }




    add () {
      this.props.close(true);
    }



    render(){
       var loop = this.props.nameto || [];
        return (
          <div className="modalWizPro12DC">
              {this.props.open ? (<div className="freeze">
                  <div className="pop-up-windowsmall">
                      <div className="gt-clear">
                        
                        <div className="gt-right"><a className="close-pop lp-7" onClick={this.close.bind(this)}></a></div>
                      </div>
                      <div className="body-popup3 gt-clear">
                        <div className="popup3-title">

                        </div>
                       
                        <div className="lp-6">One or more VMs with same names<br/> already exists. <strong>Overwrite them?</strong></div>   
                        <div className="show-diff">
                        {loop.map((item,index) => (
                          <div key={index}>{item.name}</div>

                      ))}
                        </div>
                        <div className="btns-group">

                          <a onClick={this.add.bind(this)} className="go-btn gt-right go-btn-global  ">Overwrite</a>
                          <a onClick={this.close.bind(this)} className="go-btn gt-right go-btn-global mr10r">Close</a>
                          <a  className="go-btn gt-left go-btn-global mr10r">Show VM(s)</a>
                          


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


    }
}

function mapStateToProps(state) {


    return {



    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SWizardAlert2);
