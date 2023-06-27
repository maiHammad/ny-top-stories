import {Story,singleStory} from '../../../../models/story.model';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { RouterState } from '@angular/router';

export interface StoriesState extends EntityState<Story> {
    count: number;
    stories:[];
  }
  export interface StoriesSingleState extends EntityState<Story> {
    count: number;
    stories:{};
  }
export const storiesAdapter = createEntityAdapter<Story>({
    //sortComparer: sortByName,
  });
  

export const initialState:StoriesState =storiesAdapter.getInitialState({
    count: 0,
    stories:[]
  });

/*  export function sortByName(a: Story, b: Story): number {
    const compare = a.id.localeCompare(b.id);
    if (compare > 0) {
      return -1;
    }
  
    if (compare < 0) {
      return 1;
    }
  
    return compare;
  }*/