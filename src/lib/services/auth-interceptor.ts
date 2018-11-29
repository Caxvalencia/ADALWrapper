import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/internal/operators/mergeMap';

import { AdalService } from './bc-adal-angular.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private adalService: AdalService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const resource =
      this.adalService.getResourceForEndpoint(request.url) ||
      this.adalService.getOptions()['resource'];

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
        if (token) {
          request = request.clone({
            setHeaders: { Authorization: 'Bearer ' + token }
          });
        }

        return next.handle(request);
      })
    );
  }
}
