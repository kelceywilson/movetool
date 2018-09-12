import React, { Component } from "react";
const myPhoto = require("../../img/me.jpg");

export default class Landing extends Component {
  render() {
    return (
      <div className="landing">
        <div className="flex-column align-items-center">
          <div className="flex-column">
            <img
              className="rounded-circle landing-photo"
              src={myPhoto}
              alt="me"
            />
            <div>Name: Kelcey Wilson</div>
            <div className="profession">
              Profession: Full-stack software engineer
            </div>
            <div className="skills-header">
              <i className="fas fa-edit" /> Programming Languages:
            </div>
            <div className="skills">JavaScript, Ruby on Rails, Python</div>
            <div className="skills-header">
              <i className="fas fa-globe" /> Web Technologies:
            </div>
            <div className="skills">
              ReactJS, CSS3, Express.js, HTML5, jQuery, Node.js, SQL,
              Mongo/Mongoose
            </div>
          </div>
        </div>
      </div>
    );
  }
}
