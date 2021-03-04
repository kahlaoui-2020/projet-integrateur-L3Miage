import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { User, auth } from 'firebase/app';
import * as firebase from 'firebase/app'
import { ClientService } from 'src/app/client.service';
import { Client } from 'src/app/bd-data/client';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {




  signInForm: FormGroup;
  errorMessage: string;
  

  constructor(private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private afAuth: AngularFireAuth, private http: HttpClient,
    private clientService: ClientService) { 

      loginService.doPost();
      loginService.doGetClient();

    }

    
  


  ngOnInit(): void {
    this.initForm();
    
  }



  loginGoogle() {
    this.afAuth.signInWithPopup(new auth.GoogleAuthProvider()).finally(
      ()=> {
        setTimeout(() => {
          this.router.navigate(['/movies']);
       }, 2000);
      }
    );
    
    
  }
  facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider();
    this.afAuth.signInWithPopup(provider);
    this.router.navigate(['/movies']).finally(
      ()=> {
        setTimeout(() => {
          this.router.navigate(['/movies']);
       }, 2000);
      }
    );
  }

  twitterLogin() {
    const provider = new firebase.auth.TwitterAuthProvider();
    this.afAuth.signInWithPopup(provider);
    this.router.navigate(['/movies']).finally(
      ()=> {
        setTimeout(() => {
          this.router.navigate(['/movies']);
       }, 2000);
      }
    );
  }

  initForm(){
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });
  }

  onSubmit(){
    const email = this.signInForm.get('email').value;
    const password = this.signInForm.get('password').value;
    this.loginService.signInUser(email, password).then(
      () => {
        this.router.navigate(['/movies']);
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }

}
