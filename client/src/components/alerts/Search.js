import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { searchAlerts } from "../../actions/index";

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = { terms: "" };
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onInputChange(event) {
    this.setState({ terms: event.target.value });
  }

  onFormSubmit(event) {
    event.preventDefault();
    this.props.searchAlerts(this.state.terms);
    this.setState({ terms: "" });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onFormSubmit}>
          <input
            className="search"
            placeholder="Search Alert Titles"
            value={this.state.terms}
            onChange={this.onInputChange}
          />
        </form>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ searchAlerts }, dispatch);
}

export default connect(
  null,
  mapDispatchToProps
)(Search);
