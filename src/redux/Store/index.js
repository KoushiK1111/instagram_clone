import { createStore,combineReducers,applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Reducer,users } from '../Reducers';

const rootReducers = combineReducers({Reducer,users});

export default store = createStore(rootReducers,applyMiddleware(thunk));