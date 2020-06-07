import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main/main.component';
import { RecordComponent } from './record/record.component';
import { BrowseComponent } from './browse/browse.component';
import { UnderConstructionComponent } from './under-construction/under-construction.component';

const routes: Routes = [
  { path: 'main', component: MainComponent },
  { path: 'record/drip', component: RecordComponent },
  { path: 'browse/by-conditions', component: BrowseComponent },
  { path: 'under-construction', component: UnderConstructionComponent },
  { path: '**', component: MainComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
