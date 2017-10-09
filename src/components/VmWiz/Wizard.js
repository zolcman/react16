import React, { Component,  PropTypes} from 'react'
import styles from './styles.scss';
import { connect} from 'react-redux';
import { Route, Switch,Link,NavLink,withRouter,  BrowserRouter as Router } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

class Wizard extends Component {
    constructor(props) {
        super(props)


        this.state = {

          page:'4',
          finish:false,

        }
    }

    componentDidMount() {

      if (this.props.fromlist) {
        this.setState({finish:true}) // сдесь будем сразу по id выполнять запрос на обновление прогрессбара

      }


    }



    close() {
      this.setState({page:4}) // binded when all ok change to 1
      this.props.close();


    }

    pagechange() {
      if (this.state.page == 1) {
        this.setState({page:2})
      }
      if (this.state.page == 2) {
        this.setState({page:3})
      }
      if (this.state.page == 3) {
        this.setState({page:4})
      }


    }

    pagechangeB() {

      if (this.state.page == 4) {
        this.setState({page:3})
      }
      if (this.state.page == 3) {
        this.setState({page:2})
      }
      if (this.state.page == 2) {
        this.setState({page:1})
      }

    }

    renderPage () {
      if (this.state.page == 1) {
        return (<div>1</div>)
      }
      if (this.state.page == 2) {
        return (<div>2</div>)
      }
      if (this.state.page == 3) {
        return (<div>3</div>)
      }
      if (this.state.page == 4) {
        return (<div>{this.windows5()}</div>)
      }

    }

    windows5 () {
      return (
        <div>
          <div className="windows-title">Summary</div>
          <div className="windows-text">
            Please review the restore setting before continuing. The restore process will begin will after you click Finish.
            Navigate to corresponding restore session under history node to monitor the progress
          </div>
          <div className="windows-list">
            <dl className="floated">
                <dt>Proxy</dt>
                <dd>definition for first item in list</dd>
                <dt>Original VM name</dt>
                <dd>{this.props.vmid}</dd>
                <dt>Restore point</dt>
                <dd>35</dd>
                <dt>Target host</dt>
                <dd>TestRepo1</dd>
                <dt>Target resource pool</dt>
                <dd>C:\Backup\</dd>
                <dt>Target VM folder</dt>
                <dd>Daily at 10:00 PM</dd>
                <dt>Target data store</dt>
                <dd>5 restore points</dd>
                <dt>Network mapping</dt>
                <dd>5 restore points</dd>
              </dl>
          </div>
        </div>
      )
    }


    switch (param) {
      this.setState({page:param})
    }

    renderBubbles() {
      return (
        <div className="width40px gt-left">
          <a onClick={this.switch.bind(this,1)} className={this.state.page == 1 || this.state.page == 2 || this.state.page == 3 || this.state.page == 4  ? ('bubble bubblegreen') :('bubble')}>1</a>
          <div className={ this.state.page == 2 || this.state.page == 3 || this.state.page == 4 || this.state.page == 5 ? ('line-x bubblegreen') :('line-x')}></div>

          <a onClick={this.switch.bind(this,2)} className={this.state.page == 2 || this.state.page == 3 || this.state.page == 4   ? ('bubble bubblegreen') :('bubble')}>2</a>
          <div className={ this.state.page == 3 || this.state.page == 4 || this.state.page == 5 ? ('line-x bubblegreen') :('line-x')}></div>

          <a onClick={this.switch.bind(this,3)} className={this.state.page == 3 || this.state.page == 4  ? ('bubble bubblegreen') :('bubble')}>3</a>
          <div className={ this.state.page == 4 || this.state.page == 5 ? ('line-x bubblegreen') :('line-x')}></div>

          <a onClick={this.switch.bind(this,4)} className={this.state.page == 4   ? ('bubble bubblegreen') :('bubble')}>4</a>



        </div>
      )
    }

    renderbublenames() {
      return (
        <div className="titles-settings gt-left">

          <div className={this.state.page == 1 || this.state.page == 2 || this.state.page == 3 || this.state.page == 4 || this.state.page == 5 ? (' ') :('greyfixer34')}>Virtual <br/> Machines</div>
          <div className={ this.state.page == 2 || this.state.page == 3 || this.state.page == 4 || this.state.page == 5 ? ('mar69px') :('mar69px greyfixer34')}> Restore <br/> Mode</div>
          <div className={  this.state.page == 3 || this.state.page == 4 || this.state.page == 5 ? ('mar79px') :('mar69px greyfixer34')} >Reason</div>
          <div className={ this.state.page == 4  ? ('mar85px') :('mar85px greyfixer34')} >Summary</div>

        </div>


      )
    }

    add () {
      console.log('addd')
    }

    changewindow () {
      this.setState({finish:true})

    }

    cancelTask () {
        this.props.close();


      if (this.props.fromlist) {
        this.props.refreshtablelist();
        this.setState({finish:true,page:4}) // обновляем страницу если нажали cancel
      }
      else {
        this.setState({finish:false,page:4})
      }
    }

    renderFinish() {
      return (
        <div>
          <div className="windows-list">
            <dl className="floated">
                <dt>VM name</dt>
                <dd>{this.props.vmid}</dd>
                <dt>Restore type</dt>
                <dd>NTNXCL 1</dd>
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
                <div>22</div>
              </TabPanel>
              </div>
            </Tabs>

          </div>
        </div>
      )
    }

   move() {
    var elem = document.getElementById("myBar");
    var width = 1;
    var id = setInterval(frame, 10);
    function frame() {
        if (width >= 100) {
            clearInterval(id);
        } else {
            width++;
            elem.style.width = width + '%';
        }
    }
}



    firsttab() {

      return (
        <div>
            <div className="progress-bar-titles">
              <div className="gt-left">Restore started</div>
              <div className="gt-right">11.3/ 10 GB</div>
            </div>
          <div className="progress-bar">
            <div id="myBar"></div>
          </div>
          <a onClick={this.move.bind(this)}>Click to test progress bar</a>
          <div className="windows-list">
          <dl className="floated">
              <dt>Object remaining</dt>
              <dd>2222</dd>
              <dt>Restore rate</dt>
              <dd>NTNXCL 1</dd>
              <dt>Time remaining</dt>
              <dd>35</dd>

            </dl>
      </div>
        </div>

      )
    }

    render(){
      console.log(this.props.vmid)

        return (
          <div>
            {this.props.open ?
              (

                <div className="freeze">
                  <div className="pop-up-window">
                    <div className="pop-up-header">
                      <div className="gt-left pop-up-h-title">
                        {this.state.finish ? ('VM restore'): ('Full VM Restore Wizard') }

                      </div>
                      <div className="gt-right"><a className="close-pop" onClick={this.close.bind(this)}></a></div>

                    </div>
                    <div className={this.state.finish ? ('body-popup3 gt-clear') : ('body-popup2 gt-clear')}>
                      {this.state.finish ? (<div>{this.renderFinish()}</div>) :(
                        <div>
                        <div className="pagination-buble gt-left">
                        {this.renderBubbles()}
                        {this.renderbublenames()}

                        </div>
                        <div className="view-change gt-left">
                          {this.renderPage()}
                        </div>
                        </div>

                    )}


                    </div>
                    <div className="btns-go-back gt-clear">
                      {this.state.finish ? (<div>
                        <a onClick={this.close.bind(this)} className="go-btn gt-right go-btn-global ">Close</a>
                        <a onClick={this.cancelTask.bind(this)} className="go-btn gt-right go-btn-global mar11px">Cancel restore task</a>


                      </div>) : (

                        <div>
                          {this.state.page == 4 ?
                            (
                              <div>
                                <a onClick={this.close.bind(this)} className="go-btn gt-right go-btn-global">Cancel</a>
                                 <a onClick={this.changewindow.bind(this)} className="go-btn gt-right go-btn-global mar11px">Finish</a>

                              </div>

                            )
                             :
                             (<a onClick={this.pagechange.bind(this)} className="go-btn gt-right go-btn-global">Next</a>)
                           }
                         {this.state.page == 1 ? (null)
                            :
                             (<a onClick={this.pagechangeB.bind(this)} className="back-btn gt-right go-btn-global">Previous</a>
                           )}
                        </div>

                      )}



                    </div>
                  </div>
                </div>

              ):
              (null)}
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
export default connect(mapStateToProps, mapDispatchToProps)(Wizard);
