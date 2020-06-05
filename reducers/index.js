import { combineReducers } from 'redux';
import user from './user';
import location from './location';
import stadium from './stadium';
import team from './team';

const rootReducer = combineReducers({
    user,
    location,
    stadium,
    team,
});

export default rootReducer;
