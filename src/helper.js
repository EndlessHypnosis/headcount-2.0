

export default class DistrictRepository {

  constructor(unformattedData) {
    this.data = this.formatData(unformattedData)
  }

  formatData(unformattedData) {
    const formattedData = unformattedData.reduce((acum, district) => {
      // doesn't exist
      if(!acum[district.Location]) {
        acum[district.Location] = {location: district.Location.toUpperCase(), data: {}}
      }
      // already exists
      acum[district.Location].data[district.TimeFrame] = district.Data
      return acum
    }, {})
    //console.log(formattedData)
    return formattedData;
  }

  findByName(nameToFind) {
    if (!nameToFind) {
      return undefined;
    } else {
      const listOfLocations = Object.keys(this.data);
      const findResult = listOfLocations.find(location => location.toUpperCase() === nameToFind.toUpperCase())
      return findResult ? this.data[findResult] : undefined;
    }

  }

}
