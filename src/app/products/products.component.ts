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
export class ProductsComponent implements OnInit {
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

      ngOnInit(){

         this.cartService.cart.subscribe(cart=>{
           console.log("%c cart:","font-weight:bold,color:red");
           this.cart= cart;
         });



     }


}
