import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { isAuthenticated } from '../../authontcation/state/authontcation.selector';
import { AppState } from 'src/app/store/app.state';
import { Store } from '@ngrx/store';
import { autoLogout } from '../../authontcation/state/authontcation.actions';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isAuthenticated: Observable<boolean>|undefined;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.isAuthenticated = this.store.select(isAuthenticated);
  }

  onLogout(event: Event) {
    event.preventDefault();
    this.store.dispatch(autoLogout());
  }
}
