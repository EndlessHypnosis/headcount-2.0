import React, { Component } from 'react';

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
      <input  placeholder="search"
              value={ this.state.searchInput }
              onChange={ this.handleChange.bind(this) }
      />
    )
  }

}
