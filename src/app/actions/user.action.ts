import {Injectable} from '@angular/core';
import {Action} from '@ngrx/store';
import {User} from '../models';

@Injectable()
/**
* List of User related actions that can be dispatched to
* the store
*
* @class UserActions
*/
export class UserActions {
    public static GET_USER = '[User] Load User';
    public getUser(): Action {
        return {
            type: UserActions.GET_USER,
        };
    }

    public static GET_USER_SUCCESS = '[User] Load User Success';
    public getUserSuccess(payload: any): Action {
        return {
            type: UserActions.GET_USER_SUCCESS,
            payload: payload.data
        };
    }

    public static GET_USER_FAILED = '[User] Load User Failed';
    public getUserFailed(error: any): Action {
        return {
            type: UserActions.GET_USER_FAILED,
            payload: error
        };
    }

    public static RESET_USER = '[User] Reset User';
    public resetUser(): Action {
        return {
            type: UserActions.RESET_USER
        };
    }

}