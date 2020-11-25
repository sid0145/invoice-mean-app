import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ClientListComponent } from "./components/client-list/client-list.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppMaterialModule } from "../material.module";
import { HttpClientModule } from "@angular/common/http";
import { ClientService } from "./services/client.service";
import { DialogFormComponent } from "./components/dialog-form/dialog-form.component";

@NgModule({
  declarations: [ClientListComponent, DialogFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    AppMaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  exports: [ClientListComponent],
  providers: [ClientService],
  entryComponents: [DialogFormComponent],
})
export class ClientsModule {}
