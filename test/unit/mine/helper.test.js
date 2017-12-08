import DistrictRepository from '../../../src/helper.js';
import kinderData from '../../../data/kindergartners_in_full_day_program.js';

describe('DistrictRepository helper class', () => {
  const district = new DistrictRepository(kinderData);

  test('district has average attribute', () => {
    expect(district.findByName('colorado').average.length).toEqual(5);
    expect(district.findByName('academy 20').average.length).toEqual(5);
  });

  test('averages are calculated correctly', () => {
    expect(district.findByName('academy 20').average).toEqual('0.407');
    expect(district.findByName('colorado').average).toEqual('0.530');
  });

  test('there are the correct number of years of data present', () => {
    let numYears = Object.keys(district.findByName('academy 20').data);
    expect(numYears.length).toEqual(11);

    numYears = Object.keys(district.findByName('colorado').data)
    expect(numYears.length).toEqual(11);
  });

});
