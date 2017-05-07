import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../models';
import { UserService } from '../../services';
import { LogoutComponent } from '../../components/logout/logout.component';


@Component({
    selector: 'nb-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
})
/**
* Renders the header HTML
*
* @class HeaderComponent
* @implements OnInit
* @constructor
*/
export class HeaderComponent implements OnInit {

    public user: User;
    public authenticated: boolean;

    constructor(
        private userService: UserService
     ) {}

    /**
    *
    * @inheritdoc
    */
    ngOnInit(): void {

    }

}
