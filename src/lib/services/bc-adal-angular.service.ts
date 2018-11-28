import { Inject, Injectable } from '@angular/core';
import * as AuthenticationContext from 'adal-angular';
import { Observable, Subscriber } from 'rxjs';
import { retry } from 'rxjs/operators';

import { ADAL_OPTIONS, AdalOptions } from './../config/adal.options';

@Injectable({
  providedIn: 'root'
})
export class AdalService {
  private context: AuthenticationContext;
  private options: AdalOptions;

  constructor(@Inject(ADAL_OPTIONS) private adalOptions: AdalOptions) {
    this.setOptions(adalOptions);
    this.initAuthenticationContext();
  }

  public login() {
    this.context.login();
  }

  public logout() {
    this.context.logOut();
  }

  public getOptions(): AdalOptions {
    return this.options;
  }

  public setOptions(adalOptions: AdalOptions) {
    this.options = adalOptions;
  }

  get authContext() {
    return this.context;
  }

  handleWindowCallback() {
    this.context.handleWindowCallback();
  }

  public get userInfo() {
    return this.context.getCachedUser();
  }

  public get accessToken() {
    return this.context.getCachedToken(this.options.clientId);
  }

  public get isAuthenticated() {
    return this.userInfo && this.accessToken;
  }

  public getResourceForEndpoint(url: string): string | null {
    return this.context.getResourceForEndpoint(url);
  }

  public isCallback(hash: string) {
    return this.context.isCallback(hash);
  }

  public getLoginError() {
    return this.context.getLoginError();
  }

  public getAccessToken(
    endpoint: string,
    callbacks: (message: string, token: string) => any
  ) {
    return this.context.acquireToken(endpoint, callbacks);
  }

  public acquireTokenResilient(resource: string): Observable<any> {
    return new Observable<any>((subscriber: Subscriber<any>) =>
      this.context.acquireToken(resource, (message: string, token: string) => {
        if (token) {
          subscriber.next(token);
        } else {
          subscriber.error(message);
        }
      })
    ).pipe(retry(3));
  }

  private initAuthenticationContext() {
    this.context = new AuthenticationContext(this.options);
  }
}
