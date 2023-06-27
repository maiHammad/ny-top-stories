import { createAction,props } from "@ngrx/store";
import { User } from "src/app/models/user.model";

export const LOGIN_START='[authontcation page] login start';
export const LOGIN_SUCCESS='[authontcation page] login success';
export const LOGIN_FAIL='[authontcation page] login fail';
export const LOGOUT_ACTION = '[auth page] logout';
export const SIGNUP_START = '[auth page] signup start';
export const SIGNUP_SUCCESS = '[auth page] signup success';

export const loginStart=createAction(
    LOGIN_START,
    props<{email:string;password:string}>()
)
export const signupStart = createAction(
    SIGNUP_START,
    props<{ email: string; password: string }>()
  );
  
  export const signupSuccess = createAction(
    SIGNUP_SUCCESS,
    props<{ user: User; redirect: boolean }>()
  );
export const loginSuccess=createAction(LOGIN_SUCCESS,props<{user:User;redirect: boolean}>());
export const autoLogout = createAction(LOGOUT_ACTION);
export const dummyAction = createAction('[dummy action]');
