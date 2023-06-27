import { createAction,props } from "@ngrx/store";
import { Story } from "src/app/models/story.model";

export const LOAD_STORIES='[Stories page] Load Stories';
export const LOAD_STORIES_SEARCH='[Stories page search] Load Stories';
export const LOAD_SINGLE_STORIES='[single store page] Load Stories';
export const LOAD_STORIES_SUCCESS='[Stories page] Load Stories Success';

export const loadStories =createAction(LOAD_STORIES, props<{ category: string }>());
export const loadStoriesWithSerch =createAction(LOAD_STORIES_SEARCH, props<{ serchVal: string }>());
export const loadSingleStories =createAction(LOAD_SINGLE_STORIES, props<{ id:string,category: string }>());

export const loadStoriesSuccess=createAction(
    LOAD_STORIES_SUCCESS,
    props<{ story: Story[] }>()
    );
    