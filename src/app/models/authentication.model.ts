import {ValidationError} from './validation-error.model';
/**
* Authentication model
*
* @interface Authentication
* @param token           {string}
* @param isLoggedIn      {boolean}
* @param returnUrl       {string}
* @param error           {Array<ValidationError>}
*/
export interface Authentication {
    token:      string;
    isLoggedIn: boolean;
    returnUrl:  string;
    error: string;
}
