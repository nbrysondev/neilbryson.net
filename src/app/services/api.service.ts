import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { environment } from '../../environments';
import { AuthenticationService } from './authentication.service';

/**
* Base class for making requests to the API
*
* @class ApiService
* @constructor
* @param http {Http}
* @parm  authenticationService {AuthenticationService}
*/
@Injectable()
export class ApiService {


    constructor(
        protected http: Http,
        protected authenticationService: AuthenticationService
     ) { }

    /**
    * HTTP GET method
    *
    * @method get
    * @public
    * @param {string}  uri Service endpoint e.g. login, customer etc.
    * @param {Object}  params Parameters to send to the endpoint (optional)
    * @return {Observable<any>}
    */
    public get(uri: string, params?: Object): Observable<any> {
        return this.http.get(
            this.getRequestUrl(uri),
            this.getRequestHeaders()
        )
        .do(payload => this.checkResponseHeaders(payload))
        .map((res: Response) => res.json())
        .catch(this.logError);
    }

    /**
    * HTTP POST method
    *
    * @method post
    * @public
    * @param {string}  uri Service endpoint e.g. login, customer etc.
    * @param {Object}  params Parameters to send to the endpoint
    * @return {Observable<any>}
    */
    public post(uri: string, params: Object): Observable<any> {
        const _uri = this.getRequestUrl(uri);
        const obj = this.objectToUriEncoded(params);

        return this.http.post(_uri, obj, this.getRequestHeaders() )
        .do(payload => this.checkResponseHeaders(payload))
        .map((res: Response) => res.json())
        .catch(this.logError);
    }

    /**
    * HTTP PUT method
    *
    * @method put
    * @public
    * @param {string}  uri Service endpoint e.g. login, customer etc.
    * @param {Object}  params Parameters to send to the endpoint
    * @return {Observable<any>}
    */
    protected put(uri: string, params: Object): Observable<any> {
        return this.http.put(
            this.getRequestUrl(uri),
            this.objectToUriEncoded(params),
            this.getRequestHeaders()
        )
        .do(payload => this.checkResponseHeaders(payload))
        .map((res: Response) => res.json())
        .catch(this.logError);
    }

    /**
    * HTTP DELETE method
    *
    * @method delete
    * @public
    * @param {string}  uri Service endpoint e.g. login, customer etc.
    * @param {Object}  params Parameters to send to the endpoint
    * @return {Observable<any>}
    */
    protected delete(uri: string, params?: Object): Observable<any> {
        return this.http.delete(
            this.getRequestUrl(uri), this.getRequestHeaders()
        )
        .do(payload => this.checkResponseHeaders(payload))
        .map((res: Response) => res.json())
        .catch(this.logError);
    }

    /**
    * Logs error responses from the API
    *
    * @method logError
    * @protected
    * @param {any}  err Response object
    * @return {Observable<any>}
    * @todo Log error and rethrow
    */
    protected logError(err: any): Observable<any> {

        let message = '';

        if (err instanceof Response) {

            if (err.status === 422) {
                message = 'Validation error: ';
            } else {
                message = 'API error: ';
            }
            console.log(message);
            console.log(err.json());

           return Observable.throw(err.json());
        }

        return Observable.throw(err);
    }

    /**
    * Checks to see if the token we've received from the server matches the one in the store
    * If they're different, then we either don't have a token yet or our token is out of date.
    *
    * @method checkResponseHeaders
    * @private
    * @param {any}  payload
    */
    private checkResponseHeaders(payload) {
        const tokenHeader = payload.headers.get('Authorization');

        if (tokenHeader) {
            const token = tokenHeader.match(/Bearer\s(.*)/);
            if (token[1] != null && token[1] !== this.authenticationService.getAuthToken()) {
                // @todo submit token refresh action
            }
        }
    }

    /**
    * Builds the full request URL using the service endpoint
    * and items specified in the environment file - api version, protocol and host
    *
    * @method getRequestUrl
    * @private
    * @param {String}  uri service endpoint e.g. login or customer
    * @return {String}
    */
    private getRequestUrl(uri: string): string {
        const protocol = environment.api.ssl ? 'https' : 'http';
        const ret = protocol + '://' + environment.api.host + '/' + uri;
        return ret;
    }

    /**
    * Builds the request header. Will include the access token if the
    * implementing class has set accessTokenRequired to true
    *
    * @method getRequestHeaders
    * @private
    * @return {RequestOptions}
    */
    private getRequestHeaders(): RequestOptions {
        const options = {
            'Content-Type': 'application/json'
        };

        const authToken = this.authenticationService.getAuthToken();
        if (authToken) {
            options['Authorization'] = 'Bearer ' + authToken;
        }

        const headers = new Headers(options);
        return new RequestOptions({ headers: headers });
    }

    /**
    * Converts a JS object into uri encoded parameters
    * e.g. username=something&password=something
    *
    * @method objectToUriEncoded
    * @private
    * @param {Object}
    * @return {RequestOptions}
    */
    private objectToUriEncoded(object: Object): string {
        let query = '';
        for (const key in object) {
            if (object.hasOwnProperty(key)) {
                query += encodeURIComponent(key) + '=' + encodeURIComponent(object[key]) + '&';
            }
        }
        return query;
    }

}
