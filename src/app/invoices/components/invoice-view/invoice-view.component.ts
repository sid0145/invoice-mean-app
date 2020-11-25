import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Invoice } from "../../models/invoice";

@Component({
  selector: "app-invoice-view",
  templateUrl: "./invoice-view.component.html",
  styleUrls: ["./invoice-view.component.css"],
})
export class InvoiceViewComponent implements OnInit {
  invoice: Invoice;
  total: number;
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe((data: { invoice: Invoice }) => {
      this.invoice = data.invoice;

      if (
        typeof this.invoice.qty !== "undefined" &&
        typeof this.invoice.rate !== "undefined"
      ) {
        this.total = this.invoice.rate * this.invoice.qty;
      }
      let totaltax;
      if (typeof this.invoice.tax !== "undefined") {
        totaltax = this.invoice.tax / 100;
      }
      this.total += totaltax;
    });
  }
}
