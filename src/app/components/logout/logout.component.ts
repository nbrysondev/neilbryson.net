import {Component} from '@angular/core';
import {AuthenticationService} from '../../services/index';


@Component({
    selector: 'ma2-logout',
    templateUrl: './logout.component.html',
    styleUrls: ['./logout.component.css']
})
export class LogoutComponent {

    constructor(
        private authenticationService: AuthenticationService
    ) { }

}
