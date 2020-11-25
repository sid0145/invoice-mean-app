import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Invoice, InvoiceWithPage } from "../models/invoice";

const BASE_URL = "http://localhost:3000/api";
export class InvoiceService {
  constructor(private http: HttpClient) {}

  //getting all the invoices
  getInvoices({ page, perPage, filter }): Observable<InvoiceWithPage> {
    let queryString = `${BASE_URL}/invoices?page=${page}&perPage=${perPage}`;
    if (filter) {
      queryString = `${queryString}&filter=${filter}`;
    }
    return this.http.get<InvoiceWithPage>(queryString);
  }

  //creating the new invoice
  createInvoice(body: Invoice) {
    return this.http.post<Invoice[]>(`${BASE_URL}/invoices`, body);
  }

  //deleting the invoices

  deleteInvoice(id: string): Observable<Invoice> {
    return this.http.delete<Invoice>(`${BASE_URL}/invoices/${id}`);
  }

  //get a particular invoice with id

  getInvoiceById(id: string): Observable<Invoice> {
    return this.http.get<Invoice>(`${BASE_URL}/invoices/${id}`);
  }

  //update the invoice

  updateInvoice(id: string, body: Invoice) {
    return this.http.put<Invoice>(`${BASE_URL}/invoices/${id}`, body);
  }
}
