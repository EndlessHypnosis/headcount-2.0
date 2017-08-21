import React from 'react'
import District from './District'
import ShowDown from './ShowDown'
import PropTypes from 'prop-types'
import '../styles/Header.css';

const Header = ({ districtShowDown }) => {

    return (
      <div className="header-section">
        <p className="header-title">Headcount 2.0</p>
        <div className="flex-row">
          { districtShowDown.length > 0 &&
            <District { ...districtShowDown[0] }
                      startExpanded={true}
                      districtShowDown={ districtShowDown }
            />
          }

          { districtShowDown.length > 1 &&
            <div className="flex-row">
              <ShowDown districtShowDown={ districtShowDown } />
              <District { ...districtShowDown[1] }
                        startExpanded={true}
                        districtShowDown={ districtShowDown }
              />
            </div>
          }
        </div>
      </div>
    )

  }


Header.propTypes = {
  districtShowDown: PropTypes.array,
  districtShowDown: PropTypes.arrayOf(PropTypes.object),
  districtShowDown: PropTypes.arrayOf(PropTypes.shape({
    average: PropTypes.string,
    location: PropTypes.string,
    data: PropTypes.object
  }))
}


export default Header;
