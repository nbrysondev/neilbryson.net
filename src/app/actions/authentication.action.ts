import {Injectable} from '@angular/core';
import {Action} from '@ngrx/store';
import {Authentication} from '../models/authentication.model';

@Injectable()
/**
* List of authentication related actions that can be dispatched to
* the store
*
* @class AuthenticationActions
*/
export class AuthenticationActions {
    public static LOGIN_USER = '[Authentication] Logging in user';
    public loginUser(payload: any): Action {
        return {
            type: AuthenticationActions.LOGIN_USER,
            payload: payload
        };
    }

    public static LOGIN_USER_SUCCESS = '[Authentication] User login successful';
    public loginUserSuccess(authentication: Authentication): Action {
        return {
            type: AuthenticationActions.LOGIN_USER_SUCCESS,
            payload: authentication
        };
    }

    public static LOGIN_USER_FAILED = '[Authentication] User login failed';
    public loginUserFailed(error: any): Action {
        return {
            type: AuthenticationActions.LOGIN_USER_FAILED,
            payload: error
        };
    }

    public static LOGOUT_USER = '[Authentication] Logging out user';
    public logoutUser(): Action {
        return {
            type: AuthenticationActions.LOGOUT_USER,
        };
    }
}
