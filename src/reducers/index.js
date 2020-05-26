import { combineReducers } from 'redux';
import { listResponse } from './listReducers';

const rootReducers = combineReducers({
	listResponse,
});

export default rootReducers;
