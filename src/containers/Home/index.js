/* eslint-disable react/sort-comp */
/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Route, Switch,Link,  BrowserRouter as Router } from 'react-router-dom';
import Helmet from 'react-helmet';
//import UserList from '../../components/UserList';
import Calendar from '../../components/Calendar/Calendar';

import styles from './styles.scss';
import Pavel from '../../components/Pavel/Pavel';


const dummyTable = () => (
  <div>
    <table><tr><td>Dummy</td><td>Table</td></tr></table>
  </div>
)

const dummyChart = () => (
  <div>
    dummyChart

  </div>
)

const dummyList = () => (
  <div>
    <h2>dummyList</h2>
  </div>
)

// Export this for unit testing more easily
export class Home extends PureComponent {

  constructor(props) {
      super(props);
      this.state = {
        data: [
            {id: 'dummyTable', title: 'Dummy Table', order: 1, path: 'tabs/dummyTable'},
            {id: 'dummyChart', title: 'Dummy Chart', order: 2, path: 'tabs/dummyChart'},
            {id: 'dummyList', title: 'Dummy List', order: 0, path: 'tabs/dummyList'}
          ],

      };
    }


  componentDidMount() {
    var byDate = this.state.data.slice(0);

      byDate.sort(function(a,b) {
          return a.order - b.order;
        });
    this.setState({data:byDate})
  }




  render() {

    return (
      <div className="">
<Pavel />
    <div>ssssdddddd
      <ul>
        <li><Link to="/dashboard">Netflix</Link></li>
      </ul>

      <hr/>
      <Switch>
          <Route exact path="/" component={Calendar} />
          <Route exact path="/dashboard" component={dummyChart} />

      </Switch>


    </div>



      </div>
    );
  }
}

function mapStateToProps(state) {
    return {

    }
}

export default connect(mapStateToProps)(Home);
