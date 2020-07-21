import {combineReducers} from 'redux';
import drinks from './drinks.reduser';
import online from './online.reduser';

const rootReducer = combineReducers({
  drinks,
  online,
});

export default rootReducer;
