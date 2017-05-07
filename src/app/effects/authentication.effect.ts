import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { of } from 'rxjs/observable/of';
import { AuthenticationActions, UserActions } from '../actions';
import { ApiService } from '../services';

@Injectable()
/**
* List of side effects that are triggered when an authentication action
* is dispatched to the store
*
* @class AuthenticationEffects
*/
export class AuthenticationEffects {
    constructor (
        private update$: Actions,
        private router: Router,
        private authenticationActions: AuthenticationActions,
        private userActions: UserActions,
        private apiService: ApiService
    ) {}

    /**
    * Action: Logging in user
    */
    @Effect() loginUser$ = this.update$
        .ofType(AuthenticationActions.LOGIN_USER)
        .map(action => action.payload)
        .switchMap(login => {
            return this.apiService.post('login', {
                'strategy': login.strategy,
                'identity': login.identity,
                'token': login.token,
                'keepMeLoggedIn': 'true'
            })
            .map(response => {
                return this.authenticationActions.loginUserSuccess({
                    token: response.data.token,
                    isLoggedIn: true,
                    returnUrl: login.returnUrl,
                    error: ''
                });
             })
            .catch((error) => {
                // @todo need a better message...
                if (error instanceof ProgressEvent) {
                    error = { msg: 'Unable to connect to server' };
                }
                return of(this.authenticationActions.loginUserFailed(error));
            });
        });

    /**
    * Action: User login successful
    */
    @Effect() loginUserSuccess$ = this.update$
        .ofType(AuthenticationActions.LOGIN_USER_SUCCESS)
        .map(action => {
            localStorage.setItem('accessToken', action.payload.token);
            if (action.payload.returnUrl !== '') {
                this.router.navigate([action.payload.returnUrl]);
            }
            return this.userActions.getUser();
        })
        .catch((error) => {
            localStorage.setItem('accessToken', '');
            this.router.navigate(['/login']);
            return of(this.authenticationActions.loginUserFailed(error));
        });

    /**
    * Action: Logging out user
    */
    @Effect() logoutUser$ = this.update$
        .ofType(AuthenticationActions.LOGOUT_USER)
        .map(action => {
            localStorage.setItem('accessToken', '');
            this.router.navigate(['/login']);
            return this.userActions.resetUser();
        })
        .catch((error) => {
            return of(this.authenticationActions.loginUserFailed(error));
        });
}