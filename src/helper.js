export default class DistrictRepository {

  constructor(unformattedData) {
    this.data = this.formatData(unformattedData);
  }

  calcAvg(formattedData) {

    const districtNames = Object.keys(formattedData);
    const districtsWithAvgs = districtNames.reduce((acum, districtName) => {

      const districtYears = Object.keys(formattedData[districtName].data);
      const districtSum = districtYears.reduce((acum, year) => {
        acum += parseFloat(formattedData[districtName].data[year])
        return acum;
      }, 0.0)

      const districtAvg = districtSum / districtYears.length;
      let newDistrictObj = Object.assign({}, formattedData[districtName], { average: districtAvg.toFixed(3) })
      acum[districtName] = newDistrictObj
      return acum;
    }, {})

    return districtsWithAvgs;
  }

  formatData(unformattedData) {
    const formattedData = unformattedData.reduce((acum, district) => {
      // doesn't exist
      if (!acum[district.Location]) {
        acum[district.Location] = { location: district.Location.toUpperCase(), data: {} };
      }
      // already exists
      const unroundedData = parseFloat(district.Data);
      let defaultData = 0;
      // THE PLUS here strips out extra 0's (i'd like not to use it, and have the 0's in there)
      //                                                                   +unroundedData
      const roundedData = (isNaN(unroundedData)) ? defaultData.toFixed(3) : unroundedData.toFixed(3);
      acum[district.Location].data[district.TimeFrame] = roundedData;
      return acum;
    }, {})
    // add in the average property
    const formattedDataWithAvg = this.calcAvg(formattedData);
    return formattedDataWithAvg;
  }

  compareDistrictAverages(districtAName, districtBName) {
    const districtA = this.findByName(districtAName);
    const districtB = this.findByName(districtBName);

    if (!districtA || !districtB) {
      return undefined;
    }

    const comparedAverage = parseFloat(districtA.average) / parseFloat(districtB.average)

    return {
      [districtA.location]: districtA.average,
      [districtB.location]: districtB.average,
      compared: comparedAverage.toFixed(3)
    }
  }

  findAverage(districtName) {
    const district = this.findByName(districtName);
    return district.average;
  }

  findByName(nameToFind) {
    if (!nameToFind) {
      return undefined;
    }

    const listOfLocations = Object.keys(this.data);
    const findResult = listOfLocations.find(location => location.toUpperCase() === nameToFind.toUpperCase());
    return findResult ? this.data[findResult] : undefined;
  }

  findAllMatches(nameToFind) {
    const findResults = [];

    const listOfLocations = Object.keys(this.data);
    listOfLocations.forEach(location => {

      if (!nameToFind) {
        findResults.push(this.data[location]);
      } else if (location.toUpperCase().includes(nameToFind.toUpperCase())) {
        findResults.push(this.data[location]);
      }

    })
    return findResults;
  }

}
