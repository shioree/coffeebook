import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatBadgeModule } from '@angular/material/badge';

import { AppComponent } from './component/app/app.component';
import { RecordComponent } from './component/record/record.component';
import { BrowseComponent } from './component/browse/browse.component';
import { MainComponent } from './component/main/main.component';
import { ToolbarComponent } from './component/toolbar/toolbar.component';
import { TipsComponent } from './component/tips/tips.component';
import { UnderConstructionComponent } from './component/under-construction/under-construction.component';
import { SummaryComponent } from './component/summary/summary.component';
import { SucceededComponent } from './component/succeeded/succeeded.component';
import { RecipeComponent } from './component/recipe/recipe.component';

import { HttpClientService } from './service/http-client.service';

@NgModule({
  declarations: [
    AppComponent,
    RecordComponent,
    BrowseComponent,
    MainComponent,
    ToolbarComponent,
    TipsComponent,
    UnderConstructionComponent,
    SummaryComponent,
    SucceededComponent,
    RecipeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    MatBadgeModule
  ],
  providers: [
    HttpClientService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
