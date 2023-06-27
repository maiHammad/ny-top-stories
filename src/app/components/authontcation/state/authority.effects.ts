import { AuthorityService } from "src/app/Services/authority.service";
import { loginStart, loginSuccess,autoLogout ,  signupStart,signupSuccess} from "./authontcation.actions";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from "@angular/core";
import { setLoadingSpinner ,setErrorMessage} from "src/app/store/shared/shared.actions";
import { Store } from '@ngrx/store';
import { AppState } from "src/app/store/app.state";
import { Router } from '@angular/router';
import { exhaustMap, map, catchError, tap, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';


@Injectable()
export class authorityEffects{
    constructor(private actions$:Actions,
      private authurityService:AuthorityService,
      private store: Store<AppState>,
      private router: Router){

    }

    login$=createEffect(() => {
        return this.actions$.pipe(ofType(loginStart),
        exhaustMap((action) =>{
          return this.authurityService.login(action.email,action.password).pipe(
            map((data) => {
              this.store.dispatch(setLoadingSpinner({ status: false }));
              this.store.dispatch(setErrorMessage({ message: '' }));
              const user=this.authurityService.userToken(data);
              this.authurityService.setUserInLocalStorage(user);
              return loginSuccess({ user, redirect: true });
            }),
            catchError((errResp) => {
              this.store.dispatch(setLoadingSpinner({ status: false }));
              const errorMessage = this.authurityService.getErrorMessage(
                errResp.error.error.message
              );
              return of(setErrorMessage({ message: errorMessage }));
            })
          );
        })
          )
        });

        loginRedirect$ = createEffect(
          () => {
            return this.actions$.pipe(
              ofType(...[loginSuccess]),
              tap((action) => {
                this.store.dispatch(setErrorMessage({ message: '' }));
                if (action.redirect) {
                  this.router.navigate(['/home']);
                }
              })
            );
          },
          { dispatch: false }
        );
        logout$ = createEffect(
          () => {
            return this.actions$.pipe(
              ofType(autoLogout),
              map((action) => {
                this.authurityService.logout();
                this.router.navigate(['auth']);
              })
            );
          },
          { dispatch: false }
        ); 
        signUp$ = createEffect(() => {
          return this.actions$.pipe(
            ofType(signupStart),
            exhaustMap((action) => {
              return this.authurityService.signUp(action.email, action.password).pipe(
                map((data) => {
                  this.store.dispatch(setLoadingSpinner({ status: false }));
                  const user = this.authurityService.userToken(data);
                  this.authurityService.setUserInLocalStorage(user);
                  return signupSuccess({ user, redirect: true });
                }),
                catchError((errResp) => {
                  this.store.dispatch(setLoadingSpinner({ status: false }));
                  const errorMessage = this.authurityService.getErrorMessage(
                    errResp.error.error.message
                  );
                  return of(setErrorMessage({ message: errorMessage }));
                })
              );
            })
          );
        });        
}