import React from 'react'

const ShowDown = ({ districtShowDown }) => {
  return (
    <div>
      {districtShowDown[0].location}
    <br></br>
      {districtShowDown[1].location}
    </div>
  )
}

export default ShowDown
