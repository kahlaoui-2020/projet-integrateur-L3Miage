import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoviesComponent } from './movies/movies.component';
import { SigninComponent } from './login/signin/signin.component';
import { LoginGuardService } from './login-guard.service';
import { SignupComponent } from './login/signup/signup.component';
import { SidebarClientComponent } from './sidebar-client/sidebar-client.component';
import { PersonneComponent } from './personne/personne.component';
import { TelevisionComponent } from './television/television.component';
import { PlatsComponent } from './plats/plats.component';


const routes: Routes = [

  {path: 'login/signup', component: SignupComponent},
  {path: 'login/signin', component: SigninComponent},
  {path: 'movies', canActivate:[LoginGuardService], component: MoviesComponent},
  {path: 'plats', canActivate:[LoginGuardService], component: PlatsComponent},
  {path: 'television', canActivate:[LoginGuardService], component: TelevisionComponent},
  {path: 'artistes', canActivate:[LoginGuardService], component: PersonneComponent},
  {path: 'sidebar-client', canActivate:[LoginGuardService], component: SidebarClientComponent  },
   {path: '', redirectTo:'movies', pathMatch:'full'},
   {path: '**', redirectTo:'movies'}


  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: []
})
export class AppRoutingModule { }
