import { Product } from './models/product';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators'
import { Observable, Subject } from 'rxjs';
import { ShoppingCart } from './models/shopping-cart';

@Injectable()
export class ShoppingCartService {
  private cartId;
  private broadcast$: Subject<number> = new Subject();
  public obs$ : Observable<any>;

  constructor(private db: AngularFireDatabase) { }


  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    })
  }

  public getTotalItemCount():Observable<number>{
    return this.broadcast$.asObservable()
  }

  public push(currCount: number): void{
    this.broadcast$.next(currCount);
  }



  async getCart() {
    let res = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + res);
  }



  private async getOrCreateCartId() {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;

  }









  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  async addToCart(product: Product) {
    this.updateItemQuantity(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItemQuantity(product, -1);
  }

  private async updateItemQuantity(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let itemRef = this.getItem(cartId, product.key);
    itemRef.snapshotChanges().pipe(take(1)).subscribe(item => {
      itemRef.update({ product: product, quantity: ((Object(item.payload.val()).quantity) || 0) + change });
    });
  }
}
