import React from 'react';
import { shallow } from 'enzyme';

import  Stadia from '../pages/stadia';
import { Provider } from 'react-redux';
import {configureStore} from '../store/configureStore'

describe('Stadia', () => {
  let component = null;
  const store = configureStore();

  it('renders correctly', () => {
    component = shallow(
      <Provider store={store}>
        <Stadia />
      </Provider>
    );
  });

  // it('stadia snapshot', () => {
  //   expect(component).toMatchSnapshot();
  // });
});