import React, { Component } from 'react';
import './App.css';
import DistrictList from './DistrictList'

import DistrictRepository from './helper.js';
import kinderData from '../data/kindergartners_in_full_day_program.js';


class App extends Component {
  constructor() {
    super();

    this.state = {
      districts: []
    }
  }

  componentDidMount() {
    const districtRepo = new DistrictRepository(kinderData);
    this.setState({
      districts: districtRepo.findAllMatches('colo')
    })
  }

  render() {
    return (
      <div className="App">
        <DistrictList districts={ this.state.districts } />

      </div>
    );
  }
}

export default App;
