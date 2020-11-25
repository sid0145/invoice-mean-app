import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { JwtService } from "./jwt.service";
import { tap } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  constructor(private jwtService: JwtService, private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const headersConfig = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    const token = this.jwtService.getToken();
    if (token) {
      headersConfig["Authorization"] = `bearer ${token}`;
    }
    const _req = req.clone({ setHeaders: headersConfig });
    return next.handle(_req).pipe(
      tap(
        (next) => {},
        (err) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.jwtService.destroyToken();
              this.router.navigate(["/login"]);
            }
          }
        }
      )
    );
  }
}
