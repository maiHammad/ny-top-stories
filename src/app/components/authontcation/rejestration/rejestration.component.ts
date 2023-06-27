
import { signupStart } from '../state/authontcation.actions';
import { setLoadingSpinner } from 'src/app/store/shared/shared.actions';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators,AbstractControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
@Component({
  selector: 'app-rejestration',
  templateUrl: './rejestration.component.html',
  styleUrls: ['./rejestration.component.scss']
})
export class RejestrationComponent implements OnInit {


  rejesterForm=new FormGroup({
    email:new FormControl(''),
    password: new FormControl('')
  }); 
  constructor(private formBuilder:FormBuilder,private store:Store<AppState>) {}
  get formValidate(): { [key: string]: AbstractControl } {
    return this.rejesterForm.controls;
  }
  ngOnInit(): void {
    this.rejesterForm=this.formBuilder.group({
      email:new FormControl('',[Validators.email,Validators.required]),
      password: new FormControl('',[Validators.required])
    })
  }

  onSignUpSubmit() {
    if (!this.rejesterForm.valid) {
      return;
    }
    const email = this.rejesterForm.value.email;
    const password = this.rejesterForm.value.password;
    this.store.dispatch(setLoadingSpinner({ status: true }));
    this.store.dispatch(signupStart({ email, password }));
  }

}
