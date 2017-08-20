import React, { Component } from 'react';
import '../styles/District.css';


export default class District extends Component {
  constructor() {
    super();
    this.state = {
      shouldIExpand: false,
      shouldICompare: false
    }
  }

  handleClick() {
    // console.log('it was clicked');
    this.setState({
      shouldIExpand: !this.state.shouldIExpand
    })
    this.props.addDistrictToShowDown(this.props.location);
  }

  componentDidMount() {
    this.cardBio.style.display = 'none'
  }

  componentWillUpdate(nextProps, nextState) {
    // console.log('component will update:', nextState.shouldIExpand);
    if (nextState.shouldIExpand) {
      this.cardBio.style.display = 'flex'
    } else {
      this.cardBio.style.display = 'none'
    }
  }

  render() {

    // const stylez = {
    //   display: 'none'
    // }

    const { location, average, data } = this.props;

    const years = Object.keys(data);

    return (
      <div className="card">
        <div  className="card-header"
              onClick={this.handleClick.bind(this)}
              ref={(element) => this.cardHeader = element}
        >
            <p className="info-back">{ location }</p>
            <div className="info-rank-wrapper">
              <p className="info-rank">Avg</p>
              <p className="info-rank-sub">{ average }</p>
            </div>
        </div>
        <div  className="card-bio"
              ref={(element) => this.cardBio = element}
        >
          { years.map((year, i) =>
              <div key={i}>
                <p>{year} : {data[year]}</p>
              </div>
            )
          }
        </div>
      </div>
    )
  }
}
