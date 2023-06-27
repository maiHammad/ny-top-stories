
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { authontcationState } from './authontcation.state';
export const AUTH_STATE_NAME = 'authontcation';

const getAuthState = createFeatureSelector<authontcationState>(AUTH_STATE_NAME);

export const isAuthenticated = createSelector(getAuthState, (state) => {
  return state.user ? true : false;
});

export const getToken = createSelector(getAuthState, (state) => {
  return state.user ? state.user.userToken : null;
});