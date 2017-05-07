import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AuthenticationService} from '../../services/index';
import {SocialAuthenticationService} from '../../modules/social-authentication/social-authentication.service';
import {Authentication, JWT} from '../../models/index';
import {environment} from '../../../environments';

@Component({
    moduleId: module.id,
    selector: 'nb-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
/**
*
* @class LoginComponent
* @implements OnInit
* @constructor
* @param {AuthenticationService} authenticationService
* @param {SocialAuthenticationService} socialAuthenticationService
*/
export class LoginComponent implements OnInit  {

    public authentication: Authentication;
    private returnUrl: string = '/';


    constructor(
        private route: ActivatedRoute,
        private authenticationService: AuthenticationService,
        private socialAuthenticationService: SocialAuthenticationService) {
    }

    ngOnInit(): void {

        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    }

}
