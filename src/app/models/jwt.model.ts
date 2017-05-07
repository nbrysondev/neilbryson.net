/**
* JWT model
*
* @interface JWT
* @param token {string}
* @param provider {string}
* @param email {string}
*/
export interface JWT {
    token: string;
    provider: string;
    email: string;
}