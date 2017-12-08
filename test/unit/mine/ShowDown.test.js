import React from 'react';
import ShowDown from '../../../src/ShowDown';
import DistrictRepository from '../../../src/helper.js';
import kinderData from '../../../data/kindergartners_in_full_day_program.js';
import { shallow, mount } from 'enzyme'

describe('ShowDown Component', () => {
  let wrapper;

  beforeAll(() => {
    const districtRepo = new DistrictRepository(kinderData);
    const districtA = districtRepo.findByName('colorado');
    const districtB = districtRepo.findByName('academy 20');
    const districtArray = [districtA, districtB];
    wrapper = shallow(<ShowDown districtShowDown={districtArray} />);
  })

  test('should exist', () => {
    expect(wrapper).toBeDefined();
  });

  test('show down array should contain 2 data sets', () => {
    expect(wrapper.instance().props.districtShowDown.length).toEqual(2);
  });

  test('show down array should contain valid data sets', () => {
    expect(wrapper.instance().props.districtShowDown[0].location).toEqual('COLORADO');
    expect(wrapper.instance().props.districtShowDown[1].location).toEqual('ACADEMY 20');
    expect(wrapper.instance().props.districtShowDown[0].average).toEqual('0.530');
    expect(wrapper.instance().props.districtShowDown[1].average).toEqual('0.407');
  });

  test('show down should return correct compare ratio', () => {
    expect(wrapper.find('.ratio-detail').exists()).toEqual(true);
    expect(wrapper.find('.ratio-detail').text()).toEqual('1.302');
  });

  test('show down should output 2 cards', () => {
    expect(wrapper.find('.card-bio-detail').length).toEqual(11);
  });

});
