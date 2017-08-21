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
  })

  test('should exist', () => {
    expect(wrapper).toBeDefined();
  })

  test('state should start out correct', () => {
    expect(wrapper.state().shouldIExpand).toEqual(false);
    expect(wrapper.state().shouldICompare).toEqual(false);
  });

  test('should set the state by calling handleClick', () => {
    expect(wrapper.state().shouldIExpand).toEqual(false)

    wrapper.instance().cardBio = wrapper.find('.card-bio')
    wrapper.instance().cardBio.style = {}
    wrapper.instance().cardHeader = wrapper.find('.card-header')

    wrapper.instance().handleClick()
    expect(wrapper.state().shouldIExpand).toEqual(true)

    // make sure call back function on setState was called
    expect(wrapper.instance().props.addDistrictToShowDown).toHaveBeenCalled()
  })


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
