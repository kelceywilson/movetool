import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setAlertType } from "../../actions/index";
import AlertTypes from "./alert_types";

class AlertTypeChooser extends Component {
  constructor(props) {
    super(props);

    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(event) {
    this.props.setAlertType(event.target.value);
  }

  createAlertTypeList() {
    return (
      <div onChange={this.onInputChange}>
        <AlertTypes />
      </div>
    );
  }

  render() {
    return <div>{this.createAlertTypeList()}</div>;
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setAlertType }, dispatch);
}

export default connect(
  null,
  mapDispatchToProps
)(AlertTypeChooser);
