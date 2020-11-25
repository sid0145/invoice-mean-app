import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";

import { AuthService } from "./auth.service";
import { JwtService } from "./jwt.service";
import { of } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {
  constructor(
    private jwtService: JwtService,
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.jwtService.getToken()) {
      return true;
    }
    const token = route.queryParamMap.get("token");
    if (token) {
      this.jwtService.setToken(token);
      if (this.jwtService.getToken()) {
        return true;
      }
    } else {
      this.router.navigate(["/login"]);
      return false;
    }
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.canActivate(route, state);
  }
}
