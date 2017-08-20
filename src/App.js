import React, { Component } from 'react';
import '../styles/App.css';
import DistrictList from './DistrictList'
import Search from './Search'
import Header from './Header'

import DistrictRepository from './helper.js';
import kinderData from '../data/kindergartners_in_full_day_program.js';


// TODO:
//  Need 2 animations
//  Need propTypes
//  what to do about es lint?
//  should differentiate between a card that's just selected vs one that
//    was 'allowed' to go up to showdown

class App extends Component {
  constructor() {
    super();

    this.state = {
      districts: [],
      districtShowDown: []
    }
  }

  // can this function live directly inside the findIndex?
  isDistrictInShowDown(element, index, array) {
    return this === element.location;
  }

  addDistrictToShowDown(districtName) {

    const indexOfDistrict = this.state.districtShowDown.findIndex(this.isDistrictInShowDown, districtName)

    if (indexOfDistrict !== -1) {

      const newShowDown = this.state.districtShowDown.slice();
      newShowDown.splice(indexOfDistrict, 1)
      this.setState({
        districtShowDown: newShowDown
      })
    } else if (this.state.districtShowDown.length <= 1) {

      const district = this.districtRepo.findByName(districtName)

      const newShowDown = [...this.state.districtShowDown, district]
      this.setState({
        districtShowDown: newShowDown
      })
    }

  }


  searchForDistricts(searchString) {
    this.setState({
      districts: this.districtRepo.findAllMatches(searchString)
    })
  }
  // callback function example for between }) in setState:
  // , () => {this.districtRepo.compareDistrictAverages('ACADEMY 20', 'YUMA SCHOOL DISTRICT 1')}



  componentDidMount() {
    this.districtRepo = new DistrictRepository(kinderData);
    // this.setState({
    //   districts: this.districtRepo.findAllMatches('colo')
    // })
    this.searchForDistricts('de')
  }

  render() {
    return (
      <div className="app-wrapper">
        <Header districtShowDown={ this.state.districtShowDown } />
        <div className="main-section">
          <div className="main-header">
            <p className="main-title">Districts</p>
            <Search searchForDistricts={ this.searchForDistricts.bind(this) } />
          </div>
          <DistrictList districts={ this.state.districts }
                        addDistrictToShowDown={ this.addDistrictToShowDown.bind(this) }
          />
        </div>
      </div>
    );
  }
}

export default App;
