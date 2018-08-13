import React, { Component } from "react";
import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
import { filterAlerts } from "../../actions/index";
import alert_types from "../common/alert_types";
import SelectList from "../common/SelectList";

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alert_type: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    console.log(event.target);

    this.props.filterAlerts(event.target.value);
  }

  render() {
    const { errors } = this.state;

    return (
      <div>
        <SelectList
          placeholder="Alert type"
          name="alert_type"
          value={this.state.alert_type}
          onChange={this.onChange}
          options={alert_types}
          error={errors.alert_type}
          className="filter"
        />
      </div>
    );
  }
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ filterAlerts }, dispatch);
// }

export default connect(
  null,
  { filterAlerts }
)(Filter);
