import React, { Component } from "react";
import { Field, reduxForm, reset } from "redux-form";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import FileUploader from "./FileUploader";
// import AlertTypeChooser from "./alert_type_chooser";
import { addNewAlert, closeModal } from "../../actions/index";
import InputGroup from "../common/InputGroup";
import SelectList from "../common/SelectList";
import alert_types from "../common/alert_types";
// field.input is an object that contains a bunch of
// event handlers and props
// the ... is saying all of the properties of the object
// to be communicated as props to the input tag
// it lets us avoid doing
// onChange={field.input.onChange}
// onFocus-{field.input.onFocus}  etc
//
// touched means user has focused then left an input
class NewAlert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      alert_type: "",
      photo_url: "",
      description: "",
      price_value: "",
      city: "",
      event_date_time: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  // onSubmit(values) {
  //   console.log("onSubmit NewAlert form", this.props);
  //   const photo_url = this.props.photo_url;
  //   const alert_type = this.props.alert_type;
  //   this.props.addNewAlert({ ...values, photo_url, alert_type });
  //   this.props.closeModal();
  // }

  onCancel() {
    this.props.closeModal();
  }

  onSubmit(e) {
    e.preventDefault();

    const alertData = {
      alert_type: this.state.alert_type,
      title: this.state.title,
      photo_url: this.props.photo_url,
      description: this.state.description,
      price_value: this.state.price_value,
      event_date_time: this.state.event_date_time,
      city: this.state.city,
      name: this.props.auth.user.first_name
    };

    this.props.addNewAlert(alertData);
    this.props.closeModal();
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    if (e.target.value === "SALE") {
    }
  }

  // handleSubmit is given by reduxForm (like connect)
  // it runs the submitted values through the error
  // handler, and if ok, then to the onSubmit function
  render() {
    const { errors } = this.state;
    const { isAuthenticated } = this.props.auth;
    const loginButton = (
      <button>
        <Link className="nav-link" to="/login">
          Login to Post Alert
        </Link>
      </button>
    );
    const sale = (
      <InputGroup
        placeholder="Price"
        name="price_value"
        value={this.state.price_value}
        onChange={this.onChange}
        error={errors.price_value}
      />
    );
    const submitAlertButton = <button type="submit">SUBMIT AN ALERT</button>;

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
          <InputGroup
            placeholder="Description"
            name="description"
            value={this.state.description}
            onChange={this.onChange}
            error={errors.description}
          />
          {sale}
          <InputGroup
            placeholder="City"
            name="city"
            value={this.state.city}
            onChange={this.onChange}
            error={errors.city}
          />
          <Field label="Photo" name="photo_url" component={FileUploader} />{" "}
          {isAuthenticated ? submitAlertButton : loginButton}
          <button onClick={this.onCancel.bind(this)}>Cancel</button>
        </form>
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

const afterSubmit = (result, dispatch) => dispatch(reset("NewAlertForm"));

NewAlert.propTypes = {
  errors: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    alert_type: state.alert_type.alert_type,
    auth: state.auth,
    errors: state.errors,
    photo_url: state.file.photo_url,
    description: state.description,
    price_value: state.price_value,
    event_date_time: state.event_date_time,
    city: state.city
  };
}

// reduxForm is a lot like connect
// helps form connect to reduxForm reducer
export default reduxForm({
  validate: validate,
  form: "NewAlertForm",
  onSubmitSuccess: afterSubmit
})(
  connect(
    mapStateToProps,
    { addNewAlert, closeModal }
  )(NewAlert)
);
