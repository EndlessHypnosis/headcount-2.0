import React from 'react';
import DistrictList from '../../../src/DistrictList';
import District from '../../../src/District';
import DistrictRepository from '../../../src/helper.js';
import kinderData from '../../../data/kindergartners_in_full_day_program.js';
import { shallow, mount } from 'enzyme'

describe('DistrictList Component', () => {
  let wrapper;
  let districtRepo;
  let districtArray;
  let allTheDistricts;
  let mockFn;

  beforeAll(() => {
    districtRepo = new DistrictRepository(kinderData);
    allTheDistricts = districtRepo.findAllMatches('de');
    const districtA = districtRepo.findByName('colorado');
    const districtB = districtRepo.findByName('academy 20');
    districtArray = [districtA, districtB];
    mockFn = jest.fn();

    wrapper = shallow(<DistrictList districts={allTheDistricts}
      districtShowDown={districtArray}
      addDistrictToShowDown={mockFn}
    />);
  });

  test('should exist', () => {
    expect(wrapper).toBeDefined();
  });

  test('array should contain 2 data sets', () => {
    expect(wrapper.instance().props.districtShowDown.length).toEqual(2);
  });

  test('array should contain valid data sets', () => {
    expect(wrapper.instance().props.districtShowDown[0].location).toEqual('COLORADO');
    expect(wrapper.instance().props.districtShowDown[1].location).toEqual('ACADEMY 20');
  });

  test('should output 14 districts', () => {
    expect(wrapper.find(District).length).toEqual(14);
  });

});
