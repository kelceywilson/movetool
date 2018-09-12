import React, { Component } from "react";
import resume from "../../img/resume.pdf";

export default class Resume extends Component {
  render() {
    return (
      <div className="fluidMedia">
        <iframe title="Resume" src={resume} width="100%" height="100%" download>
          <p>Your browser does not support iframes.</p>
        </iframe>
      </div>
    );
  }
}
