import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/app.state';
import { Component, OnInit,Input,Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})
export class StoryComponent implements OnInit {
  @Input() storiesList :any; 

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {

  }

  

}
