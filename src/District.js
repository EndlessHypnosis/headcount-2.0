import React from 'react';

const District = ({ location, average, data }) => {

  const years = Object.keys(data);

  return (
    <div>
      <h2>{ location }</h2>
      <h3>Avg: { average }</h3>
      { years.map((year, i) =>
          <div key={i}>
            <p>{year} : {data[year]}</p>
          </div>
        )
      }
    </div>
  )
}

export default District
