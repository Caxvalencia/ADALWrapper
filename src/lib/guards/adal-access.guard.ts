import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  NavigationExtras,
  Router,
  RouterStateSnapshot
} from "@angular/router";
import { Observable } from "rxjs";

import { AdalService } from "./../services/bc-adal-angular.service";

@Injectable()
export class AdalAccessGuard implements CanActivate {
  constructor(private router: Router, private adalService: AdalService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    let navigationExtras: NavigationExtras = {
      queryParams: { redirectUrl: route.url }
    };

    if (!this.adalService.userInfo) {
      this.router.navigate(["accessdenied"], navigationExtras);
    }

    return true;
  }
}
