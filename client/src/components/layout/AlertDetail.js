import React, { Component } from "react";
import { Field, reduxForm, reset } from "redux-form";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import FileUploader from "./FileUploader";
import { closeModal, deleteAlert, editAlert } from "../../actions/index";
import InputGroup from "../common/InputGroup";
// import isEmpty from "../../validation/is-empty";
import SelectList from "../common/SelectList";
import alert_types from "../common/alert_types";

class AlertDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alert_type: "",
      title: "",
      photo_url: "",
      _id: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    console.log("componentDidMount");
    const { alert_type, title, photo_url, _id } = this.props.alerts.alert;
    this.setState({
      alert_type: alert_type,
      title: title,
      photo_url: photo_url,
      _id: _id
    });
  }
  // componentWillCrecieveProps(nextProps) {
  //   if (nextProps.errors) {
  //     this.setState({ errors: nextProps.errors });
  //   }
  //   if (nextProps.alerts.alert) {
  //     const alert = nextProps.alerts.alert;
  //     console.log(alert);

  //     this.setState({
  //       alert_type: alert.alert_type,
  //       title: alert.title,
  //       photo_url: alert.photo_url
  //     });
  //   }
  // }

  onCancel() {
    this.props.closeModal();
  }

  onSubmit(e) {
    e.preventDefault();

    const alertData = {
      alert_type: this.state.alert_type,
      title: this.state.title,
      photo_url: this.props.photo_url
    };

    this.props.editAlert(this.state._id, alertData);
    this.props.closeModal();
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  // handleSubmit is given by reduxForm (like connect)
  // it runs the submitted values through the error
  // handler, and if ok, then to the onSubmit function
  render() {
    const { errors } = this.state;

    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <SelectList
            placeholder="Alert type"
            name="alert_type"
            value={this.state.alert_type}
            onChange={this.onChange}
            options={alert_types}
            error={errors.alert_type}
          />
          <InputGroup
            placeholder="Title"
            name="title"
            value={this.state.title}
            onChange={this.onChange}
            error={errors.title}
          />
          <Field label="Photo" name="photo_url" component={FileUploader} />
          <button type="submit">SAVE CHANGES</button>
          <button onClick={this.onCancel.bind(this)}>Cancel</button>
        </form>
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
  deleteAlert: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  editAlert: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    alerts: state.alerts,
    photo_url: state.file.photo_url,
    errors: state.errors
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
