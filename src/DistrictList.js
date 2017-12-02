import React from 'react';
import District from './District';
import PropTypes from 'prop-types';
import '../styles/DistrictList.css';

const DistrictList = ({ districts, addDistrictToShowDown, districtShowDown }) => {
  const districtsToOutput = districts.map(district => {
    return (
      <District { ...district }
        key={district.location}
        districtShowDown={districtShowDown}
        addDistrictToShowDown={addDistrictToShowDown}
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

// I'm getting a warning in my console about duplicate key...is it not
// good to keep passing through props as the same name everywhere?
DistrictList.propTypes = {
  addDistrictToShowDown: PropTypes.func,

  districts: PropTypes.array,
  districts: PropTypes.arrayOf(PropTypes.object),
  districts: PropTypes.arrayOf(PropTypes.shape({
    average: PropTypes.string,
    location: PropTypes.string,
    data: PropTypes.object
  })),

  districtShowDown: PropTypes.array,
  districtShowDown: PropTypes.arrayOf(PropTypes.object),
  districtShowDown: PropTypes.arrayOf(PropTypes.shape({
    average: PropTypes.string,
    location: PropTypes.string,
    data: PropTypes.object
  }))
}

export default DistrictList
