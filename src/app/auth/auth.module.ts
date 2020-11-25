import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthComponent } from "./auth.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppMaterialModule } from "../material.module";
import { AuthService } from "../core/services/auth.service";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    AppMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
  ],
  providers: [AuthService],
})
export class AuthModule {}
