import { StoriesService } from './../../Services/Stories.service';
import { Component, OnInit } from '@angular/core';
import { getCount, getStories,getStoryById } from './stories/state/stories.selector';
import { AppState } from 'src/app/store/app.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadSingleStories, loadStories } from './stories/state/stories.actions';
import { Story } from 'src/app/models/story.model';
import { filter } from 'rxjs/operators';
import { setLoadingSpinner } from 'src/app/store/shared/shared.actions';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  stories: Observable<Story[]>|undefined;
  count: Observable<number>|undefined;
  loadCategory='home';
  storyDetails:Observable<Story>|undefined;
 
  constructor(private store: Store<AppState>,private storyservice:StoriesService) { }

  ngOnInit(): void {
    this.stories = this.store.select(getStories);
    this.count = this.store.select(getCount);
    this.store.dispatch(loadStories({category:this.loadCategory}));
   
  }
  onCategorySelected(value:string){
    this.loadCategory=value;
    this.stories = this.store.select(getStories);
    this.count = this.store.select(getCount);
    this.store.dispatch(loadStories({category:value}));

  }

}
