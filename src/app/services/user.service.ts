import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';
import { UserActions } from '../actions';
import { User } from '../models';

/**
*
* @class UserService
* @constructor
* @param store {Store}
* @param userActions {UserAction}
*/
@Injectable()
export class UserService {

    private user$: Observable<User>;

    constructor(
        private store: Store<AppState>,
        private userActions: UserActions
    ) {
        // this.user$ = this.store.select('user');
    }

    /**
    *
    * @method getUser
    * @return {Observable<any>}
    */
    public getUser(): Observable<User> {
        return this.user$;
    }
}
