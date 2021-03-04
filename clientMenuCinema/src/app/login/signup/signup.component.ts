import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from 'src/app/login.service';
import { Router } from '@angular/router';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';
import { User, auth } from 'firebase/app';
import * as firebase from 'firebase/app';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;
  errorMessage: string;

  constructor(private formBuilder: FormBuilder,
              private loginService: LoginService,
              private router: Router,
              private afAuth: AngularFireAuth, private http: HttpClient) {
                loginService.doPost();
                loginService.doGetClient();
               }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });
  }


  loginGoogle() {
    this.afAuth.signInWithPopup(new auth.GoogleAuthProvider()).finally(
      () => {
        setTimeout(() => {
          this.router.navigate(['/movies']);
       }, 2000);
      }
    );
    
    
  }

  facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider();
    this.afAuth.signInWithPopup(provider).finally(
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


  onSubmit(){
    const email = this.signUpForm.get('email').value;
    const password = this.signUpForm.get('password').value;
    this.loginService.createNewUser(email, password).then(
      () => {
        this.router.navigate(['/movies']);
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }

}
