import { Component, OnInit, ElementRef, HostListener, AfterViewInit, ViewChild, ChangeDetectorRef, Query, Inject, TemplateRef, ViewContainerRef, Type } from '@angular/core';
import {environment} from '../../environments/environment';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { CommandesService } from 'src/app/commandes.service';
import { Commande } from '../bd-data/commande';
import { CarteService } from '../carte.service';
import { Plats, Carte } from '../bd-data/carte';
import { Film, Plat } from '../models/commande';
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
              <div class="modal-body">
                <p><strong> Ce plat vient d'être ajouté à votre liste de commandes encours.</strong></p>
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
                <p><strong>Ce plat vient d'être ajouté à votre liste de commandes encours.</strong></p>
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
  selector: 'app-plats',
  templateUrl: './plats.component.html',
  styleUrls: ['./plats.component.scss']
})
export class PlatsComponent implements OnInit {

  withAutofocus = `<button type="button" ngbAutofocus class="btn btn-danger"
                    (click)="modal.close('Ok click')">Ok</button>`;

  entree : Plats[] = [];
  plat : Plats[] = [];
  dessert : Plats[] = [];
  boisson : Plats[] = [];
  platsChoisi : string[] = []; 
  plats: Carte; 
  searchPlats: Plats[] = [];
  text:string;  
  afficherRecherhce: boolean = false;
  //afficherIngridients: boolean = false;
  id: string;
  constructor(
              private carte: CarteService,
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

  ngOnInit(): void {
  }

  async init() {
    this.plats = await this.carte.getCarte();    

    for (let p of this.plats.plat) {

      switch(p.type) {
        case "ENTREE" : {
          this.entree.push(p);
          break;
        }
        case "DESSERT" : {
          this.dessert.push(p);
          break;
        }
        case "BOISSON" : {
          this.boisson.push(p);
          break;
        }
        case "PLAT":
        default : {
          this.plat.push(p);
          break;
        }
      }      
    }
  }

  open(name: string){
    this._modalService.open(MODALS[name]);
  }

  afficherRechercheTrue() {
    this.afficherRecherhce = true;
  }

  afficherRechercheFalse() {
    this.afficherRecherhce = false;
  }

  afficherIngridients(p: Plats): string {
    return p.ingredients;
  }

  getNomPlat(p: Plats) : string {
    return p.nom;    
  }

  capitalizeFirstLetter() {
    return this.text.charAt(0).toUpperCase() + this.text.slice(1);
  }

  searchPlat() : void {         
    this.searchPlats = [];
    for (let p of this.plats.plat) {
      if (p.nom.includes(this.capitalizeFirstLetter())) {
        this.searchPlats.push(p);
      }
    }
  }

  getSearchPlats() : Plats[] {
    let res : Plats[] = null;          
    res = this.searchPlats;      
     if(res==null){
       console.log("Erreur, entrez bien le nom du plat recherché");      
    }      
    return res;
  }

  selectPlat(p: Plats): void {
    let id : string = p.id + '';
    this.platsChoisi.push(id);
    this.open('focusFirst');
    console.log("Le plat avec id " + id + " est ajouté dans la liste");
    this.onSaveCommande();
  }

  onSaveCommande(){

    for (let i of this.platsChoisi){
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
      // console.log(this.commandes);
      
      
    }

  }
  
}
