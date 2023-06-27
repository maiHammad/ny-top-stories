import { exhaustMap, take } from 'rxjs/operators';
import { getToken } from '../components/authontcation/state/authontcation.selector';
import { AppState } from './../store/app.state';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
  constructor(private store: Store<AppState>) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.store.select(getToken).pipe(
      take(1),
      exhaustMap((token) => {
        if (!token) {
          return next.handle(req);
        }
        let modifiedReq = req.clone({
          params: req.params
          //.append('auth', token)
          //.append('api-key', 'sMEp2i2TDQHZvSlQo4SFBwf6WZWDRTeW'),
        }); 
        return next.handle(modifiedReq);
      })
    );
  }
}
