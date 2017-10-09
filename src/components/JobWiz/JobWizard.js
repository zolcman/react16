import React, { Component,  PropTypes} from 'react'
import styles from './styles.scss';
import { connect} from 'react-redux';
import { Route, Switch,Link,NavLink,withRouter,  BrowserRouter as Router } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

class JobWizard extends Component {
    constructor(props) {
        super(props)


        this.state = {

          page:'4',
          finish:false,
          lister:[{time:'11',action:'ggg',duration:'22'},{time:'12',action:'gggdds',duration:'221'}]

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










    switch (param) {
      this.setState({page:param})
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





    render(){
      console.log(this.props.vmid)

        return (
          <div className="jobwiz">
            {this.props.open ?
              (

                <div className="freeze">
                  <div className="pop-up-window">
                    <div className="pop-up-header">
                      <div className="gt-left pop-up-h-title">
                        {this.state.finish ? (this.props.vmid): (this.props.vmid) }

                      </div>
                      <div className="gt-right"><a className="close-pop" onClick={this.close.bind(this)}></a></div>

                    </div>
                    <div className="body-popup2">
                      <div className="lvl-1">
                        <div className="progress-bar-title">
                          <div className="gt-left p_1">
                            Job progress
                          </div>

                          <div className="gt-left p_2">
                            10%
                          </div>
                        </div>
                        <div className="progress-bar">
                          <div id="myBar"></div>
                        </div>
                      </div>
                      <div className="lvl-1 martop20">
                        <table className="jobwiz-table">
                          <thead>
                            <tr>
                              <th>Summary</th>
                              <th>Data</th>
                              <th>Status</th>
                            </tr>

                          </thead>
                          <tbody>
                            <tr>
                              <td>Duration:00 00</td>
                              <td>Processed:00 00</td>
                              <td>Success</td>
                            </tr>
                              <tr>
                                <td>Processing rate:00 00</td>
                                <td>Read:00 00</td>
                                <td>Warnings</td>
                              </tr>
                              <tr>
                                <td>Bottlenecks :00 00</td>
                                <td>Transfered:00 00</td>
                                <td>Errors</td>
                              </tr>

                          </tbody>
                        </table>
                      </div>
                      <div className="lvl-1 martop20">
                        <div className="table-content">
                          <table className="bk-table">
                            <thead>
                              <tr>
                              <th>Time</th>
                              <th>Action</th>
                              <th>Duration</th>

                              </tr>
                            </thead>
                            <tbody>


                              {this.state.lister.map((item,index) => (
                                  <tr className="" key={index}>
                                  <td>
                                      {item.time}
                                </td>
                                  <td>{item.action}</td>
                                  <td>{item.duration}</td>


                                  </tr>

                              ))}
                            </tbody>

                          </table>
                        </div>
                      </div>
                      <div className="btns-group-jobwiz gt-clear">
                        <a className="back-btn gt-left go-btn-global">Hide log</a>
                        <a onClick={this.close.bind(this)} className=" gt-right go-btn-global">Close</a>
                        <a onClick={this.close.bind(this)} className="back-btn gt-right go-btn-global">Stop</a>

                      </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(JobWizard);
