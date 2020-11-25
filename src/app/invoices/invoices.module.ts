import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { InvoiceListComponent } from "./components/invoice-list/invoice-list.component";
import { AppMaterialModule } from "../material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { InvoiceService } from "./services/invoice.service";
import { InvoiceFormComponent } from "./components/invoice-form/invoice-form.component";
import { InvoiceViewComponent } from "./components/invoice-view/invoice-view.component";
import { RouterModule } from "@angular/router";
import { InvoiceviewService } from "./services/invoiceview.service";

@NgModule({
  declarations: [
    InvoiceListComponent,
    InvoiceFormComponent,
    InvoiceViewComponent,
  ],
  imports: [
    CommonModule,
    AppMaterialModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [InvoiceListComponent],
  providers: [InvoiceService, InvoiceviewService],
})
export class InvoicesModule {}
