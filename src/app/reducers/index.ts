import '@ngrx/core/add/operator/select';
import {compose} from '@ngrx/core/compose';
// import {storeLogger} from 'ngrx-store-logger';
import {combineReducers} from '@ngrx/store';

import {userReducer, UserState} from './user.reducer';
import {authenticationReducer, AuthenticationState} from './authentication.reducer';

export interface AppState {
    user: UserState;
    authentication: AuthenticationState;
};

const combinedReducers = combineReducers({
    user: userReducer,
    authentication: authenticationReducer
});

export function reducer(state: any, action: any) {
    return combinedReducers(state, action);
}