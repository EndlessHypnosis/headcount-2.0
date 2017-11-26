import React, { Component } from 'react';
import '../styles/App.css';
import DistrictList from './DistrictList'
import Search from './Search';
import Header from './Header';
import DistrictRepository from './helper.js';
import kinderData from '../data/kindergartners_in_full_day_program.js';

class App extends Component {
  constructor() {
    super();

    this.state = {
      districts: [],
      districtShowDown: []
    }
  }

  isDistrictInShowDown(element, index, array) {
    return this === element.location;
  }

  addDistrictToShowDown(districtName, shouldIExpand) {
    const indexOfDistrict = this.state.districtShowDown.findIndex(this.isDistrictInShowDown, districtName)

    if (indexOfDistrict !== -1) {
      const newShowDown = this.state.districtShowDown.slice();
      newShowDown.splice(indexOfDistrict, 1)
      this.setState({
        districtShowDown: newShowDown
      })
    } else if (this.state.districtShowDown.length <= 1 && shouldIExpand) {
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

  componentDidMount() {
    this.districtRepo = new DistrictRepository(kinderData);
    this.searchForDistricts()
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
                        districtShowDown={ this.state.districtShowDown }
                        addDistrictToShowDown={ this.addDistrictToShowDown.bind(this) }
          />
        </div>
      </div>
    );
  }
}

export default App;
