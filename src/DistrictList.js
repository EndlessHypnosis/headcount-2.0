import React from 'react';
import District from './District';
import '../styles/DistrictList.css';

const DistrictList = ({ districts, addDistrictToShowDown, districtShowDown }) => {


  const districtsToOutput = districts.map(district => {
    return (
      <District { ...district }
                key={ district.location }
                districtShowDown={ districtShowDown }
                addDistrictToShowDown={ addDistrictToShowDown }
                startExpanded={false}
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
