import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AppMaterialModule } from "../material.module";

import { DashboardRoutingModule } from "./dashboard-routing.module";
import { DashboardComponent } from "./dashboard.component";
import { MainContentComponent } from "./components/main-content.component";
import { SideNavComponent } from "./components/side-nav/side-nav.component";
import { ToolBarComponent } from "./components/tool-bar/tool-bar.component";
import { InvoicesModule } from "../invoices/invoices.module";
import { ClientsModule } from "../clients/clients.module";

@NgModule({
  declarations: [
    DashboardComponent,
    MainContentComponent,
    SideNavComponent,
    ToolBarComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    AppMaterialModule,
    InvoicesModule,
    ClientsModule,
  ],
})
export class DashboardModule {}
