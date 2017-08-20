import React from 'react'

const ShowDown = ({ districtShowDown }) => {
  return (
    <div className="card">
      <div className="card-header">
        <p className="info-back">Showdown</p>
      </div>
      <div className="card-bio">
        {districtShowDown[0].location}
        <br></br>
        {districtShowDown[1].location}
      </div>
    </div>
  )
}

export default ShowDown
