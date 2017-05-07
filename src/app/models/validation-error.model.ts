/**
* Validation error model
*
* @interface ValidationError
* @param field     {string}
* @param message   {string}
*/
export interface ValidationError {
    field: string;
    message: string;
}