import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/District.css';

export default class District extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldIExpand: this.props.startExpanded,
      shouldICompare: false
    }
  }

  handleClick() {
    if (!this.props.startExpanded) {
      this.setState({
        shouldIExpand: !this.state.shouldIExpand
      }, () => {
        this.props.addDistrictToShowDown(this.props.location, this.state.shouldIExpand);
      })
    }
  }

  isDistrictNotInShowDown() {
    return this.props.districtShowDown.findIndex(element =>
      element.location === this.props.location) === -1
  }

  componentDidMount() {
    if (!this.isDistrictNotInShowDown()) {
      this.cardWrapper.className = "card no-flex"
      this.cardBio.style.display = 'flex'
      this.cardBio.className = 'card-bio'
      this.cardHeader.className = (this.isDistrictNotInShowDown())
        ? 'card-header'
        : 'card-header card-selected'
      this.setState({
        shouldIExpand: true
      })
    } else {
      this.cardBio.style.display = 'none'
      this.cardBio.className = 'card-bio add-overflow'
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.shouldIExpand) {
      this.cardBio.style.display = 'flex'
    } else {
      this.cardBio.style.display = 'none'
      this.cardHeader.className = 'card-header'
    }
  }

  componentDidUpdate(prevProps, prevState) {
    this.cardHeader.className = (this.isDistrictNotInShowDown())
      ? 'card-header'
      : 'card-header card-selected'
    this.cardBio.style.display = (this.state.shouldIExpand)
      ? 'flex'
      : 'none'
  }

  render() {
    const { location, average, data } = this.props;
    const years = Object.keys(data);

    return (
      <div className="card yes-flex" ref={(element) => this.cardWrapper = element}>
        <div className="card-header" onClick={this.handleClick.bind(this)}
          ref={(element) => this.cardHeader = element}>
          <p className="info-back">{location}</p>
          <div className="info-rank-wrapper">
            <p className="info-rank">Avg</p>
            <p className="info-rank-sub">{average}</p>
          </div>
        </div>
        <div className="card-bio" ref={(element) => this.cardBio = element}>
          {years.map((year, i) =>
            <div className="card-bio-detail" key={`${location}-${year}`}>
              <span className="card-bio-year">{year}</span>
              <span className={parseFloat(data[year]) < 0.5 ?
                "card-bio-year-red" :
                "card-bio-year-green"}>{data[year]}</span>
            </div>
          )
          }
        </div>
      </div>
    )
  }
}

District.propTypes = {
  startExpanded: PropTypes.bool,
  addDistrictToShowDown: PropTypes.func,

  districtShowDown: PropTypes.array,
  districtShowDown: PropTypes.arrayOf(PropTypes.object),
  districtShowDown: PropTypes.arrayOf(PropTypes.shape({
    average: PropTypes.string,
    location: PropTypes.string,
    data: PropTypes.object
  }))
}
