import { getLoading, getErrorMessage } from './store/shared/shared.selector';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './store/app.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'ny-top-stories';
  showLoading: Observable<boolean>|undefined;
  errorMessage: Observable<string>|undefined;
  constructor(private store: Store<AppState>) {}
  ngOnInit() {
    this.showLoading = this.store.select(getLoading);
    this.errorMessage = this.store.select(getErrorMessage);
  }
}
