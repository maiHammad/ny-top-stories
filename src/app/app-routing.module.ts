import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './Services/auth.gaurd.service';
const routes: Routes = [
  {path:'auth',loadChildren:()=>import('./components/authontcation/authontcation.module').then((m)=>m.authontcationModule)},
  {path:'home',
  loadChildren:()=>import('./components/home/home.module').then((m)=>m.HomeModule),
  canActivate: [AuthGuard],
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
