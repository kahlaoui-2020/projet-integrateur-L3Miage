// import { Component, OnInit } from '@angular/core';
// import {auth, User} from 'firebase/app';
// import {AngularFireAuth} from '@angular/fire/auth';
// import { HttpResponse, HttpParams, HttpClient } from '@angular/common/http';



// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.scss']
// })
// export class LoginComponent implements OnInit {

//   constructor( private afAuth: AngularFireAuth, private http: HttpClient ) {
//     afAuth.user.subscribe( async (u: User) => {
//       console.log("L’utilisateur Firebasse est ", u);
//       // On contacte le serveur métier pour l'informer si un nouvel utilisateur existe :
//       if (u !== null) {
//         const reponseServeur = await this.POST('/api/authentification', {userId: u.uid});
//         console.log('Le serveur répond', reponseServeur);
//       }
//     });
// }



//   loginGoogle() {
//   this.afAuth.signInWithPopup(new auth.GoogleAuthProvider());
// }

//   ngOnInit(): void {
    
//   }
   
//   private POST(url, params: {[key: string]: string}): Promise<HttpResponse<string>> {
//     const P = new HttpParams( {fromObject: params} );
//     console.log(params, P, P.toString());
//     return this.http.post( url, P, {
//       observe: 'response',
//       responseType: 'text',
//       headers: {'content-type': 'application/x-www-form-urlencoded'}
//     }).toPromise();
//    }

   

// }


