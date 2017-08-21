import React from 'react';
import District from '../../../src/District';
import DistrictRepository from '../../../src/helper.js';
import kinderData from '../../../data/kindergartners_in_full_day_program.js';
import { shallow, mount } from 'enzyme'

describe('DistrictList Component', () =>  {
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

    wrapper = shallow(<District
                        location={ districtA.location }
                        average={ districtA.average }
                        data={ districtA.data }
                        startExpanded={ false }
                        districtShowDown={ districtArray }
                        addDistrictToShowDown={ mockFn }
                      />);
  });

  test('should exist', () => {
    expect(wrapper).toBeDefined();
  });

  test('state should start out correct', () => {
    expect(wrapper.state().shouldIExpand).toEqual(false);
    expect(wrapper.state().shouldICompare).toEqual(false);
  });

  test('should be able to reference elements', () => {
    wrapper.instance().cardBio = wrapper.find('.card-bio')
    wrapper.instance().cardHeader = wrapper.find('.card-header')

    expect(wrapper.instance().cardBio.exists()).toEqual(true)
    expect(wrapper.instance().cardHeader.exists()).toEqual(true)
  });

  test('should set the state by calling handleClick', () => {
    expect(wrapper.state().shouldIExpand).toEqual(false)
    wrapper.instance().cardBio.style = {}
    wrapper.instance().handleClick()
    expect(wrapper.state().shouldIExpand).toEqual(true)

    // make sure call back function on setState was called
    expect(wrapper.instance().props.addDistrictToShowDown).toHaveBeenCalled()
  });

  test('should correctly detect if district is in showdown', () => {
    expect(wrapper.instance().isDistrictNotInShowDown()).toEqual(false)
  });

  test('should have the year info hidden correctly', () => {
    expect(wrapper.find('.card-bio-detail').length).toEqual(11);
    expect(wrapper.instance().cardBio.style.display).toEqual('flex');

    wrapper.instance().handleClick()
    expect(wrapper.instance().cardBio.style.display).toEqual('none');

    wrapper.instance().handleClick()
    expect(wrapper.instance().cardBio.style.display).toEqual('flex');
  });

  test('should have the correct header indicating its in showdown', () => {
    expect(wrapper.instance().cardHeader.className).toEqual('card-header card-selected');
  });

});
