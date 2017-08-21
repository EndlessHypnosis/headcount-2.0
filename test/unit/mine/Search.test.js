import React from 'react';
import Search from '../../../src/Search';
import { shallow, mount } from 'enzyme'

describe('Search Component', () =>  {
  let wrapper;
  let mockFn;

  beforeAll(() => {
    mockFn = jest.fn();
    wrapper = shallow(<Search searchForDistricts={ mockFn } />);
  })

  test('should exist', () => {
    expect(wrapper).toBeDefined();
  })

  test('should set the state by calling handleChange', () => {
    expect(wrapper.state().searchInput).toEqual('')
    wrapper.instance().handleChange({target: {value: 'de'}})
    expect(wrapper.state().searchInput).toEqual('de')

    // make sure call back function on setState was called
    expect(wrapper.instance().props.searchForDistricts).toHaveBeenCalled()
  });

});
