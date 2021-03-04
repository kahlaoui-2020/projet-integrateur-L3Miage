import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TmdbService } from '../tmdb.service';
import { environment } from 'src/environments/environment';
import { PersonResponse } from '../tmdb-data/Person';

@Component({
  selector: 'app-person',
  templateUrl: './personne.component.html',
  styleUrls: ['./personne.component.scss']
})
export class PersonneComponent implements OnInit {

  pPersonne = [];
  constructor( private tmdb: TmdbService,
    private cdRef: ChangeDetectorRef ) { }

   ngOnInit(): void {
    this.init();
    
  }

  async init() {
    this.tmdb.init( environment.tmdbKey );        
    for (let i = 1; i < 33; i++) {      
      try {
        let person = await this.tmdb.getPerson(i);
        
        if(person.profile_path != null){
          this.pPersonne.push(person);
        }
      } catch (Error) {
        console.error;
      }      
    }
  }

  get personnes(): PersonResponse[] {
    return this.pPersonne;
  }
  getPersonName(pPersonne : PersonResponse) : String {
    return pPersonne.name;
  }

  getImage(pPersonne: PersonResponse): String{
    return pPersonne.profile_path;
  }

}