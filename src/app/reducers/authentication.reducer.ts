import {Action} from '@ngrx/store';
import {Authentication} from '../models';
import {AuthenticationActions} from '../actions';

export type AuthenticationState = Authentication;

const initialState: AuthenticationState = {
    token: '',
    isLoggedIn: false,
    returnUrl: '',
    error: ''
};

export function authenticationReducer(state = initialState, action: Action): AuthenticationState {
    switch (action.type) {
        case AuthenticationActions.LOGOUT_USER:
            return Object.assign({}, state, initialState);
        case AuthenticationActions.LOGIN_USER_SUCCESS:
            return Object.assign({}, state, {
                token: action.payload.token,
                isLoggedIn: action.payload.isLoggedIn
            });
        case AuthenticationActions.LOGIN_USER_FAILED:
            return Object.assign({}, initialState, {
                error: action.payload.msg
            });
        default:
            return state;
    }
}
