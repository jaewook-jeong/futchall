import { combineReducers } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';
import user from './user';
import location from './location';
import stadium from './stadium';
import team from './team';
import messenger from './messenger';
import post from './post';

const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      console.log('HYDRATE', action);
      return action.payload;
    default: {
      const combinedReducer = combineReducers({
        user,
        location,
        stadium,
        team,
        post,
      });
      return combinedReducer(state, action);
    }
  }
};

export default rootReducer;
