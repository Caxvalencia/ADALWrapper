import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";

import { AdalAccessGuard } from "./guards/adal-access.guard";
import { AdalConfigService } from "./services/adal-config.service";
import { AuthInterceptor } from "./services/auth-interceptor";
import { AdalService } from "./services/bc-adal-angular.service";

/* "Barrel" of Http Interceptors */

/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];

@NgModule({
  imports: [CommonModule, HttpClientModule],
  declarations: [],
  providers: [
    AdalConfigService,
    AdalService,
    AdalAccessGuard,
    httpInterceptorProviders
  ]
})
export class BcAdalAngularModule {}
