import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {AuthenticationService} from '../services';

/**
* Blocks access to a route if the user is logged in
*
* @class NonAuthGuard
* @extends CanActivate
* @constructor
* @private
* @param router {Router}
*/
@Injectable()
export class NonAuthGuard implements CanActivate {

    constructor(private router: Router, private authenticationService: AuthenticationService) { }

    /**
     * @inheritdoc
     * Checks for access token and kicks user back to login if non exists
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (!this.authenticationService.isLoggedIn()) {
            // not logged in so return true
            return true;
        }

        // logged in so redirect to homepage
        this.router.navigate(['/'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
