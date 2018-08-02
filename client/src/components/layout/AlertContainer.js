import React, { Component } from "react";
// import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";

import Filter from "./Filter";
import Search from "./Search";
import AlertList from "./alert_list";

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

// render() {
//   return (
//     <div className="alert-container">
//       <div className="dark-overlay landing-inner text-light">
//         <div className="container">
//           <div className="row">
//             <div className="col-md-12 text-center">
//               <h1 className="display-3 mb-4">Movetool</h1>
//               <p className="lead"> Real Value </p>
//               <hr />
//               <Link to="/register" className="btn btn-lg btn-info mr-2">
//                 Sign Up
//               </Link>
//               <Link to="/login" className="btn btn-lg btn-light">
//                 Login
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
