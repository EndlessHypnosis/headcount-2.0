import React from 'react'
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
    <div className="card">
      <div className="card-header-showdown">
        <p className="info-back-showdown">Showdown</p>
      </div>
      <div className="card-bio">
        <div className="compare-ratio">
          <p>Compare Ratio</p>
          <p>{(districtShowDown[0].average / districtShowDown[1].average).toFixed(3)}</p>
        </div>

        { showDownData }

      </div>
    </div>
  )
}

export default ShowDown
