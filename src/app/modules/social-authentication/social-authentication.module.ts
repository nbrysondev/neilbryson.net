import { NgModule, ModuleWithProviders } from '@angular/core';
import { SocialAuthenticationService, IProviders } from './social-authentication.service';

declare let gapi: any;
declare let IN: any;
declare let FB: any;

@NgModule()
export class SocialAuthenticationModule {
    static loadProvidersScripts(config: IProviders): void {
        const loadProvidersScripts: Object = {
            google: (info) => {
                let d = document, gJs, ref = d.getElementsByTagName('script')[0];
                gJs = d.createElement('script');
                gJs.async = true;
                gJs.src = '//apis.google.com/js/platform.js';

                gJs.onload = function() {
                    gapi.load('auth2', function() {
                        gapi.auth2.init({
                        client_id: info['clientId'],
                        scope: 'email'
                        });
                    });
                };
                ref.parentNode.insertBefore(gJs, ref);
            },

            facebook: (info) => {
                let d = document, fbJs, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
                fbJs = d.createElement('script');
                fbJs.id = id;
                fbJs.async = true;
                fbJs.src = '//connect.facebook.net/en_US/sdk.js';

                fbJs.onload = function() {
                    FB.init({
                        appId: info['clientId'],
                        status: true,
                        cookie: true,
                        xfbml: true,
                        version: info['apiVersion']
                    });
                };

                ref.parentNode.insertBefore(fbJs, ref);
            }
        };

        Object.keys(config).forEach((provider) => {
            loadProvidersScripts[provider](config[provider]);
        });
    }

    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SocialAuthenticationModule,
            providers: [SocialAuthenticationService]
        };
    }
}
