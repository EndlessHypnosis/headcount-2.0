import React from 'react';
import Header from '../../../src/Header';
import District from '../../../src/District';
import ShowDown from '../../../src/ShowDown';
import DistrictRepository from '../../../src/helper.js';
import kinderData from '../../../data/kindergartners_in_full_day_program.js';
import { shallow, mount } from 'enzyme'

describe('Header Component', () =>  {
  let wrapper;
  let districtRepo;
  let districtArray;

  beforeAll(() => {
    districtRepo = new DistrictRepository(kinderData);
    const districtA = districtRepo.findByName('colorado');
    districtArray = [districtA];
    wrapper = shallow(<Header districtShowDown={districtArray} />);
  });

  test('should exist', () => {
    expect(wrapper).toBeDefined();
  });

  test('array should contain 1 data sets', () => {
    expect(wrapper.instance().props.districtShowDown.length).toEqual(1);
  });

  test('array should contain valid data sets', () => {
    expect(wrapper.instance().props.districtShowDown[0].location).toEqual('COLORADO');
    expect(wrapper.instance().props.districtShowDown[0].average).toEqual('0.530');
  });

  test('should have a header', () => {
    expect(wrapper.find('.header-title').text()).toEqual('Headcount 2.0');
  });

  test('should output 1 cards', () => {
    expect(wrapper.find('.flex-row').length).toEqual(1);
    expect(wrapper.find(District).length).toEqual(1);
    expect(wrapper.find(ShowDown).length).toEqual(0);
  });

  test('should output 2 cards after adding another to showdown', () => {
    const districtB = districtRepo.findByName('academy 20');
    const districtTwoArray = [...districtArray, districtB];
    wrapper = shallow(<Header districtShowDown={districtTwoArray} />);

    expect(wrapper.find('.flex-row').length).toEqual(2);
    expect(wrapper.find(District).length).toEqual(2);
    expect(wrapper.find(ShowDown).length).toEqual(1);
  });

});
