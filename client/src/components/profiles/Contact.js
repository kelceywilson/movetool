import React, { Component } from "react";
import { connect } from "react-redux";
import { sendMessage } from "../../actions";

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      subject: "",
      message: "",
      sent: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    const messageData = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      subject: this.state.subject,
      message: this.state.message
    };

    this.props.sendMessage(messageData);
    this.setState({
      first_name: "",
      last_name: "",
      email: "",
      subject: "",
      message: "",
      sent: "Your message has been sent"
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="">
        <form className="flex-column" onSubmit={this.onSubmit}>
          <input
            type="text"
            name="first_name"
            placeholder="First Name"
            value={this.state.first_name}
            onChange={this.onChange}
          />
          <input
            type="text"
            name="last_name"
            placeholder="Last Name"
            value={this.state.last_name}
            onChange={this.onChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.onChange}
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={this.state.subject}
            onChange={this.onChange}
          />
          <div>{errors.subject}</div>
          <textarea
            name="message"
            placeholder="Your Message"
            value={this.state.message}
            onChange={this.onChange}
          />
          <input type="submit" value="Submit" />
        </form>
        <div className="error">{this.state.sent}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    first_name: state.first_name,
    last_name: state.last_name,
    email: state.email,
    subject: state.subject,
    message: state.message,
    errors: state.errors
  };
}

export default connect(
  mapStateToProps,
  { sendMessage }
)(Contact);
