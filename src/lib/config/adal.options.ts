import { InjectionToken } from '@angular/core';
import * as AuthenticationContext from 'adal-angular';

export class AdalOptions implements AuthenticationContext.Options {
  clientId: string;
  redirectUri?: string;
  instance?: string;
  tenant?: string;
  extraQueryParameter?: string;
  correlationId?: string;
  displayCall?: (url: string) => void;
  popUp?: boolean;
  loginResource?: string;
  localLoginUrl?: string;
  navigateToLoginRequestUrl?: boolean;
  logOutUri?: string;
  postLogoutRedirectUri?: string;
  cacheLocation?: 'localStorage' | 'sessionStorage';
  endpoints?: { [resource: string]: string };
  anonymousEndpoints?: string[];
  expireOffsetSeconds?: number;
  loadFrameTimeout?: number;
  callback?: AuthenticationContext.TokenCallback;

  resource: string;
}

export const ADAL_OPTIONS = new InjectionToken<AdalOptions>(
  'bc.adal.angular.options'
);
