import { ShoppingCart } from './../models/shopping-cart';

import { ShoppingCartService } from './../shopping-cart.service';
import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";
import { AppUser } from "../models/app-user";
import { switchMap, filter, take } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: "nav-bar",
  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.css"]
})
export class NavBarComponent implements OnInit {
  public collapsed: boolean = true;
  shoppingCartItemCount: number = 0;
  appUser: AppUser;


  constructor(private auth: AuthService, private cartService: ShoppingCartService) {

  }

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => (this.appUser = appUser));
    this.cartService.broadcast$.subscribe(x => {
      this.shoppingCartItemCount = x;
    })
  }

  toggleCollapsed() {
    this.collapsed = !this.collapsed;
  }

  logout() {
    this.auth.logout();
  }
}
