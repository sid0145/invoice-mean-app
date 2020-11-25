import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";
import { Invoice } from "../models/invoice";
import { InvoiceService } from "./invoice.service";

@Injectable()
export class InvoiceviewService implements Resolve<Invoice> {
  constructor(private invoiceService: InvoiceService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let id = route.paramMap.get("id");
    return this.invoiceService.getInvoiceById(id);
  }
}
