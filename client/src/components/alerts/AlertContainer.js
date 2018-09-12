import React, { Component } from "react";
// import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";

import Filter from "./Filter";
import Search from "./Search";
import AlertList from "./AlertList";

class AlertContainer extends Component {
  // componentDidMount() {
  //   if (this.props.auth.isAuthenticated) {
  //     this.props.history.push("/dashboard");
  //   }
  // }

  render() {
    return (
      <div>
        <div className="filters">
          <Search />
          <Filter />
        </div>
        <AlertList />
      </div>
    );
  }
}

AlertContainer.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(AlertContainer);
