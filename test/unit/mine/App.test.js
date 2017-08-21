import React from 'react';
import App from '../../../src/App';
import Header from '../../../src/Header';
import DistrictList from '../../../src/DistrictList';
import Search from '../../../src/Search';
import DistrictRepository from '../../../src/helper.js';
import kinderData from '../../../data/kindergartners_in_full_day_program.js';
import { shallow, mount } from 'enzyme'

describe('App Component', () =>  {
  let wrapper;
  let districtRepo;
  let allTheDistricts;
  let mockFn;

  beforeAll(() => {
    districtRepo = new DistrictRepository(kinderData);
    allTheDistricts = districtRepo.findAllMatches('de');
    mockFn = jest.fn();
    wrapper = shallow(<App />);
  })

  beforeEach(() => {
    wrapper.instance().districtRepo = districtRepo
  })

  test('should exist', () => {
    expect(wrapper).toBeDefined();
  })

  test('state should start empty', () => {
    expect(wrapper.state().districts.length).toEqual(0);
    expect(wrapper.state().districtShowDown.length).toEqual(0);
  });

  test('set state correctly when searching for districts', () => {
    expect(wrapper.state().districts.length).toEqual(0);

    wrapper.instance().searchForDistricts('de')
    expect(wrapper.state().districts.length).toEqual(14);

    wrapper.instance().searchForDistricts('colo')
    expect(wrapper.state().districts.length).toEqual(2);

    wrapper.instance().searchForDistricts()
    expect(wrapper.state().districts.length).toEqual(181);

    wrapper.instance().searchForDistricts('abcd')
    expect(wrapper.state().districts.length).toEqual(0);

  });

  test('should contain valid sub components', () => {
    expect(wrapper.find(Header).length).toEqual(1);
    expect(wrapper.find(Search).length).toEqual(1);
    expect(wrapper.find(DistrictList).length).toEqual(1);
  });

  test('should correctly add the 1st district to showdown', () => {
    expect(wrapper.state().districtShowDown.length).toEqual(0);
    wrapper.instance().addDistrictToShowDown('COLORADO', false)
    expect(wrapper.state().districtShowDown.length).toEqual(0);
    wrapper.instance().addDistrictToShowDown('COLORADO', true)
    expect(wrapper.state().districtShowDown.length).toEqual(1);
  });

  test('should correctly add the 2ND district to showdown', () => {
    expect(wrapper.state().districtShowDown.length).toEqual(1);
    wrapper.instance().addDistrictToShowDown('ACADEMY 20', true)
    expect(wrapper.state().districtShowDown.length).toEqual(2);
  });

  test('should NOT add a 3rd district to showdown', () => {
    expect(wrapper.state().districtShowDown.length).toEqual(2);
    wrapper.instance().addDistrictToShowDown('DENVER COUNTY 1', true)
    expect(wrapper.state().districtShowDown.length).toEqual(2);
  });

  test('should remove a district if trying to add it and already existed', () => {
    expect(wrapper.state().districtShowDown.length).toEqual(2);
    wrapper.instance().addDistrictToShowDown('ACADEMY 20', true)
    expect(wrapper.state().districtShowDown.length).toEqual(1);
  });

});
