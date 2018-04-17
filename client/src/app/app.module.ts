import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {FlashMessagesModule} from 'angular2-flash-messages';
import {MatSliderModule} from '@angular/material/slider';
import {MatTableModule} from '@angular/material/table';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared';
import {AuthService} from './services/auth.service';
import { LoginComponent } from './login/login.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { SignupComponent } from './signup/signup.component';
import { LostPasswordComponent } from './lost-password/lost-password.component';
import { EqualValidator } from './directive/equal-validator.directive';  // import validator
import { PageHeaderModule } from './shared';
import { HeaderComponent } from './header/header.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AboutComponent } from './about/about.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LocationModule} from "./shared/modules/location/location.module";
import {LocationService} from "./services/location.service";

// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
    // for development
    // return new TranslateHttpLoader(http, '/start-angular/SB-Admin-BS4-Angular-5/master/dist/assets/i18n/', '.json');
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    imports: [
      CommonModule,
      BrowserModule,
      HttpClientModule,
      TranslateModule.forRoot({
          loader: {
              provide: TranslateLoader,
              useFactory: createTranslateLoader,
              deps: [HttpClient]
          }
      }),
      AppRoutingModule,
      FormsModule,
      ReactiveFormsModule,
      FlashMessagesModule,
      PageHeaderModule,
      BrowserAnimationsModule,
      NgbDropdownModule.forRoot(),
      MatTableModule,
      LocationModule,
      MatSliderModule
    ],
    declarations: [
      AppComponent,
      LoginComponent,
      SignupComponent,
      LostPasswordComponent,
      EqualValidator,
      HeaderComponent,
      ResetPasswordComponent,
      AboutComponent,
    ],
    providers: [AuthGuard,AuthService,LocationService],
    bootstrap: [AppComponent]
})
export class AppModule {}
