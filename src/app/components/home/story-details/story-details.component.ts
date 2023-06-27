import { Component, OnInit } from '@angular/core';
import { Story } from 'src/app/models/story.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { Observable } from 'rxjs';
import { getStoryById } from '../stories/state/stories.selector';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-story-details',
  templateUrl: './story-details.component.html',
  styleUrls: ['./story-details.component.scss']
})
export class StoryDetailsComponent implements OnInit {
  storyDetails: Observable<Story>|undefined;

  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit(): void {
    this.storyDetails=this.store.select(getStoryById);
    
  }

}
