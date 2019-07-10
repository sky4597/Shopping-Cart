import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";
import { UserService } from "./user.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  constructor(router: Router, auth: AuthService, userService: UserService) {
    auth.afAuth.auth.getRedirectResult().then(res => {
      if (res.user) {
        userService.save(res.user);
        router.navigateByUrl(localStorage.getItem("returnUrl"));
      }
    });
  }
}
