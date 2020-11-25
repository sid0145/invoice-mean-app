import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { AuthService } from "./services/auth.service";
import { JwtService } from "./services/jwt.service";
import { HttpInterceptorService } from "./services/http-interceptor.service";
import { AuthGuardService } from "./services/auth-guard.service";

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
  providers: [
    AuthService,
    JwtService,
    HttpInterceptorService,
    AuthGuardService,
  ],
})
export class CoreModule {}
