import { Action } from '@ngrx/store';
import { User } from '../models';
import { UserActions } from '../actions';

export type UserState = User;

const initialState: UserState = {
    userId: null,
    forename: '',
    surname: '',
    email: ''
};

export function userReducer(state = initialState, action: Action): UserState {
    switch (action.type) {
        case UserActions.RESET_USER:
            return initialState;
        case UserActions.GET_USER_SUCCESS:   
            return {
                userId: action.payload.userId,
                forename: action.payload.forename,
                surname: action.payload.surname,
                email: action.payload.email
            };
        default:
            return state;
    }
}