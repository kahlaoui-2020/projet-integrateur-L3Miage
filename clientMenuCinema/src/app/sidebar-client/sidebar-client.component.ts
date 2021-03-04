import { Component, OnInit, OnDestroy, Type, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TmdbService } from '../tmdb.service';
import { environment } from 'src/environments/environment';
import { MovieResponse } from '../tmdb-data/Movie';
import { Commande, Film, Plat } from '../models/commande';
import { CommandesService } from 'src/app/commandes.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from '../login.service';
import { Client, CommandeCli, CommandeClient } from '../bd-data/client';
import { ClientService } from '../client.service';
import { database } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth/auth';
import { HttpClient } from '@angular/common/http';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap'




@Component({
  selector: 'ngbd-modal-confirm',
  template: `<div class="modal-header">
                <h4 class="modal-title" id="modal-title">Les détails de la commande</h4>
                <button type="button" class="close" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body" >
              <table class="table table-bordered table-condensed table-body-center">
              <thead>
                <tr>
                  <td>Item</td>
                  <td>Articles</td>
                  <td>Qte</td>
                  <td>PU</td>
                  <td>Montant</td>
                </tr>
              </thead>
              <tbody>
              <tr>
              <td>Item</td>
              <td>Articles</td>
              <td>Qte</td>
              <td>PU</td>
              <td>Montant</td>
            </tr>
              </tbody>
            </table>
              </div>
              <div class="modal-footer">
                
                <button type="button" class="btn btn-danger" (click)="modal.close('Ok click')">OK</button>
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
                <h4 class="modal-title" id="modal-title">Facture de la commande</h4>
                <button type="button" class="close" aria-label="Close button" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
              <div>
                <p><strong>Facture N° 452525225.</strong> </p><p><strong class="text-right"> Client : _________ </strong> </p>
                <p><strong>Date : 04/05/2020.</strong> </p> <p><strong class="text-right"> Adresse : _________ </strong> </p>
              </div>
                <table class="table table-bordered table-condensed table-body-center">
                  <thead>
                    <tr>
                      <td>Item</td>
                      <td>Articles</td>
                      <td>Qte</td>
                      <td>PU</td>
                      <td>Montant</td>
                    </tr>
                  </thead>
                  <tbody>
                  <tr>
                  <td>Item</td>
                  <td>Articles</td>
                  <td>Qte</td>
                  <td>PU</td>
                  <td>Montant</td>
                </tr>
                  </tbody>
                </table>
                <p class="text-right"><strong class="text-danger" >Total HT : ______.</strong>
                </p>
                <p class="text-right"><strong class="text-danger">TVA : ______.</strong>
                </p>
                <p class="text-right"><strong class="text-danger">Total TTC : ______.</strong>
                </p>
              </div>
              <div class="modal-footer">
                
                <button type="button" class="btn btn-danger" (click)="modal.close('Ok click')">Telecharger</button>
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









@Component({
  selector: 'app-sidebar-client',
  templateUrl: './sidebar-client.component.html',
  styleUrls: ['./sidebar-client.component.scss']
})

export class SidebarClientComponent implements OnInit, OnDestroy {


  @Input() detail: CommandeClient;
  withAutofocus = `<button type="button" ngbAutofocus class="btn btn-danger"
                    (click)="modal.close('Ok click')">D'ACCORD</button>`;

                    afficher:boolean = false;
                    afficherD: boolean = false;

  commandeForm: FormGroup;
  films: MovieResponse [] = [];
  commandes: Commande[]=[];
  subscriptionCommande: Subscription;
  client: Client;

  commandeClient: CommandeCli ;

  film: Film;
  plat: Plat;

  newCommande: Commande;
  afficherFilm: boolean = false;
  afficherPlat: boolean = false;
  userId: string;

  constructor(private formbuilder: FormBuilder,
              private tmdb: TmdbService,
              private commandeService: CommandesService,
              private router: Router,
              private _modalService: NgbModal,
              private loginService: LoginService,
              private clientService: ClientService,
              private route: ActivatedRoute) {
                this.init();
                
                //loginService.doPost();
                loginService.doGetClient().then(
                  data => { 
                      this.client = data;
                      this.userId = data.id;
                      console.log(this.client);
                      //this.getCommandesDataClient();
                     
                      }
                  
                );
                
                  
                  
               }

  open(name: string){
      this._modalService.open(MODALS[name]);
  }         
afficherTrue() {
    this.afficher = true;
    this.afficherD = false;
  }
afficheDetail(){
  this.afficherD = true;
  this.afficher = false;
}
onClose(){
  this.afficher = false;
  this.afficherD = false;
}
  ngOnInit(): void {
    this.initForm();
    this.subscriptionCommande = this.commandeService.commandesSubject.subscribe(
      (commandes: Commande[]) => {
        this.commandes = commandes;
        
    }
    );
    
    this.commandeService.getCommandes();
    this.commandeService.emit();
    console.log(this.commandes);
    this.clientService.doGetCommandeClient().then(
      (data) => {
          this.commandeClient=data;
         
        
        console.log('sidebar-client' + this.commandeClient);
      }
    );
  }
  

  getDetail(){
    const id =  +this.route.snapshot.paramMap.get('id');
    return id;
  }

  onDeleteCommandeFilm(commande: Film){
    this.commandeService.removeCommandeFilm(commande);
  }

onDeletCommandePlat(commande: Plat){
  this.commandeService.removeCommandePlat(commande);
}

get totalCommande(): Commande[]{
  return this.commandes;
}


trouver(){
  
  
}

  initForm(){
    this.commandeForm = this.formbuilder.group(
      {
        
        idFilm: ['' , Validators.required],
        quantiteFilm: [1, Validators.required],
        idPlat: ['', Validators.required],
        quantitePlat: [1, Validators.required],
        adresse: ['', Validators.required]
      }
    )
  }


commandeValider(){
  this.commandeService.doPost(this.commandes);
}
  onSaveCommande(){

    const idFilm = this.commandeForm.get('idFilm').value;
    const quantiteFilm = this.commandeForm.get('quantiteFilm').value;
    const idPlat = this.commandeForm.get('idPlat').value;
    const quantitePlat = this.commandeForm.get('quantitePlat').value;
    const adresse = this.commandeForm.get('adresse').value;
    const id= this.userId;
     const lefilm = new Film(idFilm, quantiteFilm);
     const leplat = new Plat(idPlat, quantitePlat);
    const prix = 0;
      this.commandeService.createNouvelleCommande(lefilm, leplat, id,adresse, prix);
    
    console.log(this.commandes);

    //this.commandeService.createNouvelleCommande(this.lefilm, this.leplat, adresse, prix, id);
    
    this.initForm();
    
   //console.log(this.newCommande);
    
  }



   
  async init() {
    this.tmdb.init( environment.tmdbKey );
            
    for (let i = 1; i < 33; i++) {      
      try {
        let film = await this.tmdb.getMovie(i);
        
        if(film.poster_path != null){
          this.films.push(film);
        }
      } catch (Error) {
        console.error;
      }      
    }
    
  }
  get lesfilms(): MovieResponse[] {
    return this.films;
  }

  get lesCommandes(): CommandeCli{
    //console.log('le remplissage'+ this.commandeClient);
    return this.commandeClient;
  }
  getImage(pFilm: MovieResponse): String{
    return pFilm.poster_path;
  }

  getFilmTitre(pFilm : MovieResponse) : String {
    return pFilm.title;
  }
  
  ngOnDestroy(){
    this.subscriptionCommande.unsubscribe();
  }

}
