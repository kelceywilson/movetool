import React, { Component } from "react";
import { connect } from "react-redux";
// import { bindActionCreators } from 'redux'
import _ from "lodash";
import Modal from "react-responsive-modal";
import { Link } from "react-router-dom";

import AlertDetail from "./AlertDetail";
import NewAlert from "./new_alert";
import add from "../../img/add.png";
import Spinner from "../common/Spinner";

import {
  closeModal,
  deleteAlert,
  getAlertById,
  getAllAlerts,
  openModal
} from "../../actions/index";

class AlertList extends Component {
  componentDidMount() {
    this.props.getAllAlerts();
  }
  createAlertList() {
    return _.map(this.props.alerts.list, alert => {
      const price = alert.price_value ? (
        <p className="most-relevant">${alert.price_value}</p>
      ) : (
        undefined
      );

      return (
        <div className="alert-div" key={alert._id}>
          <img
            className="alert-thumb"
            src={alert.photo_url}
            alt={alert.title}
          />
          <h4 className="alert-type">{alert.alert_type}</h4>
          <h5 className="alert-title">{alert.title}</h5>
          {price}
          <div className="alert-footer">
            <button
              className="alert-detail-button"
              onClick={() => {
                this.props.getAlertById(alert._id).then(() => {
                  this.props.openModal({
                    whichModal: "alertDetailModal",
                    editAlertId: alert._id,
                    photo_url: alert.photo_url
                  });
                });
              }}
            >
              Details
            </button>
            <p className="city">{alert.city}</p>
          </div>
        </div>
      );
    });
  }

  getAllButton() {
    if (this.props.filtered) {
      return (
        <div className="get-all-alerts-button-div">
          <button onClick={this.props.getAllAlerts}>Get All Alerts</button>
        </div>
      );
    }
  }

  // TODO add second modal for editAlert
  // send which to this
  // onOpenModal = (event) => {
  //   console.log(event.target.value);
  //   this.props.openModal()
  // };
  //
  onCloseModal = () => {
    this.props.closeModal();
  };

  modalChooser() {
    const { open, whichModal } = this.props.open;
    if (whichModal === "alertDetailModal") {
      return (
        <Modal open={open} onClose={this.onCloseModal} center>
          <AlertDetail />
        </Modal>
      );
    } else {
      return (
        <Modal open={open} onClose={this.onCloseModal} center>
          <NewAlert />
        </Modal>
      );
    }
  }
  render() {
    const { isAuthenticated } = this.props.auth;

    if (!this.props.alerts.list) {
      return (
        <div>
          <p>Loading....</p>
          <Spinner />
          <p>(Free servers can take awhile sometimes.)</p>
        </div>
      );
    }

    const loginButton = (
      <button>
        <Link className="nav-link" to="/login">
          Login to Post Alert
        </Link>
      </button>
    );

    const createAlertButton = (
      <button
        onClick={() => this.props.openModal({ whichModal: "newAlertModal" })}
        className="alert-new-button"
      >
        CREATE
        <img className="icon" src={add} alt="add alert" />
        ALERT
      </button>
    );
    return (
      <div>
        <div className="create-new-alert-button-div">
          {isAuthenticated ? createAlertButton : loginButton}
        </div>
        {this.getAllButton()}
        <div className="alert-list">
          {this.modalChooser()}
          {this.createAlertList()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  // whatever is returned from here will show up as
  //  this.props inside of this Component
  //  this is the glue between react & redux
  return {
    alerts: state.alerts,
    auth: state.auth,
    filtered: state.filtered,
    open: state.open,
    photo_url: state.file.photo_url
  };
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ getAllAlerts }, dispatch)
// }

export default connect(
  mapStateToProps,
  { closeModal, deleteAlert, getAlertById, getAllAlerts, openModal }
)(AlertList);
