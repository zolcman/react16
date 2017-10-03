/* eslint-disable react/sort-comp */
/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Route, Switch,Link,  BrowserRouter as Router } from 'react-router-dom';
import Helmet from 'react-helmet';


import styles from './styles.scss';





// Export this for unit testing more easily
export class Home extends PureComponent {

  constructor(props) {
      super(props);
      this.state = {


      };
    }


  componentDidMount() {
  //  var byDate = this.state.data.slice(0);

  //    byDate.sort(function(a,b) {
  //        return a.order - b.order;
  //      });
  //  this.setState({data:byDate})
  }




  render() {

    return (
      <div className="">

      {/*   <ul>
      <li><Link to="/dashboard">Netflix</Link></li>
      </ul> */}



      <hr/>
    {/*   <Switch>
          <Route exact path="/" component={CC} />
          <Route exact path="/dashboard" component={dummyChart} />

      </Switch> */}



      </div>
    );
  }
}

function mapStateToProps(state) {
    return {

    }
}

export default connect(mapStateToProps)(Home);
