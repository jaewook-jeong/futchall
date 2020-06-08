import { combineReducers } from 'redux';
import user from './user';
import location from './location';
import stadium from './stadium';
import team from './team';
import messenger from './messenger';

const rootReducer = combineReducers({
    user,
    location,
    stadium,
    team,
    messenger,
});

export default rootReducer;
