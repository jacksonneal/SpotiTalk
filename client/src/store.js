import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import songStoreConfing from './reducers/songs';

const createReducer = (initialState, handlers) => {
    return (state = initialState, action) => {
        return (handlers[action.type] && handlers[action.type](state, action)) || state;
    }
}

const songReducers = createReducer(songStoreConfing.initialState, songStoreConfing.actions);

const rootReducer = combineReducers({
    songs: songReducers,
});

export default createStore(rootReducer, {}, applyMiddleware(thunk));