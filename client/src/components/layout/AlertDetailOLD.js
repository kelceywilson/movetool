import React, { Component } from "react";
import { Field, reduxForm, reset } from "redux-form";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import FileUploader from "./FileUploader";
import { closeModal, deleteAlert, editAlert } from "../../actions/index";
// import InputGroup from "../common/InputGroup";
// import SelectList from "../common/SelectList";
// import alert_types from "../common/alert_types";

class AlertDetail extends Component {
  componentDidMount() {
    this.handleInitialize();
  }
  handleInitialize() {
    const initData = this.props.alerts.alert;
    console.log(initData);
    this.props.initialize(initData);
  }

  renderField(field) {
    const {
      meta: { touched, error }
    } = field;
    const className = touched && error ? "error" : "";
    return (
      <div>
        <label>{field.label}</label>
        <input className={className} type="text" {...field.input} />
        <div className="error">{touched ? error : ""}</div>
      </div>
    );
  }
  onSubmit(values) {
    console.log("onSubmit NewAlert form", this.props);
    this.props.updateAlert({ ...values });
    this.props.closeModal();
  }
  onCancel() {
    this.props.closeModal();
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            label="Alert Type"
            name="alert_type"
            component={this.renderField}
          />
          <Field label="Title" name="title" component={this.renderField} />
          <Field label="Photo" name="photo_url" component={FileUploader} />
          <button type="submit">SAVE CHANGES</button>
        </form>
        <button onClick={this.onCancel.bind(this)}>Cancel</button>
        <button
          className="alert-delete"
          onClick={() => this.props.deleteAlert(this.props.alerts.alert._id)}
        >
          Delete Alert
        </button>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.title) {
    errors.title = "Enter a title";
  }
  // if errors is empty then form is ok to SUBMIT
  // if errors has any properties than it isn't
  return errors;
}

const afterSubmit = (result, dispatch) => dispatch(reset("EditAlertForm"));

AlertDetail.propTypes = {
  errors: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    alerts: state.alerts
  };
}

export default reduxForm({
  validate,
  form: "EditAlertForm",
  onSubmitSuccess: afterSubmit
})(
  connect(
    mapStateToProps,
    { deleteAlert, closeModal, editAlert }
  )(AlertDetail)
);
