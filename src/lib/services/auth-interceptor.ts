import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/internal/operators/mergeMap';

import { APP_CONFIG, AppConfig } from './../config/app.config';
import { AdalService } from './bc-adal-angular.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private adalService: AdalService,
    @Inject(APP_CONFIG) private config: AppConfig
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.adalService.acquireTokenResilient(this.config.resource).pipe(
      mergeMap(token => {
        if (token) {
          req = req.clone({
            setHeaders: {
              Authorization: 'Bearer ' + token
            }
          });
        }

        return next.handle(req);
      })
    );
  }
}
