import React, { Component } from 'react'
import District from './District'

export default class Header extends Component {
  constructor() {
    super();

  }

  render() {

    const districtsToOutput = this.props.districtShowDown.map(district => {
      return (
        <District { ...district } key={ district.location } />
      )
    })

    return (
      <div>
        <p className="header-title">Headcount 2.0</p>

      </div>
    )

  }

}
