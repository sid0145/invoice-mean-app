import { Component, OnInit } from "@angular/core";
import { MatDialog, MatSnackBar } from "@angular/material";
import { remove } from "lodash";

import { Client } from "../../models/client";
import { ClientService } from "../../services/client.service";
import { DialogFormComponent } from "../dialog-form/dialog-form.component";

@Component({
  selector: "app-client-list",
  templateUrl: "./client-list.component.html",
  styleUrls: ["./client-list.component.css"],
})
export class ClientListComponent implements OnInit {
  displayedColumns: string[] = ["firstName", "lastName", "email", "action"];
  dataSource: Client[] = [];

  constructor(
    private clientService: ClientService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.clientService.getClients().subscribe(
      (data) => {
        this.dataSource = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  //dialog
  openDialog(clientId: string): void {
    const options = {
      width: "400px",
      height: "350px",
      data: {},
    };
    if (clientId) {
      options.data = { clientId: clientId };
    }
    const dialogRef = this.dialog.open(DialogFormComponent, options);

    dialogRef.afterClosed().subscribe((result) => {
      this.clientService.createClient(result).subscribe(
        (data) => {
          let msg = "";
          if (clientId) {
            const index = this.dataSource.findIndex(
              (client) => client._id === clientId
            );
            this.dataSource[index] = data;
            msg = "client updated";
          } else {
            this.dataSource.push(data);
            msg = "client created";
          }
          this.dataSource = [...this.dataSource];
          this.snackBar.open(msg, "success", {
            duration: 2000,
          });
        },
        (err) => {
          this.snackBar.open("error has occured", "error", {
            duration: 2000,
          });
        }
      );
    });
  }

  //deleting a client
  deleteHandler(id: string) {
    this.clientService.deleteClient(id).subscribe(
      (data) => {
        remove(this.dataSource, (client) => {
          return client._id === data._id;
        });
        this.dataSource = [...this.dataSource];
        this.snackBar.open("client deleted", "success", {
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
}
