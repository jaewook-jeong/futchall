import React from 'react';
import { configure, mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';

import TeamManagement from '../components/TeamManagement';
import  Stadia from '../pages/stadia';
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

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});