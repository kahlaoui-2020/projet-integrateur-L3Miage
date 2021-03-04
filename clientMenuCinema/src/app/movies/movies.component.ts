import { Component, OnInit, OnDestroy, ElementRef, HostListener, AfterViewInit, ViewChild, ChangeDetectorRef, Query, Inject, TemplateRef, ViewContainerRef, Type } from '@angular/core';
import {MovieResponse, PopularResponse, UpCommingResponse, NowPlayingResponse} from '../tmdb-data/Movie';
import {TmdbService} from '../tmdb.service';
import {environment} from '../../environments/environment';
import {SearchMovieQuery, SearchMovieResponse, MovieResult } from '../tmdb-data/searchMovie';

import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { CommandesService } from 'src/app/commandes.service';
import { Commande, Film, Plat } from '../models/commande';
import { Subscription } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase/app';


@Component({
  selector: 'ngbd-modal-confirm',
  template: `<div class="modal-header">
                <h4 class="modal-title" id="modal-title">Confirmation partielle d'achat</h4>
                <button type="button" class="close" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body" >
                <p><strong> Ce film  vient d'être ajouté à votre liste de commandes encours.</strong></p>
                <p>Veuillez vous rendre dans votre commpte client pour finaliser la commande.
                  <span class="text-danger"> <h4>La commande n'est pas encore validée. </h4></span>
                </p>
              </div>
              <div class="modal-footer">
                
                <button type="button" class="btn btn-danger" (click)="modal.close('Ok click')">D'ACCORD</button>
              </div>`
})

//<button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Cancel </button>

export class NgbModalConfirm{
  constructor(public modal: NgbActiveModal){

  }
}

@Component({
  selector: 'ngbd-modal-confirm-autofocus',
  template: `<div class="modal-header">
                <h4 class="modal-title" id="modal-title">Confirmation partielle d'achat</h4>
                <button type="button" class="close" aria-label="Close button" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <p><strong>Ce film vient d'être ajouté à votre liste de commandes encours.</strong></p>
                <p>Veuillez vous rendre dans votre commpte client pour finaliser la commande.
                  <span class="text-danger"> <h4>La commande n'est pas encore validée. </h4> </span>
                </p>
              </div>
              <div class="modal-footer">
                
                <button type="button" class="btn btn-danger" (click)="modal.close('Ok click')">D'ACCORD</button>
              </div>`
})

//<button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Cancel </button>

export class NgbdModalConfirmAutofocus {
  constructor(public modal: NgbActiveModal){}
   
}
  const MODALS: {[name: string]: Type<any>} = {
    focusFirst: NgbModalConfirm,
    autofocus: NgbdModalConfirmAutofocus
  };

  let titre: string ="";


@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit, OnDestroy {
  
  
 withAutofocus = `<button type="button" ngbAutofocus class="btn btn-danger"
                    (click)="modal.close('Ok click')">D'ACCORD</button>`;

  pFilms = [];
  popular: MovieResponse[];
  upCome: MovieResponse[];
  nowPlaying = [];
  filmsChoisi = [];
  sFilm: SearchMovieResponse;    
  text:string;

  film: Film[];
  plat: Plat[];

  id: string;

  
  subscriptionCommande: Subscription;
  afficher:boolean = false;
  commandes : Commande[];

  constructor(private tmdb: TmdbService,
              private cdRef: ChangeDetectorRef,
              private _modalService: NgbModal,
              private commandeService: CommandesService,
              private afAuth: AngularFireAuth
              ) {
    this.init();

    this.afAuth.user.subscribe(
      (u: User) => {
        if(u != null){
          this.id = u.uid;
          
        }
          
      }
    )


  }
  open(name: string){
    this._modalService.open(MODALS[name]);
  }

  

  
  ngOnInit(): void {
    this.subscriptionCommande = this.commandeService.commandesSubject.subscribe(
      (commandes: Commande[]) => {
        this.commandes = commandes;
      }
    );
    this.commandeService.getCommandes();
    this.commandeService.emit();
    console.log(this.commandes);
    
  }

  afficherTrue() {
    this.afficher = true;
  }

  afficherFalse() {
    this.afficher = false;
  }
  onClose(){
    this.afficher = false;
  }

  async init() {
    this.tmdb.init( environment.tmdbKey );
            
    for (let i = 1; i < 33; i++) {      
      try {
        let film = await this.tmdb.getMovie(i);
       await this.tmdb.getMoviePopular().then(
          (value: PopularResponse) => {
            this.popular = value.results ? value.results:[];
          }
        );
        //this.popular.push(pop);

        await this.tmdb.getMovieUpComming().then(
          (value: UpCommingResponse) => {
            this.upCome =value.results;
          }
        );

        await this.tmdb.getMovieNowPlaying().then(
          (value: NowPlayingResponse) => {
            this.nowPlaying = value.results;
          }
        );
        
        if(film.poster_path != null){
          this.pFilms.push(film);
        }
      } catch (Error) {
        console.error;
      }      
    }
    
  }

  get films(): MovieResponse[] {
    return this.pFilms;
  }

  getFilmTitre(pFilm : MovieResponse) : String {
    return pFilm.title;
  }

  getFilmDate(pFilm : MovieResponse) : String {
    return pFilm.release_date;
  }

  getFilmGenre(pFilm : MovieResponse) : String {
    return pFilm.genres[0].name;
  }

  getFilmTime(pFilm : MovieResponse) : number {
    return pFilm.runtime;
  }

  getImage(pFilm: MovieResponse): String{
    return pFilm.poster_path;
  }


  get populars(): MovieResponse[]{
     return this.popular;
   }

  get upComming(): MovieResponse[]{
    return this.upCome;
  }

  get now_playing() : MovieResponse[]{
    return this.nowPlaying;
  }

   async searchFilm() {
    this.tmdb.init( environment.tmdbKey );
    let search : SearchMovieQuery;   
    if (this.text != null) {
      search = {query : this.text};    
    }/* else {
      search = {query : "jaws"};    
    }*/
    
    try {     
      this.sFilm = await this.tmdb.searchMovie(search);                
    } catch (Error) {      
      console.error;
    }
  }



  getSearchFilms() : MovieResult[] {
    let res : MovieResult[] = null;
    //console.log(this.text);
    
    //try {      
      res = this.sFilm.results;  
      //console.log(this.sFilm.results);      
   // } catch (Error) {
     if(res==null){
       console.log("Erreur, entrez bien le nom du film recherché");
      //console.error
    }      
    return res;
  }

  selectFilm(pFilm: MovieResponse | MovieResult): void {
    let id : string = pFilm.title + '';
    titre +=id;
    this.filmsChoisi.push(id);
    this.open('focusFirst');
    console.log("Le film avec id " + id + " est ajouté dans la liste");
    console.log(titre);
    this.onSaveCommande();
  }

  onSaveCommande(){

    for (let i of this.filmsChoisi){
      const idFilm = i;
      const quantiteFilm = 1;
      const quantitePlat = 0;
      const idPlat = "";
      const adresse ='';
      

      const lefilm = new Film(idFilm, quantiteFilm);
      const leplat = new Plat(idPlat, quantitePlat);
      
      const prix =10;
      console.log(this.id);
      this.commandeService.createNouvelleCommande(lefilm, leplat,this.id, adresse,prix);
      console.log(this.commandes);
      
      
    }
    
    //this.router.navigate(['/commandes']);

  }

  ngOnDestroy(){
    this.subscriptionCommande.unsubscribe();
  }
  
}

