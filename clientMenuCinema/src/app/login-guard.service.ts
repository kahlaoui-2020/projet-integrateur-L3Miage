import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase'

@Injectable()
export class LoginGuardService implements CanActivate{

  constructor(private router: Router) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise (
      (resolve, reject) => {
        firebase.auth().onAuthStateChanged(
          (user) => {
              if(user){
                resolve(true);
              } else {
                this.router.navigate(['/login', 'signin']);
                resolve(false);
              }
          }
        );
        
      }
    );
  }

  
}