import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './component/app/app.component';
import { RecordComponent } from './component/record/record.component';
import { BrowseComponent } from './component/browse/browse.component';
import { MainComponent } from './component/main/main.component';
import { ToolbarComponent } from './component/toolbar/toolbar.component';
import { TipsComponent } from './component/tips/tips.component';
import { UnderConstructionComponent } from './component/under-construction/under-construction.component';

import { HttpClientService } from './service/http-client.service';

@NgModule({
  declarations: [
    AppComponent,
    RecordComponent,
    BrowseComponent,
    MainComponent,
    ToolbarComponent,
    TipsComponent,
    UnderConstructionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    HttpClientService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
