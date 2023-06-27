import { Story } from 'src/app/models/story.model';
import { StoriesState, storiesAdapter,StoriesSingleState } from "./stories.state";
import { createFeatureSelector,createSelector } from "@ngrx/store";
import { RouterStateUrl } from 'src/app/store/router/custom-serializer';
import { getCurrentRoute } from 'src/app/store/router/router.selector';

import { RouterState } from '@angular/router';


    export const STORIES_STATE_NAME = 'stories';
    export const STORIES_SINGLE_STATE_NAME = 'stories';

    const getStoriesState = createFeatureSelector<StoriesState>(STORIES_STATE_NAME);
    const getSingleStoriesState = createFeatureSelector<StoriesSingleState>(STORIES_SINGLE_STATE_NAME);

    export const storiesSelectors = storiesAdapter.getSelectors();
    export const storiesSingleSelectors = storiesAdapter.getSelectors();

    export const getStories = createSelector(getStoriesState, storiesSelectors.selectAll);
    export const getStoryEntities = createSelector(
      getStoriesState,
      storiesSelectors.selectEntities
    );
    export const getStoryWithSerch = createSelector(getStoriesState, storiesSelectors.selectAll);
    export const getStoryById = createSelector(
      getStoriesState,
      getCurrentRoute,
      (story:any, route: RouterStateUrl) => {
        return story ? story.entities[route.url.substring(route.url.lastIndexOf('/')+1)] : null;
      }
    );

    export const getCount = createSelector(getStoriesState, (state) => state.count);    