import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { NgModule } from '@angular/core';

import { ADAL_OPTIONS, AdalOptions } from './config/adal.options';
import { AdalAccessGuard } from './guards/adal-access.guard';
import { BcAdalAngularInterceptor } from './services/bc-adal-angular.interceptor';
import { BcAdalAngularService } from './services/bc-adal-angular.service';

/* "Barrel" of Http Interceptors */

/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: BcAdalAngularInterceptor, multi: true }
];

@NgModule({
  imports: [CommonModule, HttpClientModule],
  declarations: []
})
export class BcAdalAngularModule {
  static forRoot(options: AdalOptions): ModuleWithProviders {
    return {
      ngModule: BcAdalAngularModule,
      providers: [
        BcAdalAngularService,
        AdalAccessGuard,
        httpInterceptorProviders,
        { provide: ADAL_OPTIONS, useValue: options }
      ]
    };
  }
}
