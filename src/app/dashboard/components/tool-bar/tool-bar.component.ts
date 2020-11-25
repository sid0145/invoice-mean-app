import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
import { JwtService } from "src/app/core/services/jwt.service";

@Component({
  selector: "app-tool-bar",
  templateUrl: "./tool-bar.component.html",
  styleUrls: ["./tool-bar.component.css"],
})
export class ToolBarComponent implements OnInit {
  @Output() toggleSidenav = new EventEmitter<void>();
  constructor(private jwtService: JwtService, private router: Router) {}

  ngOnInit() {}

  logout() {
    this.jwtService.destroyToken();
    this.router.navigate(["/login"]);
  }
}
