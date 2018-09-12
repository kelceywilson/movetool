import React, { Component } from "react";
// import Resume from "../../img/Kelcey-Wilson-Resume.pdf";

export default class Resume extends Component {
  render() {
    return (
      <div className="fluidMedia">
        <iframe
          title="Resume"
          src="./resume.pdf"
          width="100%"
          height="100%"
          download
        >
          <p>Your browser does not support iframes.</p>
        </iframe>
      </div>
    );
  }
}
