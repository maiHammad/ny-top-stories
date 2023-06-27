import { Story } from './../../../../models/story.model';
import { StoriesService } from './../../../../Services/Stories.service';
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { loadStories,loadSingleStories, loadStoriesSuccess,loadStoriesWithSerch } from './stories.actions';
import {
  filter,
  map,
  mergeMap,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';

import { AppState } from 'src/app/store/app.state';
import { Store, props } from '@ngrx/store';
import { getStories } from './stories.selector';
import { dummyAction } from 'src/app/components/authontcation/state/authontcation.actions';
import { of } from 'rxjs';
import {
  RouterNavigatedAction,
  routerNavigationAction,
  ROUTER_NAVIGATION,
} from '@ngrx/router-store';
@Injectable()
export class StoriesEffects{
  constructor(
    private actions$: Actions,
    private storiesService: StoriesService,
    private store: Store<AppState>
  ) {}
      loadStories$=createEffect(() => {
      return this.actions$.pipe(
        ofType(loadStories),
        withLatestFrom(this.store.select(getStories)),
        mergeMap(([action, stories]) => {
                       return this.storiesService.getTopStories(action.category).pipe(
              map((story) => {
                return loadStoriesSuccess({story});
              })
            ); 
     

          })

      );
    });
   /* loadStoriesAfterSearch$=createEffect(() => {
      let prevSerchVal= localStorage.getItem('serchVal');
      return this.actions$.pipe(
        ofType(loadStoriesWithSerch),
        withLatestFrom(this.store.select(getStories)),
        mergeMap(([action]) => {
          if (action.serchVal!==prevSerchVal) {
            return this.storiesService.getTopStorieswithserch(action.serchVal).pipe(
              map((story) => {
                return loadStoriesSuccess({story});
              }) );
          }
          return of(dummyAction());
           
          
        })
      );
    }); */
    getSingleStory$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(ROUTER_NAVIGATION),
        filter((r: RouterNavigatedAction) => {
          return r.payload.routerState.url.startsWith('/home/details');
        }),
        map((r:any) => {
             return r.payload.routerState['params']? r.payload.routerState['params']['id']: null;
        }),
        withLatestFrom(this.store.select(getStories)),

        switchMap(([action,stories]) => {
          debugger
          if (action!==null&&stories!==undefined) {
            return this.storiesService.getStoryById(action.id,action.category).pipe(
              map((story) => {
                const storyData = [{ ...story }];
                return loadStoriesSuccess({ story: storyData });
              })
            );
            }
          return of(dummyAction());
        })
      
      );
   
    });
}