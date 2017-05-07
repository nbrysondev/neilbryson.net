import {Injectable} from '@angular/core';
import {Effect, Actions} from '@ngrx/effects';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/empty';
import {of} from 'rxjs/observable/of';
import {Observable} from 'rxjs/Observable';
import {AuthenticationActions, UserActions} from '../actions';
import {ApiService} from '../services';

@Injectable()
/**
* List of side effects that are triggered when a user action
* is dispatched to the store
*
* @class UserEffects
*/
export class UserEffects {
    constructor (
        private update$: Actions,
        private userActions: UserActions,
        private authenticationActions: AuthenticationActions,
        private apiService: ApiService
    ) {}

    @Effect() getUser$ = this.update$
        .ofType(UserActions.GET_USER)
        .switchMap(() => this.apiService.get('user'))
        .map((user) => {
            return this.userActions.getUserSuccess(user);
        })
        .catch((error) => {
            console.log(error);
            return of(this.authenticationActions.logoutUser());
        });

}