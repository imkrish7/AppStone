import { createStore, applyMiddleware } from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import rootReducers from '../reducers/index';

let initialState = {};

const store = createStore(
	rootReducers,
	{},
	applyMiddleware(thunk, reduxImmutableStateInvariant())
);

export default store;
