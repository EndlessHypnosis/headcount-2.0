

export default class DistrictRepository {

  constructor(unformattedData) {
    this.data = this.formatData(unformattedData);
  }

  calcAvg(formattedData) {
    
    const districtNames = Object.keys(formattedData);
    const districtsWithAvgs = districtNames.reduce((acum, districtName) => {

      const districtYears = Object.keys(formattedData[districtName].data);
      const districtSum = districtYears.reduce((acum, year) => {
        // console.log( formattedData[districtName].location === 'COLORADO' ?
        //               `District[${formattedData[districtName].location}]
        //               ${year}:${formattedData[districtName].data[year]}` : ''
        //            );
        acum = acum + parseFloat(formattedData[districtName].data[year])
        return acum;
      }, 0.0)

      const districtAvg = districtSum / districtYears.length;
      // if (formattedData[districtName].location === 'COLORADO') {
      //   console.log(`District[${formattedData[districtName].location}] Sum:${districtSum}`);
      //   console.log(`District[${formattedData[districtName].location}] Avg:${districtAvg}`);
      // }

      let newDistrictObj = Object.assign({}, formattedData[districtName], {average: districtAvg.toFixed(3)})
      // if (formattedData[districtName].location === 'COLORADO') {
      //   console.log('DIST OBJ:', newDistrictObj);
      // }

      acum[districtName] = newDistrictObj
      return acum;
    }, {})

    return districtsWithAvgs; // returning out of function
  }

  formatData(unformattedData) {
    const formattedData = unformattedData.reduce((acum, district) => {
      // doesn't exist
      if(!acum[district.Location]) {
        acum[district.Location] = {location: district.Location.toUpperCase(), data: {}};
      }
      // already exists
      const unroundedData = parseFloat(district.Data);
      let defaultData = 0;
      // THE PLUS here strips out extra 0's (i'd like not to use it, and have the 0's in there)
      //                                              +unroundedData
      const roundedData = (isNaN(unroundedData)) ? defaultData.toFixed(3) : unroundedData.toFixed(3);
      acum[district.Location].data[district.TimeFrame] = roundedData;
      // //START TESTING
      // if (acum[district.Location].location === 'ACADEMY 20') {
      //   console.log('DATA:', acum[district.Location].data);
      // }
      // //END TESTING
      return acum;
    }, {})
    // add in the average property
    const formattedDataWithAvg = this.calcAvg(formattedData);
    //console.log(formattedData)
    return formattedDataWithAvg;
  }

  findByName(nameToFind) {
    if (!nameToFind) {
      return undefined;
    } else {
      const listOfLocations = Object.keys(this.data);
      const findResult = listOfLocations.find(location => location.toUpperCase() === nameToFind.toUpperCase());
      return findResult ? this.data[findResult] : undefined;
    }
  }


  findAllMatches(nameToFind) {
    const findResults = [];

    const listOfLocations = Object.keys(this.data);
    const filterResults = listOfLocations.forEach(location => {

      if (!nameToFind) {
        findResults.push(this.data[location]);
      } else if (location.toUpperCase().includes(nameToFind.toUpperCase())) {
        findResults.push(this.data[location]);
      }

    })
    return findResults;
  }



}
