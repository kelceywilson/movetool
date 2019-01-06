import React, { Component } from "react";
import me from "../../img/DSCN0934.JPG";
export default class About extends Component {
  render() {
    return (
      <div>
        <div className="about-div">
          <div>
            <img className="portrait" src={me} alt="me" />
          </div>
          <div className="about-text">
            <p>
              I unexpectedly discovered the joy programming in early 2016. At the time, I was working for a tech startup and trying to get the data we needed to best develop and target promotions, but dataclips were a relatively low priority for the dev team. In order to overcome that bottleneck in my production process, I decided to learn SQL so I could pull the dataclips myself. To my surprise, I loved it! Not long afterward, I put in my notice and set out to become a software engineer. It has been a great adventure so far, and it has only just begun.
            </p>
            <p>
              There are so many directions a software engineer can go. I've enjoyed everything so far, so it's hard to choose a focus. I would be happy to spend the next couple of years working with a team and getting better at the technologies I already know -- there is always more to learn. I am in the process of learning how to build a blockchain. I have also just started to learn a bit of Java and C. I look forward to my next job, which I expect will have a big impact on my direction.
            </p>
            <p>September 18, 2018</p>
          </div>
        </div>
      </div>
    );
  }
}
