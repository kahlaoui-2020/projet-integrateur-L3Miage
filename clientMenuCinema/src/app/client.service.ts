import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Client, CommandeClient, CommandeCli } from './bd-data/client';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
//import { Response } from '@angular/http';
import { AngularFireAuth } from '@angular/fire/auth';
import { User} from 'firebase/app';


@Injectable({
    providedIn: 'root'
  })
export class ClientService {

    totalAngularPackages;

    //private url = '/api/client';

    commande: CommandeCli;
    
    constructor(private afAuth: AngularFireAuth,
                private http: HttpClient){


    }

    ngOnInit(){
       
    }


      private async get<T>(url: string): Promise<HttpResponse<T>> {
        return this.http.get<T>( url, {
          observe: 'response',
          responseType: 'json',
          headers: { 'content-type': 'application/x-www-form-urlencoded' }
        }).toPromise();
      }
    
      public async doGetCommandeClient(): Promise<CommandeCli> {
        let res;
        this.afAuth.user.subscribe(async (u: User) => {
          console.log("L’utilisateur Firebasse est ", u);
          
          const url = '/api/client';
          if (u !== null) {
            const params = new HttpParams({
              fromString: `?userId=${u.uid}`
            });
            res = await this.get<CommandeCli>(url+params)
                    .then(value => {
                        this.commande = value.body})
                    
                    .catch();
            console.log('Le serveur nous répond', this.commande);
          }
        });
        
        return this.commande
      }




    // getClient(){
    //     this.http.get<Client>('/api/client').subscribe(
    //         data => { this.totalAngularPackages = data,
    //         error => console.log('Il y a erreur de donnees', error) }
    //     )
    // }
    
}