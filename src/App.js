import React, { Component } from 'react';
import '../styles/App.css';
import DistrictList from './DistrictList'
import Search from './Search'

import DistrictRepository from './helper.js';
import kinderData from '../data/kindergartners_in_full_day_program.js';


class App extends Component {
  constructor() {
    super();

    this.state = {
      districts: []
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
    this.searchForDistricts('colo')
  }

  render() {
    return (
      <div className="app-wrapper">
        <div className="header-section">
          <p className="header-title">Headcount 2.0</p>
        </div>
        <div className="main-section">
          <div className="main-header">
            <p className="main-title">Districts</p>
            <Search searchForDistricts={ this.searchForDistricts.bind(this) } />
          </div>
          <DistrictList districts={ this.state.districts } />
        </div>
      </div>
    );
  }
}

export default App;
