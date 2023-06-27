import { Injectable } from "@angular/core";  
import { HttpClient } from '@angular/common/http';
import { AuthorityRsponseData } from "../models/authorityResponse.model";
import { Observable } from "rxjs";
import { User } from "../models/user.model";
import { Store } from '@ngrx/store';
import { AppState } from "../store/app.state";
import { autoLogout } from "../components/authontcation/state/authontcation.actions";
@Injectable({
    providedIn:'root',
})

export class AuthorityService{
    timeoutInterval: any;

    constructor(private http:HttpClient, private store: Store<AppState>){}
login(email:string,password:string):Observable<AuthorityRsponseData>{
    return this.http.post<AuthorityRsponseData>(`http://localhost:8000/auth/login`,
    {email,password,returnSecureToken:true}
    );
}
signUp(email: string, password: string): Observable<AuthorityRsponseData> {
  return this.http.post<AuthorityRsponseData>(
    `http://localhost:8000/auth/register`,
    { email, password, returnSecureToken: true }
  );
}
userToken(data:AuthorityRsponseData){
    const expirationDate=new Date(new Date().getTime()+(15*60)*1000);
    const user=new User(data.access_token,expirationDate);
    
    return user;
}
getErrorMessage(message: string) {
    switch (message) {
      case 'EMAIL_NOT_FOUND':
        return 'Email Not Found';
      case 'INVALID_PASSWORD':
        return 'Invalid Password';
      case 'EMAIL_EXISTS':
        return 'Email already exists';
      default:
        return 'Unknown error occurred. Please try again';
    }
  }

setUserInLocalStorage(user: User) {
    localStorage.setItem('userData', JSON.stringify(user));

    this.runTimeoutInterval(user);
  }

  runTimeoutInterval(user: User) {
    const todaysDate = new Date().getTime();
    const expirationDate = user.expireDate.getTime();
    const timeInterval = expirationDate - todaysDate;

    this.timeoutInterval = setTimeout(() => {
      this.store.dispatch(autoLogout());
      //logout functionality or get the refresh token
    }, timeInterval);
  } 
  getUserFromLocalStorage() {
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      const expirationDate = new Date(userData.expiryDate);
      const user = new User(
        userData.token,
        userData.expiryDate
      );
      this.runTimeoutInterval(user);
      return user;
    }
    return null;
  }

  logout() {
    localStorage.removeItem('userData');
    if (this.timeoutInterval) {
      clearTimeout(this.timeoutInterval);
      this.timeoutInterval = null;
    }
  }
}