import {
  enableProdMode,
  provideZoneChangeDetection,
  importProvidersFrom,
} from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { environment } from "./environments/environment";
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from "@angular/common/http";
import { BrowserModule, bootstrapApplication } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppComponent } from "./app/app.component";
import { provideRouter, withComponentInputBinding } from "@angular/router";
import { appRoutes } from "./app/app.routes";

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes, withComponentInputBinding()),
    importProvidersFrom(
      BrowserModule,
      BrowserAnimationsModule,
      FormsModule,
      ReactiveFormsModule,
    ),
    provideHttpClient(withInterceptorsFromDi()),
  ],
}).catch((err) => console.error(err));
