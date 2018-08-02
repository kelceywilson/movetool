import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { filterAlerts } from "../../actions/index";
import AlertTypes from "./alert_types";

class Filter extends Component {
  constructor(props) {
    super(props);

    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(event) {
    this.props.filterAlerts(event.target.value);
  }

  createAlertTypeList() {
    return (
      <div className="filter" onChange={this.onInputChange}>
        <AlertTypes />
      </div>
    );
  }

  render() {
    return <div>{this.createAlertTypeList()}</div>;
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ filterAlerts }, dispatch);
}

export default connect(
  null,
  mapDispatchToProps
)(Filter);
