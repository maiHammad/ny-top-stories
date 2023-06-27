import { StoriesService } from 'src/app/Services/Stories.service';
import { Component, OnInit } from '@angular/core';
import { getStories, getStoryWithSerch } from '../home/stories/state/stories.selector';
import { AppState } from 'src/app/store/app.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadSingleStories, loadStoriesWithSerch } from '../home/stories/state/stories.actions';
import { Story } from 'src/app/models/story.model';
import { filter } from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  stories: Observable<Story[]>|undefined;
  serchVal:string='world';
  constructor(private store: Store<AppState>,private storyservice:StoriesService) { }

  ngOnInit(): void {

  }
  applySearch(){
    
    const input = document.getElementById('inputSearch') as HTMLInputElement | null;
    let serchVal=input?.value?input?.value:'';
    localStorage.setItem('serchVal', serchVal);
    this.stories=this.storyservice.getTopStorieswithserch(serchVal);
    return false;
  }


}
