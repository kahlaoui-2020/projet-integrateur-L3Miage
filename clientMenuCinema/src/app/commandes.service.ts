
import { Subject } from 'rxjs/Subject';
import * as firebase from 'firebase';
import { Commande, Film, Plat } from './models/commande';
import { CommandeClient, CommandeCli, Articles } from './bd-data/client';

import { AngularFireAuth } from '@angular/fire/auth';
import { HttpClient, HttpParams, HttpResponse, HttpHeaders } from '@angular/common/http';
import { User} from 'firebase/app';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';


@Injectable()
export class CommandesService {

    commandes: Commande[] ;
    commande: CommandeClient;
    articles: Articles;
    lesarticles: Articles[];
    film: Film;
    plat: Plat;
    commandesSubject = new Subject<Commande[]>();

    constructor(private afAuth: AngularFireAuth, private http: HttpClient) {

    }


    httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  
    /** POST: add a new hero to the server */
    
    doPost(commande: Commande[]): Observable<Commande[]> {
      console.log(commande);
      return this.http.post<Commande[]>('/api/commande', commande, this.httpOptions);
    }



    // public doPost(){
    //     this.afAuth.user.subscribe( async (u: User) => {
    //       console.log("L’utilisateur Firebasse est ", u);
    //       // On contacte le serveur métier pour l'informer si un nouvel utilisateur existe :
    //       if (u !== null) {
    //         this.commande.date = new Date();
    //         this.commande.idClient = u.uid;
    //           for(let i of this.commandes){
    //             this.commande.adresseLivraison = i.adresse;
                
    //             this.articles.codeArticle = i.film.idFilm;
    //             this.articles.categorie = 'film';
    //             this.lesarticles.push(this.articles);
    //             this.articles.codeArticle = i.plat.idPlat;
    //             this.articles.categorie = 'plat';
    //             this.lesarticles.push(this.articles);
                
                
                
    //           }
              
    //         const reponseServeur = await this.POST('/api/commande', {commande:this.commande});
    //         console.log('Le serveur répond', reponseServeur);
    //       }
    //     });
    //    }

    // private POST (url, params: {[key: string]: CommandeClient}): Promise<HttpResponse<string>>{
    //     const P = new HttpParams( {fromObject: params} );
    //       console.log(params, P, P.toString());
    //       return this.http.post( url, P, {
    //         observe: 'response',
    //         responseType: 'text',
    //         headers: {'content-type': 'application/x-www-form-urlencoded'}
    //       }).toPromise();
      
    //   }


    emit() {
        this.commandesSubject.next(this.commandes);
    }

saveCommande() {
        firebase.database().ref('/commandes').set(this.commandes);
        
    }
saveFilm(){
    firebase.database().ref('/commandes/film').set(this.film);
}

savePlat(){
    firebase.database().ref('/commandes/plat').set(this.plat);
}

    getCommandes() {
        firebase.database().ref('/commandes')
            .on('value',
                (data) => {
                    this.commandes = data.val() ? data.val() : [];
                    this.emit();
                });
    }

    getUneCommande(id: number) {
        return new Promise(
            (resolve, reject) => {
                firebase.database().ref('/commandes/' + id).once('value').then(
                    (data) => {
                        resolve(data.val());
                    },
                    (error) => {
                        reject(error);
                    }
                );
            }
        );

    }


    createNouvelleCommande(lefilm: Film, leplat: Plat, id: string, adresse: string, prix: number){

        let commande = new Commande(id, new Date(), lefilm, leplat, adresse, prix)
        this.commandes.push(commande);
        this.saveCommande();
        this.emit();
        console.log(commande);
        
    }

   
    removeCommandeFilm(commande: Film){
        const commandeIndexToRemove = this.commandes.findIndex(
          (commandeT) => {
            if(commandeT.film === commande){
                return true;
            }
          }
        );
        this.commandes.splice(commandeIndexToRemove, 1);
        this.saveCommande();
        this.emit();
      }



removeCommandePlat(commande: Plat){
    const commandeIndexToRemove = this.commandes.findIndex(
      (commandeT) => {
        if(commandeT.plat === commande){
          return true;
        }
      }
    );
    this.commandes.splice(commandeIndexToRemove, 1);
    this.saveCommande();
    this.emit();
  }

}