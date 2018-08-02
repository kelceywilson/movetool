import React, { Component } from 'react'
// import { connect } from 'react-redux'
// import { setAlertType } from '../actions/index'

class AlertTypes extends Component {

  render(){
    return (
      <select name='alert_type' onChange={this.onSelect}>
        <option value='ACTION'>ACTION</option>
        <option value='CROWDFUND'>CROWDFUND</option>
        <option value='DONATION'>DONATION</option>
        <option value='EVENT'>EVENT</option>
        <option value='FREE'>FREE</option>
        <option value='GLEANING'>GLEANING</option>
        <option value='IMPACT'>IMPACT</option>
        <option value='JOB'>JOB</option>
        <option value='LAND'>LAND</option>
        <option value='OTHER'>OTHER</option>
        <option value='RESOURCE'>RESOURCE</option>
        <option value='SALE'>SALE</option>
        <option value='SPONSOR'>SPONSOR</option>
        <option value='THANKS!'>THANKS!</option>
        <option value='TRADE'>TRADE</option>
        <option value='URGENT'>URGENT</option>
        <option value='WANTED'>WANTED</option>
      </select>
    )
  }
}

export default AlertTypes
