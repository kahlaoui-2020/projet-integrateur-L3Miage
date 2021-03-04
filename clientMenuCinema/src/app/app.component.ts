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
    const firebaseConfig = {
      apiKey: "AIzaSyBCEM2PkW9y4tI0jMB0N2iehMmbT_7apeY",
      authDomain: "menucinema-fd117.firebaseapp.com",
      databaseURL: "https://menucinema-fd117.firebaseio.com",
      projectId: "menucinema-fd117",
      storageBucket: "menucinema-fd117.appspot.com",
      messagingSenderId: "838892627178",
      appId: "1:838892627178:web:225dd5af3fb7e3c4086393",
      measurementId: "G-XYWPKQM9WN"
    };
    // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  }
  
}
