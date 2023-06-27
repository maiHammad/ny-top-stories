import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { HeaderComponent } from './components/shared/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { appReducer } from './store/app.state';
import {HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { LoadingSpinnerComponent } from './components/shared/loading-spinner/loading-spinner.component';
import { AuthTokenInterceptor } from './Services/AuthToken.interceptor';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(appReducer),
    BrowserAnimationsModule,
    HttpClientModule,
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass:AuthTokenInterceptor, multi: true },
  ],
    bootstrap: [AppComponent]
})
export class AppModule { }
