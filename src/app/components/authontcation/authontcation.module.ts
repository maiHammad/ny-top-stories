import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { authontcationReducer } from './state/authontcation.reducer';
import {AUTH_STATE_NAME} from './state/authontcation.selector';
import { authorityEffects } from './state/authority.effects';
import { RejestrationComponent } from './rejestration/rejestration.component';
const routes:Routes=[{
    path:'',children:[{
        path:'',redirectTo:'login'
    },{
        path:'login',component:LoginComponent
    },{
        path:'rejester',component:RejestrationComponent
    }]},
];

@NgModule({
    declarations: [LoginComponent, RejestrationComponent],
    imports:[CommonModule,
        RouterModule.forChild(routes),ReactiveFormsModule,
        StoreModule.forFeature(AUTH_STATE_NAME,authontcationReducer),
        EffectsModule.forFeature([authorityEffects])
    ]
})
export class authontcationModule{

}