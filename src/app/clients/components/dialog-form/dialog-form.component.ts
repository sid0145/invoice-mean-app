import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from "@angular/material";
import { ClientService } from "../../services/client.service";
import { DialogData } from "./dialog-form.interface";

@Component({
  selector: "app-dialog-form",
  templateUrl: "./dialog-form.component.html",
  styleUrls: ["./dialog-form.component.css"],
})
export class DialogFormComponent implements OnInit {
  clientForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<DialogFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder,
    private clientService: ClientService,
    private snackBar: MatSnackBar
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.initilizeForm();
    if (this.data && this.data.clientId) {
      this.updateClient(this.data.clientId);
    }
  }

  private initilizeForm() {
    this.clientForm = this.fb.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", Validators.required],
    });
  }

  private updateClient(id: string) {
    this.clientService.getClient(id).subscribe(
      (data) => {
        this.clientForm.patchValue(data);
      },
      (err) => {
        this.snackBar.open("error occured!", "error", {
          duration: 2000,
        });
      }
    );
  }
}
