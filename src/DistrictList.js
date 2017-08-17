import React from 'react';
import District from './District';
import '../styles/DistrictList.css';

const DistrictList = ({ districts }) => {


  const districtsToOutput = districts.map(district => {
    return (
      <District { ...district } key={ district.location } />
    )
  })


  return (
    <div className="district-list">
      {districtsToOutput}
    </div>
  )


}

export default DistrictList
