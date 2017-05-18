// Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { routing } from './app.routing';
import { environment } from '../environments';

// ngrx
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// Modules
import { SocialAuthenticationModule } from './modules/social-authentication/social-authentication.module';

// Pipes
import { ValuesPipe } from './pipes/values.pipe';
import { SafeHTMLPipe } from './pipes/safe-html.pipe';
import { EncodetextPipe } from './pipes/encodetext.pipe';

// Actions
import { UserActions, AuthenticationActions } from './actions';

// Effects
import { UserEffects, AuthenticationEffects } from './effects';

// Reducers
import { reducer } from './reducers';

// Guards
import { AuthGuard, NonAuthGuard } from './guards';


// Services
import { AuthenticationService, UserService, ApiService, UtilityService } from './services';

// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LogoutComponent } from './components/logout/logout.component';
import { CvComponent } from './components/cv/cv.component';


// @todo Configure social login module
/*
SocialAuthenticationModule.loadProvidersScripts({
    'google': {
        'clientId': environment.googleAuth.clientID
    },
    'facebook': {
        'clientId': environment.facebookAuth.appId,
        'apiVersion': environment.facebookAuth.APIVersion
    }
});
*/

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        LoginComponent,
        HomeComponent,
        NotFoundComponent,
        ValuesPipe,
        SafeHTMLPipe,
        LogoutComponent,
        CvComponent,
        EncodetextPipe,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        routing,
        StoreModule.provideStore(reducer),
        EffectsModule.run(UserEffects),
        EffectsModule.run(AuthenticationEffects),
        StoreDevtoolsModule.instrumentStore({
            maxAge: 5
        }),
        SocialAuthenticationModule.forRoot()
    ],
    providers: [
        AuthGuard,
        NonAuthGuard,
        AuthenticationService,
        ApiService,
        UserService,
        AuthenticationActions,
        UserActions,
        UtilityService
    ],
    entryComponents: [
        LogoutComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
