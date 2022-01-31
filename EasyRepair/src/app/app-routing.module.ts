import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';
import { map } from 'rxjs/operators';

import { HomeComponent } from './components/home/home.component';
import { ProfileComponent as proProfile } from './components/professionals/profile/profile.component';
import { LoginComponent as proLogin } from './components/professionals/login/login.component';
import { LoginComponent as singleLoginComponent } from './components/login/login.component';
import { LoginComponent } from './components/user/login/login.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AuthGuard } from './guards/auth/auth.guard';
import { MainComponent } from './components/main/main.component';
import { ContactComponent } from './components/contact/contact.component';

const redirectLoggedInUserProfile = () => map(user => user ? ['user/profile', (user as any).uid] : true);
const redirectLoggedInProfProfile = () => map(user => user ? ['professionals/profile', (user as any).uid] : true);

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: singleLoginComponent },
  {
    path: 'user/login',
    component: LoginComponent
    // data: { authGuardPipe: redirectLoggedInUserProfile }
  },
  {
    path: 'user/profile/:id',
    component: ProfileComponent,
    canActivate: [AuthGuard, AngularFireAuthGuard],
    // data: { authGuardPipe: unathorizeRedirect }
  },
  {
    path: 'professionals/login',
    component: proLogin,
    // data: { authGuardPipe: redirectLoggedInProfProfile }
  },
  {
    path: 'professionals/profile/:id',
    component: proProfile,
    canActivate: [AuthGuard, AngularFireAuthGuard],
    // data: { authGuardPipe: unathorizeRedirect }
  },
  {
    path: 'main', component: MainComponent
  },
  { path: 'contact', component: ContactComponent },
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
