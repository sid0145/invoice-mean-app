import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { Client } from "src/app/clients/models/client";
import { ClientService } from "src/app/clients/services/client.service";
import { Invoice } from "../../models/invoice";
import { InvoiceService } from "../../services/invoice.service";

@Component({
  selector: "app-invoice-form",
  templateUrl: "./invoice-form.component.html",
  styleUrls: ["./invoice-form.component.css"],
})
export class InvoiceFormComponent implements OnInit {
  private invoice: Invoice;
  invoiceForm: FormGroup;
  clients: Client[] = [];

  constructor(
    private invoiceService: InvoiceService,
    private router: Router,
    private snackbar: MatSnackBar,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private clientService: ClientService
  ) {}

  ngOnInit() {
    this.createFrom();
    this.getId();
    this.getClients();
  }

  //getting all the clients from clients

  private getClients() {
    this.clientService.getClients().subscribe(
      (data) => {
        this.clients = data;
      },
      (err) => {
        this.snackbar.open("An error occured!", "error", {
          duration: 2000,
        });
      }
    );
  }

  //creating the new client
  createFrom() {
    this.invoiceForm = this.fb.group({
      item: ["", Validators.required],
      date: ["", Validators.required],
      due: ["", Validators.required],
      qty: ["", Validators.required],
      rate: "",
      tax: "",
      client: [, Validators.required],
    });
  }

  onSubmit() {
    //want to update the invoice or create a new invoice
    if (this.invoice) {
      this.invoiceService
        .updateInvoice(this.invoice._id, this.invoiceForm.value)
        .subscribe(
          (data) => {
            this.router.navigate(["dashboard", "invoices"]);
            this.snackbar.open("updated", "success", {
              duration: 2000,
            });
          },
          (err) => {
            this.snackbar.open("error has occured", "error", {
              duration: 2000,
            });
          }
        );
    } else {
      this.invoiceService.createInvoice(this.invoiceForm.value).subscribe(
        (data) => {
          this.invoiceForm.reset();
          this.router.navigate(["dashboard", "invoices"]);
          this.snackbar.open("new invoice created", "success", {
            duration: 2000,
          });
        },
        (err) => {
          this.snackbar.open("error has occured", "error", {
            duration: 2000,
          });
        }
      );
    }
  }

  //updating the invoice with patch
  private getId() {
    this.route.params.subscribe((params) => {
      let id = params["id"];

      if (!id) {
        return;
      }
      this.invoiceService.getInvoiceById(id).subscribe(
        (invoice) => {
          this.invoice = invoice;
          if (this.invoice.client) {
            this.invoiceForm.patchValue({ client: this.invoice.client._id });
          }
          this.invoiceForm.patchValue({
            item: this.invoice.item,
            qty: this.invoice.qty,
            date: this.invoice.date,
            due: this.invoice.due,
            rate: this.invoice.rate,
            tax: this.invoice.rate,
          });
        },
        (err) => {
          console.log(err);
        }
      );
    });
  }
}
