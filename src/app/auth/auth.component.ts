import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material";
import { Router } from "@angular/router";
import { AuthService } from "../core/services/auth.service";
import { JwtService } from "../core/services/jwt.service";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.css"],
})
export class AuthComponent implements OnInit {
  authForm: FormGroup;
  title = "";
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private jwtService: JwtService,
    private router: Router,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit() {
    this.initForm();
    this.title = this.router.url === "/login" ? "Login" : "SignUp";
  }

  private initForm() {
    this.authForm = this.fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  onSubmit() {
    if (this.title === "SignUp") {
      this.authService.signup(this.authForm.value).subscribe(
        (result) => {
          this.router.navigate(["/dashboard", "invoices"]);
          this.snackbar.open("signup success", "success", {
            duration: 2000,
          });
        },
        (err) => {
          this.snackbar.open("oop's something went wrong!", "error", {
            duration: 2000,
          });
        }
      );
    } else {
      this.authService.login(this.authForm.value).subscribe(
        (data) => {
          this.jwtService.setToken(data.token);
          this.router.navigate(["/dashboard", "invoices"]);
          this.snackbar.open("login success", "success", {
            duration: 2000,
          });
        },
        (err) => {
          this.snackbar.open("something is wrong!", "error", {
            duration: 2000,
          });
        }
      );
    }
  }

  //google auth handler

  googleAuthHandler() {
    this.authService.googleSignIn().subscribe((data) => {
      console.log(data);
    });
  }
}
