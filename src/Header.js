import React, { Component } from 'react'
import District from './District'
import ShowDown from './ShowDown'
import '../styles/Header.css';

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
      <div className="header-section">
        <p className="header-title">Headcount 2.0</p>
        <div className="flex-row">
          { this.props.districtShowDown.length > 0 &&
            <District { ...this.props.districtShowDown[0] } startExpanded={true} />
          }

          { this.props.districtShowDown.length > 1 &&
            <div className="flex-row">
              <ShowDown districtShowDown={ this.props.districtShowDown } />
              <District { ...this.props.districtShowDown[1] } startExpanded={true} />
            </div>
          }
        </div>
      </div>
    )

  }

}
