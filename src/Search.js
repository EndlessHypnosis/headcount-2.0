import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/Search.css';


export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      searchInput: ''
    }
  }

  handleChange(e) {
    this.setState({
      searchInput: e.target.value
    }, () => {
      this.props.searchForDistricts(this.state.searchInput)
    })
  }

  render() {

    return (
      <input  className="search-input"
              placeholder="Search"
              value={ this.state.searchInput }
              onChange={ this.handleChange.bind(this) }
      />
    )
  }

}

Search.propTypes = {
  searchForDistricts: PropTypes.func
}








//end
