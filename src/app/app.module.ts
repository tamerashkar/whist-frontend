import {
  GoogleLoginProvider,
  FacebookLoginProvider,
} from 'angularx-social-login';

import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from 'src/app/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { EventsModule } from 'src/app/events/events.module';
import { AUTH_CLIENT_ID, AuthModule } from 'src/app/serenity/auth';
import { LOCAL_STORAGE_PREFIX, SupportModule } from 'src/app/serenity/support';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';

const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(environment.googleAppId),
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider(environment.facebookAppId),
  },
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    EventsModule,
    MaterialModule,
    AuthModule,
    SupportModule,
    SocialLoginModule,
  ],
  exports: [],
  providers: [
    {
      provide: AUTH_CLIENT_ID,
      useValue: environment.authClientId,
    },
    {
      provide: LOCAL_STORAGE_PREFIX,
      useValue: environment.localStoragePrefix,
    },
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
