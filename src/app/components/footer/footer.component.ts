import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nb-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})

/**
* Does absolutely nothing as we have no interactivity in the footer.
* Adding boilerplate though as something could come up in the future.
*
* @class FooterComponent
* @implements OnInit
* @constructor
*/
export class FooterComponent implements OnInit {

    constructor() { }

    /**
    * @inheritdoc
    */
    ngOnInit() {
    }

}
