import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LogGuard } from './auth/log.guard';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';


const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "starshipsList", canActivate: [AuthGuard], loadChildren: () => import('../starshipsList/starships.module').then(m => m.StarshipsModule) },
  { path: "login", canActivate: [LogGuard], component: LoginComponent},
  { path: "signup", component: SignupComponent},
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  {path: '**', pathMatch: 'full', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
