import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  NavigationExtras,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';

import { BcAdalAngularService } from './../services/bc-adal-angular.service';

@Injectable()
export class AdalAccessGuard implements CanActivate {
  constructor(
    private router: Router,
    private adalService: BcAdalAngularService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const navigationExtras: NavigationExtras = {
      queryParams: { redirectUrl: route.url }
    };

    if (this.adalService.userInfo) {
      return true;
    }

    this.router.navigate(['accessdenied'], navigationExtras);

    return false;
  }
}
