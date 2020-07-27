import { combineReducers } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';
import user from './user';
import location from './location';
import stadium from './stadium';
import team from './team';
import messenger from './messenger';
import post from './post';

const rootReducer = combineReducers({
  index: (state={}, action) => {
    switch (action.type) {
      case HYDRATE:
        console.log('HYDRATE', action);
        return { ...state, ...action.payload };
      default:
        return state;
    }
  },
  user,
  location,
  stadium,
  team,
  messenger,
  post,
});

export default rootReducer;
