import { ShoppingCart } from './../models/shopping-cart';
import { ShoppingCartService } from './../shopping-cart.service';
import { Component, OnInit, OnDestroy, AfterViewChecked, AfterViewInit } from "@angular/core";
import { ProductService } from "../product.service";
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { switchMap, filter } from 'rxjs/operators';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"]
})
export class ProductsComponent implements OnInit, OnDestroy {
  products : Product[] = [];
  filteredProducts: Product[] = [];
  category: string;
  cart: any;
  subscription : Subscription;

  constructor(
    private route: ActivatedRoute,
    productService: ProductService,
    private cartService: ShoppingCartService) {

    productService.getAll().pipe(
      switchMap(products=>{
        this.products = products
        return route.queryParamMap;
      })
    ).subscribe(params=>{
        this.category = params.get('category');
        this.filteredProducts = (this.category) ?
        this.products.filter(p=>p.category === this.category) : this.products
    })
     }

     async ngOnInit(){
      this.subscription  =(await this.cartService.getCart()).valueChanges().subscribe((cart: ShoppingCart)=>{
        this.cart = cart;
        let shoppingCartItemCount = 0;
        if(!cart || !cart.items){
          shoppingCartItemCount =0;
          return;
        };
      for (let productId in cart.items)
        shoppingCartItemCount += cart.items[productId].quantity;
        this.cartService.broadcast$.next(shoppingCartItemCount);
      });


     }


     ngOnDestroy(){
      this.subscription.unsubscribe();
     }
}
