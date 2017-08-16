

export default class DistrictRepository {

  constructor(unformattedData) {
    this.data = this.formatData(unformattedData);
  }

  formatData(unformattedData) {
    const formattedData = unformattedData.reduce((acum, district) => {
      // doesn't exist
      if(!acum[district.Location]) {
        acum[district.Location] = {location: district.Location.toUpperCase(), data: {}};
      }
      // already exists
      const unroundedData = parseFloat(district.Data);
      // THE PLUS here strips out extra 0's (i'd like not to use it, and have the 0's in there)
      //                                              +unroundedData
      const roundedData = (isNaN(unroundedData)) ? 0 : unroundedData.toFixed(3);
      acum[district.Location].data[district.TimeFrame] = roundedData;
      // //START TESTING
      // if (acum[district.Location].location === 'ACADEMY 20') {
      //   console.log('DATA:', acum[district.Location].data);
      // }
      // //END TESTING
      return acum;
    }, {})
    //console.log(formattedData)
    return formattedData;
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
