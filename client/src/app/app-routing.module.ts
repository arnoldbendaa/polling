import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { LoginComponent } from 'app/login/login.component';
import { SignupComponent } from 'app/signup/signup.component';
import { LostPasswordComponent } from 'app/lost-password/lost-password.component';
import {ResetPasswordComponent} from "./reset-password/reset-password.component";
import {AboutComponent} from "app/about/about.component";

const routes: Routes = [
    { path: '', loadChildren: './layout/layout.module#LayoutModule'},
    { path: 'signup', component: SignupComponent , canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent, canActivate: [AuthGuard]  },
    {path:'lostPassword',component:LostPasswordComponent, canActivate: [AuthGuard] },
    {path:'reset-password',component:ResetPasswordComponent, canActivate: [AuthGuard] },
    { path: 'about', component: AboutComponent},
    { path: 'error', loadChildren: './server-error/server-error.module#ServerErrorModule' },
    { path: 'access-denied', loadChildren: './access-denied/access-denied.module#AccessDeniedModule' },
    { path: 'not-found', loadChildren: './not-found/not-found.module#NotFoundModule' },
    { path: '**', redirectTo: 'not-found' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
