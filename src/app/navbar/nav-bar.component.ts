import { Component, ViewChild, ElementRef, Renderer2 } from "@angular/core";
import * as firebase from 'firebase';
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: "nav-bar",
  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.css"]
})
export class NavBarComponent {
  @ViewChild("liForShow") listItem: ElementRef;
  @ViewChild("anchor") anchorEle: ElementRef;
  @ViewChild("divForShow") divElement: ElementRef;
  @ViewChild("Collapser") divCollapser: ElementRef;

  private isOpen: boolean = false;
  public collapsed: boolean = true;

  user: firebase.User;

  constructor(private renderer: Renderer2, private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(res => this.user = res);
  }

  toggleState() {
    this.isOpen = !this.isOpen;
  }

  addClasses() {
    this.renderer.addClass(this.listItem.nativeElement, "show");
    this.renderer.addClass(this.divElement.nativeElement, "show");
  }

  removeClasses() {
    this.renderer.removeClass(this.listItem.nativeElement, "show");
    this.renderer.removeClass(this.divElement.nativeElement, "show");
  }

  blur($event) {
    if (
      $event.relatedTarget == null
    ) {
      if (this.checkForClasses()) {
        this.removeClasses();
        this.toggleState();
      }
    }
    else if ($event.relatedTarget.textContent === "Log Out") {
      return;
    }

    else {
      setTimeout(() => {
        if (this.checkForClasses()) {
          this.removeClasses();
          this.toggleState();
        }
        this.toggleCollapsed();
      }, 300);
    }
  }

  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }

  checkForClasses(): boolean {
    let el = this.listItem.nativeElement.querySelector(".show");
    if (el != undefined || null) return true;
    return false;
  }

  triggerChange() {
    if (!this.isOpen) {
      this.addClasses();
    }
    if (this.isOpen) {
      this.removeClasses();
    }
    this.toggleState();
  }

  logout() {
    console.log("logged out");
    this.afAuth.auth.signOut();
  }
}
