import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { filterAlerts } from "../../actions/index";
import alert_types from "./alert_types";
import SelectListGroup from "../common/SelectListGroup";

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alert_type: "",
      errors: {}
    };
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(event) {
    this.props.filterAlerts(event.target.value);
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="filter" onChange={this.onInputChange}>
        <SelectListGroup
          placeholder="Alert type"
          name="alert_type"
          value={this.state.alert_type}
          options={alert_types}
          error={errors.alert_type}
        />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ filterAlerts }, dispatch);
}

export default connect(
  null,
  mapDispatchToProps
)(Filter);
