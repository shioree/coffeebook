import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatBadgeModule } from '@angular/material/badge';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule, MatSpinner } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { OverlayModule } from '@angular/cdk/overlay';

import { AppRoutingModule } from './app-routing.module';

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
import { SignUpComponent } from './component/sign-up/sign-up.component';
import { LoginComponent } from './component/login/login.component';
import { SignUpSucceededComponent } from './component/sign-up-succeeded/sign-up-succeeded.component';
import { DialogComponent } from './component/dialog/dialog.component';

import { HttpClientService } from './service/http-client.service';
import { UserService } from './service/user.service';
import { RecipeService } from './service/recipe.service';

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
    RecipeComponent,
    SignUpComponent,
    LoginComponent,
    SignUpSucceededComponent,
    DialogComponent
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
    MatBadgeModule,
    MatFormFieldModule,
    MatInputModule,
    MatStepperModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    OverlayModule
  ],
  entryComponents: [
    MatSpinner,
    DialogComponent
  ],
  providers: [
    HttpClientService,
    UserService,
    RecipeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
