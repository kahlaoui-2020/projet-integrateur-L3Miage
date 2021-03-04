import { Component } from '@angular/core';
import {TmdbService} from './tmdb.service';
import * as firebase from 'firebase'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private tmdb: TmdbService) {
    const firebaseConfig = {};
    // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  }
  
}
