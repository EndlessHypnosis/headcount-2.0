import React from 'react';
import '../styles/District.css';


const District = ({ location, average, data }) => {

  const years = Object.keys(data);

  return (
    <div className="card">
      <div className="card-header">
          <p className="info-back">{ location }</p>
          <div className="info-rank-wrapper">
            <p className="info-rank">Avg</p>
            <p className="info-rank-sub">{ average }</p>
          </div>
      </div>
      <div className="card-bio">
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

export default District
