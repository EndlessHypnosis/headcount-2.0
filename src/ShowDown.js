import React from 'react'
import PropTypes from 'prop-types';
import '../styles/ShowDown.css';

const ShowDown = ({ districtShowDown }) => {



  const allTheYears = Object.assign({},
                                    Object.keys(districtShowDown[0].data),
                                    Object.keys(districtShowDown[1].data));


  const showDownData = Object.keys(allTheYears).map(year => {
    return (
      <div className="card-bio-detail" key={`${year}`}>
        <span className={ parseFloat(districtShowDown[0].data[allTheYears[year]]) < 0.5  ? "showdown-a card-bio-year-red" : "showdown-a card-bio-year-green" }>{districtShowDown[0].data[allTheYears[year]]}</span>
        <span className="card-showdown-year">{allTheYears[year]}</span>
        <span className={ parseFloat(districtShowDown[1].data[allTheYears[year]]) < 0.5  ? "showdown-b card-bio-year-red" : "showdown-b card-bio-year-green" }>{districtShowDown[1].data[allTheYears[year]]}</span>
      </div>
    )
  });

  return (
    <div className="card no-flex">
      <div className="card-header-showdown">
        <div className="compare-ratio">
          <span className="ratio-header">Compare Ratio: </span>
          <span className="ratio-detail">{(districtShowDown[0].average / districtShowDown[1].average).toFixed(3)}</span>
        </div>
      </div>
      <div className="card-bio center-me">


        { showDownData }

      </div>
    </div>
  )
}


ShowDown.propTypes = {
  districtShowDown: PropTypes.array,
  districtShowDown: PropTypes.arrayOf(PropTypes.object),
  districtShowDown: PropTypes.arrayOf(PropTypes.shape({
    average: PropTypes.string,
    location: PropTypes.string,
    data: PropTypes.object
  }))
}





export default ShowDown
