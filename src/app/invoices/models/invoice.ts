import { Client } from "src/app/clients/models/client";

export class Invoice {
  _id: string;
  item: string;
  qty: number;
  date: Date;
  due: Date;
  rate: number;
  tax: number;
  client: Client;
}

export class InvoiceWithPage {
  docs: Invoice[];
  total: number;
  pages: number;
  page: number;
  limit: number;
}
