import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { HttpClient, HttpParams, HttpResponse, HttpHeaders } from '@angular/common/http';
import { User} from 'firebase/app';
import { Client } from './bd-data/client';
import { $ } from 'protractor';
import { __values } from 'tslib';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
//import { Response } from '@angular/http';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  client: Client;
  constructor( private afAuth: AngularFireAuth,
                private http: HttpClient) {
      
    
   }

   public doPost(){
    this.afAuth.user.subscribe( async (u: User) => {
      console.log("L’utilisateur Firebasse est ", u);
      // On contacte le serveur métier pour l'informer si un nouvel utilisateur existe :
      if (u !== null) {
        const reponseServeur = await this.POST('/api/authentification', {userId: u.uid});
        console.log('Le serveur répond', reponseServeur);
      }
    });
   }

   private async get<T>(url: string): Promise<HttpResponse<T>> {
    return this.http.get<T>( url, {
      observe: 'response',
      responseType: 'json',
      headers: { 'content-type': 'application/x-www-form-urlencoded' }
    }).toPromise();
  }

  public async doGetClient(): Promise<Client> {
    let res;
    this.afAuth.user.subscribe(async (u: User) => {
      console.log("L’utilisateur Firebasse est ", u);
      
      const url = '/api/authentification';
      if (u !== null) {
        const params = new HttpParams({
          fromString: `?userId=${u.uid}`
        });
        res = await this.get<Client>(url+params)
                .then(value => {this.client = value.body})
                .catch();
        console.log('Le serveur nous répond', this.client);
      }
    });
    return this.client
  }
      

   private POST(url, params: {[key: string]: string}): Promise<HttpResponse<string>> {
    const P = new HttpParams( {fromObject: params} );
    console.log(params, P, P.toString());
    return this.http.post( url, P, {
      observe: 'response',
      responseType: 'text',
      headers: {'content-type': 'application/x-www-form-urlencoded'}
    }).toPromise();
   }



  createNewUser(email: string, password: string){
    return new Promise(
      (resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(
          () => {
            resolve();
          },
          (error) => {
            reject(error);
          }
        );

      }
    );
  }

  signInUser(email: string, password: string){
    return new Promise (
      (resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password).then(
          () => {
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  signOutUser(){
    firebase.auth().signOut();
  }
}
