import {  createReducer,on } from "@ngrx/store";
import { initialState } from "./authontcation.state";
import { loginSuccess, signupSuccess, autoLogout } from "./authontcation.actions";

const _authontcationReducer=createReducer(initialState,
    on(loginSuccess,(state,action)=>{
        return{
           ...state,
          user:action.user
        }
       }),
       on(signupSuccess, (state, action) => {
        return {
          ...state,
          user: action.user,
        };
      }),
      on(autoLogout, (state) => {
        return {
          ...state,
          user: null,
        };
      })
    )

export function authontcationReducer(state:any,action:any){
    return _authontcationReducer(state,action);
}