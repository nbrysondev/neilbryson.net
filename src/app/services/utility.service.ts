import {Injectable} from '@angular/core';

/**
* Wrapper service for general utility methods.
* With great power comes great responsibility...
*
* @class UtilityService
* @constructor
*/
@Injectable()
export class UtilityService {

    constructor() {}

    /**
    * Converts the first character of a string to upper case
    *
    * @method fcToUpper
    * @public
    * @return string
    */
    public fcToUpper(input: string): string {
        return input.charAt(0).toUpperCase() + input.slice(1);
    }
}