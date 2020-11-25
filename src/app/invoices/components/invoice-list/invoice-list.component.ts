import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, MatSnackBar } from "@angular/material";
import { Router } from "@angular/router";
import { Invoice } from "../../models/invoice";
import { InvoiceService } from "../../services/invoice.service";
import { remove } from "lodash";

@Component({
  selector: "app-invoice-list",
  templateUrl: "./invoice-list.component.html",
  styleUrls: ["./invoice-list.component.css"],
})
export class InvoiceListComponent implements OnInit {
  displayedColumns: string[] = ["item", "date", "due", "action"];
  dataSource: Invoice[] = [];
  resultLengths = 0;
  isLoading = false;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private invoiceService: InvoiceService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.paginator.page.subscribe((data) => {
      this.isLoading = true;
      this.invoiceService
        .getInvoices({
          page: ++data.pageIndex,
          perPage: data.pageSize,
          filter: "",
        })
        .subscribe(
          (data) => {
            this.dataSource = data.docs;
            this.resultLengths = data.total;
            this.isLoading = false;
          },
          (err) => {
            this.snackBar.open("oop's something went wrong", "error", {
              duration: 2000,
            });
            this.isLoading = false;
          }
        );
    });

    this.populateInvoice();
  }

  filterByItem(filterValue: string) {
    filterValue = filterValue.trim();
    this.invoiceService
      .getInvoices({ page: 1, perPage: 10, filter: filterValue })
      .subscribe(
        (data) => {
          this.dataSource = data.docs;
          this.resultLengths = data.total;
        },
        (err) => {
          this.snackBar.open("oop's something went wrong", "error", {
            duration: 2000,
          });
          this.isLoading = false;
        }
      );
  }

  private populateInvoice() {
    this.isLoading = true;
    this.invoiceService
      .getInvoices({ page: 1, perPage: 10, filter: "" })
      .subscribe(
        (data) => {
          this.dataSource = data.docs;
          this.resultLengths = data.total;
          this.isLoading = false;
        },
        (err) => {
          this.snackBar.open("oop's something went wrong", "error", {
            duration: 2000,
          });
          this.isLoading = false;
        }
      );
  }

  //editing a perticular invoice

  editHandler(id) {
    this.router.navigate(["dashboard", "invoices", id]);
  }

  //handling delete
  deleteHandler(id: string) {
    this.invoiceService.deleteInvoice(id).subscribe(
      (data) => {
        // console.log(data);
        const removeItem = remove(this.dataSource, (item) => {
          return item._id === data._id;
        });
        this.dataSource = [...this.dataSource];
        this.snackBar.open("invoice deleted", "success", {
          duration: 2000,
        });
      },
      (err) => {
        this.snackBar.open("oop's something went wrong", "error", {
          duration: 2000,
        });
      }
    );
  }

  //redirecting towards new form
  saveHandler() {
    this.router.navigate(["dashboard", "invoices", "new"]);
  }
}
