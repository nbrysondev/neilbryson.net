// Angular
import {Routes, RouterModule } from '@angular/router';

// Guards
import { AuthGuard, NonAuthGuard } from './guards';

// Components
import { LoginComponent } from './components/login';
import { HomeComponent } from './components/home';
import { NotFoundComponent } from './components/not-found';
import { LogoutComponent } from './components/logout/logout.component';
import { CvComponent } from './components/cv/cv.component';

const appRoutes: Routes = [
    { path: '', redirectTo: 'cv', pathMatch: 'full'},
    { path: 'admin', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'cv' , component: CvComponent },
    { path: 'login', component: LoginComponent },
    // otherwise redirect to 404
    { path: '**', component: NotFoundComponent }
];

export const routing = RouterModule.forRoot(appRoutes);
