import { InjectionToken } from '@angular/core';
import * as AuthenticationContext from 'adal-angular';

export type AdalOptions = AuthenticationContext.Options;

export const ADAL_OPTIONS = new InjectionToken<AdalOptions>(
  'bc.adal.angular.options'
);
