import React from 'react';
import '../matchMedia.mock';
import { mount, shallow } from 'enzyme';
import nock from 'nock';
import configureMockStore from 'redux-mock-store'

import { Provider } from 'react-redux';
import {configureStore} from '../store/configureStore'
import PostForm from '../components/PostForm';
import { LOAD_MY_INFO_SUCCESS } from '../reducers/user';
import { ADD_POST_SUCCESS } from '../reducers/post';

describe('Post', () => {
  const store = configureStore();
  let component = null;
  const props = {
    where: "team",
    req: "1"
  };
  it('Mock Store', async() => {
    await store.dispatch({
      type: LOAD_MY_INFO_SUCCESS,
      data: {
        me: {
          Images: [],
          nickname: '우기',
        },
        token: 'aaa.bbb.ccc'
      }
    });
  });

  it('renders postform', () => {
    component = mount(
      <Provider store={store}>
        <PostForm {...props} />
      </Provider>
    );
  });
  
  it('renders map', () => {
    component.find('textarea').simulate('change', {
      target: { value: 'testing' }
    });
    expect(component.find('textarea').props().value).toEqual('testing');
    component.simulate('submit');
    store.dispatch({
      type: ADD_POST_SUCCESS,
      data: {
        User: {
          id: 1,
          nickname: '우기'
        },
        content: "안녕"
      }
    });
    component.setProps();
    // component.update();
    expect(component.find('textarea').props().value.length).toBe(0);
  })
});