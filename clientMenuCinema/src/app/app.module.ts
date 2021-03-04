import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {TmdbService} from './tmdb.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
//import {LoginComponent} from './login/login.component';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { MoviesComponent } from './movies/movies.component';
import { MenuComponent } from './menu/menu.component';
import { SingleMovieComponent } from './movies/single-movie/single-movie.component';
import { FooterComponent } from './footer/footer.component';
import { BodyComponent } from './body/body.component';
import { SearchFilmComponent } from './search-film/search-film.component';
import { SigninComponent } from './login/signin/signin.component';
import { LoginGuardService } from './login-guard.service';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './login/signup/signup.component';
import { HeaderComponent } from './header/header.component';
import { LoginService } from './login.service';
import { SidebarClientComponent } from './sidebar-client/sidebar-client.component';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { PersonneComponent } from './personne/personne.component';


// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



// import { PopupModule } from '@progress/kendo-angular-popup';
// import { ResizeSensorComponent } from '@progress/kendo-angular-common'

import { NgbPaginationModule, NgbAlertModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommandesService } from 'src/app/commandes.service';
import { TelevisionComponent } from './television/television.component';
import { CarteService } from './carte.service';
import { PlatsComponent } from './plats/plats.component';
import { ClientService } from './client.service';








const routes: Routes = [

  {path: 'login/signup', component: SignupComponent},
  {path: 'login/signin', component: SigninComponent},
  {path: 'movies', canActivate:[LoginGuardService], component: MoviesComponent}
 

  
  
];






@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    MenuComponent,
    SingleMovieComponent,
    FooterComponent,
    BodyComponent,
    SearchFilmComponent,
    SigninComponent,
    SignupComponent,
    HeaderComponent,
    SidebarClientComponent,
    PersonneComponent,
    TelevisionComponent,
    PlatsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    MDBBootstrapModule.forRoot(),
    NgbPaginationModule,
    NgbAlertModule,
    NgbModule
  ],
  providers: [TmdbService, HttpClient, LoginService, LoginGuardService, CommandesService, CarteService, ClientService],
  bootstrap: [AppComponent],

  
})
export class AppModule { }
