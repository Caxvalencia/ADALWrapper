import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { NgModule } from '@angular/core';

import { ADAL_OPTIONS, AdalOptions } from './config/adal.options';
import { AdalAccessGuard } from './guards/adal-access.guard';
import { httpInterceptorProviders } from './services/bc-adal-angular.interceptor';
import { BcAdalAngularService } from './services/bc-adal-angular.service';

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
