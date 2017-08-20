import React from 'react';
import District from './District';
import '../styles/DistrictList.css';

const DistrictList = ({ districts, addDistrictToShowDown }) => {


  const districtsToOutput = districts.map(district => {
    return (
      <District { ...district }
                key={ district.location }
                addDistrictToShowDown={ addDistrictToShowDown }
      />
    )
  })


  return (
    <div className="district-list">
      {districtsToOutput}
    </div>
  )


}

export default DistrictList
