import React, { Component,  PropTypes} from 'react'
import styles from './styles.scss';
import { connect} from 'react-redux';
import { Link } from 'react-router-dom';
import Select from 'react-select';

class Backup extends Component {
    constructor(props) {
        super(props)

        this.state = {
          options:[
            { value: 'one', label: 'One' },
            { value: 'two', label: 'Two' }
          ],

    }
}
    componentDidMount() {

    }

    changeSelect(val) {
      //  this.props.toastrActions2();
      this.setState({selectOP:val})

    }

    changeSelect2(val) {
      //  this.props.toastrActions2();
      this.setState({selectOP2:val})

    }

    changeSelect3(val) {
      //  this.props.toastrActions2();
      this.setState({selectOP3:val})

    }

    render(){
console.log(this.state.selectOP)

        return (
          <div>
            <div className="filters">
              <div className="filter-wrapper">
              <div className="breadcrumbs">
                <Link to='/'>Home</Link> / Backup Jobs
              </div>
              <div className="filter-blocks gt-clear">
                <div className="jobs-counter gt-left">Backup Jobs (3)</div>
                <div className="filter-1 gt-left marr20">
                  <div className="gt-left filter-label">Nutanix claster:</div>
                  <div className="gt-left filter-select">
                    <Select
                      className="cusselect"
                      name="form-field-name"
                      value={this.state.selectOP}
                      options={this.state.options}
                      onChange={this.changeSelect.bind(this)}
                    />
                  </div>

                </div>
                <div className="filter-1 gt-left marr20">
                  <div className="gt-left filter-label">Backup server:</div>
                  <div className="gt-left filter-select">
                    <Select
                      className="cusselect"
                      name="form-field-name"
                      value={this.state.selectOP2}
                      options={this.state.options}
                      onChange={this.changeSelect2.bind(this)}
                    />
                  </div>

                </div>
                <div className="filter-1 gt-left">
                  <div className="gt-left filter-label">Last Result:</div>
                  <div className="gt-left filter-select">
                    <Select
                      className="cusselect"
                      name="form-field-name"
                      value={this.state.selectOP3}
                      options={this.state.options}
                      onChange={this.changeSelect3.bind(this)}
                    />
                  </div>

                </div>

              </div>
            </div>
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

//console.log(state.Reducer.emulate);
    return {


    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Backup);
