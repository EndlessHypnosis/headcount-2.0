import React from 'react';
import District from './District';

const DistrictList = ({ districts }) => {


  const districtsToOutput = districts.map(district => {
    return (
      <District { ...district } key={ district.location } />
    )
  })


  return (
    <div>
      {districtsToOutput}
    </div>
  )


}

export default DistrictList
