import React, { Component } from 'react';
import './App.css';
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
    console.log('SEARCH STRING:', searchString);
    this.setState({
      districts: this.districtRepo.findAllMatches(searchString)
    })
  }

  componentDidMount() {
    this.districtRepo = new DistrictRepository(kinderData);
    this.setState({
      districts: this.districtRepo.findAllMatches('colo')
    })
  }

  render() {
    return (
      <div className="App">
        <Search searchForDistricts={ this.searchForDistricts.bind(this) } />
        <DistrictList districts={ this.state.districts } />
      </div>
    );
  }
}

export default App;
