import React, { Component,  PropTypes} from 'react'
//import styles from './styles.scss';
import { connect} from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';


class VMProgressBar extends Component {
    constructor(props) {
        super(props)


        this.state = {



        }
    }


    componentDidMount() {

		}
	

   {}     firsttab() {
            
                  let duration = '';
                  let processingRateBytesPerSecond = '';
            
                  if(this.state.task_info != undefined)
                  {
                    duration = this.state.task_info.duration;
            
                    if(this.state.task_info.statistic != undefined)
                    {
                    //  processingRateBytesPerSecond = bytes(this.state.task_info.statistic.processingRate, {unitSeparator: ' ', thousandsSeparator: ' '});
                    }
                  }
            
                  return (
                    <div>
                        <div className="progress-bar-titles">
                          <div className="gt-left">Restore started</div>
                          <div className="gt-right">{this.state.timer} %</div>
                        </div>
                      <div className="progress-bar">
                        <div style={this.state.propro} id="myBar"></div>
                      </div>
            
                      <div className="windows-list">
                      <dl className="floated">
            
                          <dt>Object remaining</dt>
                          <dd className="somefix">1 of 1</dd>
                          <dt>Restore rate</dt>
                          <dd>{processingRateBytesPerSecond}/s</dd>
                          <dt>Time remaining</dt>
                          <dd>N/A</dd>
            
                        </dl>
                  </div>
                    </div>
            
                  )
                }

    render(){

        return (
			<div>
				 <div className="windows-list">
            <dl className="floated">
                <dt>VM name</dt>
                <dd>ID={this.props.vmid}</dd>
                <dt>Restore type</dt>
                <dd>Restore to the original location</dd>
                <dt>Restore point</dt>
                <dd>35</dd>
                <dt>Initiated by</dt>
                <dd>TestRepo1</dd>
                <dt>Status</dt>
                <dd>C:\Backup\</dd>
                <dt>Start time</dt>
                <dd>Daily at 10:00 PM</dd>
              </dl>
          </div>
          <div className="tabs">
            <Tabs>

              <TabList>
                <Tab>Statistic</Tab>
                <Tab>Reason</Tab>
              </TabList>
              <div className="tabs-con-panel">
              <TabPanel>
                <div>{this.firsttab()}</div>
              </TabPanel>
              <TabPanel>
                <div> {this.state.HANDLETEXT}</div>
              </TabPanel>
              </div>
            </Tabs>

          </div>

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
export default connect(mapStateToProps, mapDispatchToProps)(VMProgressBar);
