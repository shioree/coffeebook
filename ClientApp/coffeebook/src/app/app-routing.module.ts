import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './component/main/main.component';
import { SignUpComponent } from './component/sign-up/sign-up.component';
import { SignUpSucceededComponent } from './component/sign-up-succeeded/sign-up-succeeded.component';
import { LoginComponent } from './component/login/login.component';
import { RecordComponent } from './component/record/record.component';
import { SucceededComponent } from './component/succeeded/succeeded.component';
import { BrowseComponent } from './component/browse/browse.component';
import { UnderConstructionComponent } from './component/under-construction/under-construction.component';

const routes: Routes = [
  { path: 'main', component: MainComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'sign-up/succeeded', component: SignUpSucceededComponent },
  { path: 'login', component: LoginComponent },
  { path: 'record/drip', component: RecordComponent },
  { path: 'record/succeeded', component: SucceededComponent },
  { path: 'browse/by-conditions', component: BrowseComponent },
  { path: 'under-construction', component: UnderConstructionComponent },
  { path: '**', component: MainComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
