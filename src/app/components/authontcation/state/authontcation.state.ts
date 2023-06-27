import { User } from "src/app/models/user.model"

export interface authontcationState{
user :User|null;
}

export const initialState:authontcationState={
user:null,
}