import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {AuthenticationService} from '../services';

/**
* "Protects" all routes with canActivate: [AuthGuard] (see app.routing.ts)
* If user attempts to access any authenticated route without a token in
* their browser local storage they're kicked back to the login page.
* Note that we don't bother to validate the token as the purpose of the guard
* is for UX rather than security.
*
* @class AuthGuard
* @extends CanActivate
* @constructor
* @private
* @param router {Router}
*/
@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private authenticationService: AuthenticationService) { }

    /**
     * @inheritdoc
     * Checks for access token and kicks user back to login if non exists
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.authenticationService.isLoggedIn()) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
