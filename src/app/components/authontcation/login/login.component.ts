import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators,AbstractControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { loginStart } from '../state/authontcation.actions';
import { setLoadingSpinner } from 'src/app/store/shared/shared.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],

})
export class LoginComponent implements OnInit {
  loginForm=new FormGroup({
    email:new FormControl(''),
    password: new FormControl('')
  }); 
   constructor(private formBuilder:FormBuilder,private store:Store<AppState>) { }
   get formValidate(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }
  onLoginSubmit(): void {
    const email=this.loginForm.value.email;
    const password=this.loginForm.value.password;
    this.store.dispatch(setLoadingSpinner({ status: true }));
    this.store.dispatch(loginStart({email,password}));
  }
  ngOnInit(): void {
    this.loginForm=this.formBuilder.group({
      email:new FormControl('',[Validators.email,Validators.required]),
      password: new FormControl('',[Validators.required])
    })
  }

}
