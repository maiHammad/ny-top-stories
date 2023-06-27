import { AUTH_STATE_NAME } from "../components/authontcation/state/authontcation.selector";
import { authontcationReducer } from "../components/authontcation/state/authontcation.reducer";
import { authontcationState } from "../components/authontcation/state/authontcation.state";
import { SharedState } from './shared/shared.state';
import { SHARED_STATE_NAME } from './shared/shared.selector';
import { SharedReducer } from './shared/shared.reducer';

import { routerReducer, RouterReducerState } from '@ngrx/router-store';

export interface AppState {
  [SHARED_STATE_NAME]: SharedState;
  [AUTH_STATE_NAME]: authontcationState;
  router: RouterReducerState;
}

export const appReducer = {
 [SHARED_STATE_NAME]: SharedReducer,
  [AUTH_STATE_NAME]: authontcationReducer,
  router: routerReducer,
};