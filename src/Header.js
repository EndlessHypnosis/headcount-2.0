import React, { Component } from 'react'
import District from './District'
import ShowDown from './ShowDown'

export default class Header extends Component {
  constructor() {
    super();
  }

  render() {

    // const districtsToOutput = this.props.districtShowDown.map(district => {
    //   return (
    //     <District { ...district } key={ district.location } />
    //   )
    // })


    return (
      <div>
        <p className="header-title">Headcount 2.0</p>

        { this.props.districtShowDown.length > 0 &&
          <District { ...this.props.districtShowDown[0] } startExpanded={true} />
        }

        { this.props.districtShowDown.length > 1 &&
          <div>
            <ShowDown districtShowDown={ this.props.districtShowDown } />
            <District { ...this.props.districtShowDown[1] } startExpanded={true} />
          </div>
        }
      </div>
    )

  }

}
