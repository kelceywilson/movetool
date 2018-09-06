import React, { Component } from "react";
import { Field, reduxForm, reset } from "redux-form";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import FileUploader from "./FileUploader";
import { closeModal, deleteAlert, editAlert } from "../../actions/index";
import InputGroup from "../common/InputGroup";
import TextField from "../common/TextField";
// import isEmpty from "../../validation/is-empty";

class AlertDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alert_type: "",
      title: "",
      photo_url: "",
      _id: "",
      disabled: true,
      errors: {},
      user: "",
      description: "",
      price_value: "",
      city: "",
      sameUser: "",
      name: "",
      createdAt: "",
      event_date_time: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    const {
      alert_type,
      title,
      photo_url,
      _id,
      name,
      user,
      description,
      price_value,
      city,
      createdAt,
      event_date_time
    } = this.props.alerts.alert;

    const sameUser = user === this.props.auth.user.id ? "same" : "";
    const createdAtDate = new Date(createdAt).toDateString();

    const event_date = event_date_time.toString().slice(0, 10);

    this.setState({
      alert_type: alert_type,
      title: title,
      photo_url: photo_url,
      _id: _id,
      name: name,
      user: user,
      description: description,
      price_value: price_value,
      city: city,
      sameUser: sameUser,
      createdAt: createdAtDate,
      event_date_time: event_date
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
      photo_url: this.props.photo_url,
      description: this.state.description,
      price_value: this.state.price_value,
      city: this.state.city,
      event_date_time: this.state.event_date_time
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
    const { errors, sameUser } = this.state;
    const date = (
      <TextField
        name="event_date_time"
        type="date"
        value={this.state.event_date_time}
        onChange={this.onChange}
        error={errors.event_date_time}
      />
    );

    const event_year = this.state.event_date_time.toString().slice(0, 4);
    let event_date_display =
      this.state.event_date_time.toString().slice(5, 10) + "-" + event_year;

    const editable = (
      <div className="alert-detail">
        <form onSubmit={this.onSubmit}>
          <Field label="Photo" name="photo_url" component={FileUploader} />
          <h4 className="alert-type">{this.state.alert_type}</h4>
          <InputGroup
            placeholder="Title"
            name="title"
            value={this.state.title}
            onChange={this.onChange}
            error={errors.title}
            disabled="true"
          />
          <InputGroup
            placeholder="Description"
            name="description"
            value={this.state.description}
            onChange={this.onChange}
            error={errors.description}
            disabled="true"
          />
          {this.state.event_date_time ? date : undefined}
          <InputGroup
            placeholder="Price"
            name="price_value"
            value={this.state.price_value}
            onChange={this.onChange}
            error={errors.price_value}
            disabled="true"
          />
          <InputGroup
            placeholder="City"
            name="city"
            value={this.state.city}
            onChange={this.onChange}
            error={errors.city}
            disabled="true"
          />
          <button className="width-100-percent cadetblue" type="submit">
            SAVE CHANGES
          </button>
          <button
            className="width-100-percent khaki"
            onClick={this.onCancel.bind(this)}
          >
            Cancel
          </button>
        </form>
        <button
          className="tomato"
          onClick={() => this.props.deleteAlert(this.props.alerts.alert._id)}
        >
          {" "}
          Delete Alert{" "}
        </button>
      </div>
    );

    const notEditable = (
      <div className="alert-detail">
        <img
          src={this.props.photo_url}
          className="alert-thumb"
          alt={this.state.title}
        />
        <h4 className="alert-type">{this.state.alert_type}</h4>
        <h5 className="alert-title">{this.state.title}</h5>
        <p className="description">{this.state.description}</p>
        <p className="date">{event_date_display}</p>
        <p className="price">${this.state.price_value}</p>
        <div className="alert-footer">
          <div>{this.state.city}</div>
        </div>
        <div className="city">
          <div>Posted {this.state.createdAt}</div>
          <div className="name">by {this.state.name}</div>
        </div>
        <button onClick={this.onCancel.bind(this)}>Cancel</button>
      </div>
    );

    return <div>{sameUser === "same" ? editable : notEditable}</div>;
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
    auth: state.auth,
    errors: state.errors,
    photo_url: state.file.photo_url,
    sameUser: state.sameUser
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
