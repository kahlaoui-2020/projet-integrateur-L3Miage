import { Component, OnInit, ElementRef, HostListener, AfterViewInit, ViewChild, ChangeDetectorRef, Query, Inject, TemplateRef, ViewContainerRef, Type } from '@angular/core';
import { TmdbService } from '../tmdb.service';
import { environment } from 'src/environments/environment';
import { TVResponse, PopularTVResponse, OnTheAirResponse } from '../tmdb-data/TV';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { CommandesService } from '../commandes.service';
import { SearchTVQuery, SearchTVResponse, TVResult } from '../tmdb-data/SearchTV';
import { Commande, Film, Plat } from '../models/commande';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase/app';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ngbd-modal-confirm',
  template: `<div class="modal-header">
                <h4 class="modal-title" id="modal-title">Confirmation partielle d'achat</h4>
                <button type="button" class="close" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <p><strong> Ce TV vient d'être ajouté à votre liste de commandes encours.</strong></p>
                <p>Veuillez vous rendre dans votre commpte client pour finaliser la commande.
                  <span class="text-danger"> La commande n'est pas encore validée. </span>
                </p>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Cancel </button>
                <button type="button" class="btn btn-danger" (click)="modal.close('Ok click')">OK</button>
              </div>`
})

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
                <p><strong>Ce TV vient d'être ajouté à votre liste de commandes encours.</strong></p>
                <p>Veuillez vous rendre dans votre commpte client pour finaliser la commande.
                  <span class="text-danger"> La commande n'est pas encore validée. </span>
                </p>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Cancel </button>
                <button type="button" class="btn btn-danger" (click)="modal.close('Ok click')">OK</button>
              </div>`
})

export class NgbdModalConfirmAutofocus {
  constructor(public modal: NgbActiveModal){}

}
  const MODALS: {[name: string]: Type<any>} = {
    focusFirst: NgbModalConfirm,
    autofocus: NgbdModalConfirmAutofocus
  };

@Component({
  selector: 'app-television',
  templateUrl: './television.component.html',
  styleUrls: ['./television.component.scss']
})
export class TelevisionComponent implements OnInit {

  withAutofocus = `<button type="button" ngbAutofocus class="btn btn-danger"
                    (click)="modal.close('Ok click')">Ok</button>`;

  television = [];
  tvChoisi = [];
  text : string;
  sTV: SearchTVResponse; 
  afficher:boolean = false;
  popular = [];
  nowPlaying = [];  

  id: string;

  subscriptionCommande: Subscription;
  commandes : Commande[];

  constructor( private tmdb: TmdbService,
    private _modalService: NgbModal,
    private commandeService: CommandesService, private afAuth: AngularFireAuth ) { 
      this.init();
      this.afAuth.user.subscribe(
        (u: User) => {
          if(u != null){
            this.id = u.uid;
            
          }
            
        }
      )
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

  open(name: string){
    this._modalService.open(MODALS[name]);
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
    for (let i = 1; i < 35; i++) {      
      try {

        let tele = await this.tmdb.getTV(i);        
        if(tele.poster_path != null){
          this.television.push(tele);
        }

        await this.tmdb.getTvPopular().then(
          (value: PopularTVResponse) => {
            this.popular = value.results;
          }
        );

        await this.tmdb.getTvNowPlaying().then(
          (value: OnTheAirResponse) => {
            this.nowPlaying = value.results;
          }
        );

      } catch (Error) {
        console.error;
      }      
    }
  }

  get tv(): TVResponse[] {
    return this.television;
  }
  getTvName(tele : TVResponse) : String {
    return tele.name;
  }

  getImage(tele: TVResponse): String{
    return tele.poster_path;
  }

  get populars(): TVResponse[]{
    return this.popular;
  }

  get now_playing() : TVResponse[]{
   return this.nowPlaying;
  }

  async searchTV() {
    this.tmdb.init( environment.tmdbKey );
    let search : SearchTVQuery;   
    if (this.text != null) {
      search = {query : this.text};    
    }
    
    try {     
      this.sTV = await this.tmdb.searchMovie(search);                
    } catch (Error) {      
      console.error;
    }
  }

  getSearchTV() : TVResult[] {
    let res : TVResult[] = null;          
      res = this.sTV.results;           
     if(res==null){
       console.log("Erreur, entrez bien le nom du film recherché");      
    }      
    return res;
  }

  onSaveCommande(){

    for (let i of this.tvChoisi){
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
      //console.log(this.commandes);
      
      
    }

  }

  selectTV(tele: TVResponse): void {
    let id : string = tele.id + '';
    this.tvChoisi.push(id);
    this.open('focusFirst');
    console.log("Le TV " + id + " est ajouté dans la liste");
    this.onSaveCommande();
  }

}
