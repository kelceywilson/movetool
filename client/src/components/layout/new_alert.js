import React, { Component } from "react";
import { Field, reduxForm, reset } from "redux-form";
import { connect } from "react-redux";
import FileUploader from "./file_uploader";
import AlertTypeChooser from "./alert_type_chooser";
import { addNewAlert, closeModal } from "../../actions/index";

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
    const photo_url = this.props.photo_url;
    const alert_type = this.props.alert_type;
    this.props.addNewAlert({ ...values, photo_url, alert_type });
    this.props.closeModal();
  }

  onCancel() {
    this.props.closeModal();
  }
  // handleSubmit is given by reduxForm (like connect)
  // it runs the submitted values through the error
  // handler, and if ok, then to the onSubmit function

  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            label="Alert Type"
            name="alert_type"
            component={AlertTypeChooser}
          />
          <Field label="Title" name="title" component={this.renderField} />
          <Field label="Photo" name="photo_url" component={FileUploader} />
          <button type="submit">SUBMIT AN ALERT</button>
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

function mapStateToProps(state) {
  return {
    photo_url: state.file.photo_url,
    alert_type: state.alert_type.alert_type
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
