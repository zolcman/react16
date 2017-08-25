/* eslint-disable react/sort-comp */
/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
//import UserList from '../../components/UserList';
import styles from './styles.scss';
import Calendar from '../../components/Calendar/Calendar';


// Export this for unit testing more easily
export class Home extends PureComponent {




  componentDidMount() {

  }



  render() {
    return (
      <div className="wrapper">

        <Calendar/>
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {

    }
}

export default connect(mapStateToProps)(Home);
