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
  // let districtArray;
  let allTheDistricts;
  let mockFn;

  beforeAll(() => {
    districtRepo = new DistrictRepository(kinderData);
    allTheDistricts = districtRepo.findAllMatches('de');
    // const districtA = districtRepo.findByName('colorado');
    // const districtB = districtRepo.findByName('academy 20');
    // districtArray = [districtA, districtB];
    mockFn = jest.fn();

    wrapper = shallow(<App />);
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
    wrapper.instance().districtRepo = districtRepo

    wrapper.instance().searchForDistricts('de')
    expect(wrapper.state().districts.length).toEqual(14);

    wrapper.instance().searchForDistricts('colo')
    expect(wrapper.state().districts.length).toEqual(2);

    wrapper.instance().searchForDistricts()
    expect(wrapper.state().districts.length).toEqual(181);

    wrapper.instance().searchForDistricts('abcd')
    expect(wrapper.state().districts.length).toEqual(0);

  });

  test('should contain valid sub component', () => {
    expect(wrapper.find(Header).length).toEqual(1);
    expect(wrapper.find(Search).length).toEqual(1);
    expect(wrapper.find(DistrictList).length).toEqual(1);
  });


  //
  //
  // test('array should contain valid data sets', () => {
  //   expect(wrapper.instance().props.districtShowDown[0].location).toEqual('COLORADO');
  //   expect(wrapper.instance().props.districtShowDown[1].location).toEqual('ACADEMY 20');
  // });
  //
  // test('should output 14 districts', () => {
  //   expect(wrapper.find(District).length).toEqual(14);
  // });

});
