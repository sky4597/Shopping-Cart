import { Component } from "@angular/core";
import * as firebase from "firebase";
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: "nav-bar",
  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.css"]
})
export class NavBarComponent {
  private isOpen: boolean = false;
  public collapsed: boolean = true;

  user: firebase.User;

  constructor(private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(res => (this.user = res));
  }

  toggleState() {
    this.isOpen = !this.isOpen;
  }

  toggleCollapsed() {
    this.collapsed = !this.collapsed;
  }

  logout() {
    console.log("logged out");
    this.afAuth.auth.signOut();
  }
}
