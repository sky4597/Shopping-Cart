import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";
import { AppUser } from "../models/app-user";

@Component({
  selector: "nav-bar",
  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.css"]
})
export class NavBarComponent implements OnInit {
  public collapsed: boolean = true;
  appUser: AppUser;


  constructor(private auth: AuthService) {
    auth.appUser$.subscribe(appUser => (this.appUser = appUser));
  }

  ngOnInit() {}

  toggleCollapsed() {
    this.collapsed = !this.collapsed;
  }

  logout() {
    this.auth.logout();
  }
}
