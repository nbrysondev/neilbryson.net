/**
* User model
*
* @interface User
* @param userId      {number}
* @param email       {string}
* @param forename    {string}
* @param surname     {string}
*/
export interface User {
    userId: number;
    email: string;
    forename: string;
    surname: string;
}
