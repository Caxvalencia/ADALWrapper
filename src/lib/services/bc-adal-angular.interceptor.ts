import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/internal/operators/mergeMap';

import { BcAdalAngularService } from './bc-adal-angular.service';

@Injectable()
export class BcAdalAngularInterceptor implements HttpInterceptor {
  constructor(private adalService: BcAdalAngularService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const resource =
      this.adalService.getOptions()['resource'] ||
      this.adalService.getResourceForEndpoint(request.url);

    if (!resource) {
      return next.handle(request);
    }

    if (!this.adalService.isAuthenticated) {
      throw new Error(
        'Cannot send request to registered endpoint if the user is not authenticated.'
      );
    }

    return this.adalService.acquireTokenResilient(resource).pipe(
      mergeMap((token: string) => {
        if (!token) {
          return next.handle(request);
        }

        const requestWithAuthorization = request.clone({
          headers: request.headers.set('Authorization', 'Bearer ' + token)
        });

        return next.handle(requestWithAuthorization);
      })
    );
  }
}
