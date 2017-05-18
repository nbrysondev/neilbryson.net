import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ApiService} from '.';
import {Store} from '@ngrx/store';
import {AppState} from '../reducers';
import {AuthenticationActions} from '../actions';
import {Authentication, JWT} from '../models';
import {UtilityService} from '../services';
/**
* Makes requests to API /login service
*
* @class AuthenticationService
* @constructor
* @param store {Store}
* @param authenticationActions {AuthenticationAction}
*/
@Injectable()
export class AuthenticationService {

    public authentication$: Observable<Authentication>;
    public authentication: Authentication;

    constructor(
        private store: Store<AppState>,
        private authenticationActions: AuthenticationActions,
        private utilityService: UtilityService
    ) {
        /*
        @todo flesh outauthentication
        this.authentication$ = this.store.select('authentication');
        this.authentication$.subscribe(
            authentication => {
                this.authentication = authentication;
            }
        );
        */
    }

    /**
    *
    * @method init
    * @public
    */
    public init(): void {

        const token = localStorage.getItem('accessToken');

        if (token) {
            this.store.dispatch(this.authenticationActions.loginUserSuccess({
                token: token,
                isLoggedIn: true,
                returnUrl: '/',
                error: ''
            }));
        }
    }

    /**
    *
    * @method isLoggedIn
    * @public
    * @return boolean
    */
    public isLoggedIn(): boolean {
        if (this.authentication) {
            return this.authentication.isLoggedIn;
        } else {
            return false;
        }
    }

    /**
    *
    * @method getAuthToken
    * @public
    * @return string
    */
    public getAuthToken(): string {
        if (this.authentication) {
            return this.authentication.token;
        } else {
            return '';
        }
    }


    /**
    * Dispatches login action
    *
    * @method login
    * @public
    * @param {String} username Email address
    * @param {String} password
    */
    public login(username: string, password: string, returnUrl: string = '/') {
        this.store.dispatch(this.authenticationActions.loginUser({
            strategy: 'UsernamePassword',
            identity: username,
            token: password,
            returnUrl: returnUrl,
            keepMeLoggedIn: true
        }));
    }

    /**
    * Dispatches login action
    *
    * @method login
    * @public
    * @param {JWT} jwt
    * @param {String} returlUrl
    */
    public loginWithToken(jwt: JWT, returnUrl: string = '/') {
        this.store.dispatch(this.authenticationActions.loginUser({
            strategy: this.utilityService.fcToUpper(jwt.provider + 'Auth'),
            identity: jwt.email,
            token: jwt.token,
            returnUrl: returnUrl,
            keepMeLoggedIn: true
        }));
    }

    /**
    * Clears token from browser local storage and clears current user from store
    *
    * @method logout
    * @public
    */
    public logout(): void {
        this.store.dispatch(this.authenticationActions.logoutUser());
    }

}
