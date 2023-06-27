import { createReducer ,on} from "@ngrx/store";
import { initialState,storiesAdapter } from "./stories.state";
import { loadStories, loadStoriesSuccess } from "./stories.actions";

const _storiesReducer=createReducer(initialState,
    on(loadStoriesSuccess, (state, action) => {
        return storiesAdapter.setAll(action.story, {
          ...state,
          count: state.count + 1,
        });
      })
)

export function storiesReducer(state:any,action:any){
    return _storiesReducer(state,action);
}