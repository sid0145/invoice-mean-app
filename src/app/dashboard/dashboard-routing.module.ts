import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ClientListComponent } from "../clients/components/client-list/client-list.component";
import { AuthGuardService } from "../core/services/auth-guard.service";
import { InvoiceFormComponent } from "../invoices/components/invoice-form/invoice-form.component";
import { InvoiceListComponent } from "../invoices/components/invoice-list/invoice-list.component";
import { InvoiceViewComponent } from "../invoices/components/invoice-view/invoice-view.component";
import { InvoiceviewService } from "../invoices/services/invoiceview.service";
import { MainContentComponent } from "./components/main-content.component";
import { DashboardComponent } from "./dashboard.component";

const routes: Routes = [
  {
    path: "",
    component: DashboardComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: "invoices",
        component: InvoiceListComponent,
        canActivateChild: [AuthGuardService],
      },
      {
        path: "invoices/new",
        component: InvoiceFormComponent,
        canActivateChild: [AuthGuardService],
      },
      {
        path: "invoices/:id/invoice-view",
        component: InvoiceViewComponent,
        canActivateChild: [AuthGuardService],
        resolve: {
          invoice: InvoiceviewService,
        },
      },
      {
        path: "invoices/:id",
        component: InvoiceFormComponent,
        canActivateChild: [AuthGuardService],
        resolve: {
          invoice: InvoiceviewService,
        },
      },
      {
        path: "clients",
        component: ClientListComponent,
        canActivateChild: [AuthGuardService],
      },
      {
        path: "**",
        redirectTo: "invoices",
        canActivateChild: [AuthGuardService],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
