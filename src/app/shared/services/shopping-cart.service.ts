import { Product } from 'shared/models/product';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators'
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Injectable()
export class ShoppingCartService {
  private cartId;
  private broadcast$: BehaviorSubject<number> = new BehaviorSubject(0);
  private cart: BehaviorSubject<ShoppingCart> = new BehaviorSubject<ShoppingCart>(new ShoppingCart({}));

  constructor(private db: AngularFireDatabase) { }


  public publishCart(cart: ShoppingCart){
    this.cart.next(cart);
  }

  public getPublishedCart(){
    return this.cart.asObservable();
  }

  public getTotalItemCount():Observable<number>{
    return this.broadcast$.asObservable()
  }

  public pushCount(currCount: number): void{
    this.broadcast$.next(currCount);
  }

  async getCart() {
    let res = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + res);
  }




  async addToCart(product: Product) {
    this.updateItemQuantity(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItemQuantity(product, -1);
  }

  async clearCart(){
    let cartId = await this.getOrCreateCartId();
    let itemRef = this.db.list('/shopping-carts/' + cartId + '/items')
    itemRef.remove();
  }

  private create() {
    let obj = {
      dateCreated: new Date().getTime(),
      info: window.navigator.userAgent
    }
    return this.db.list('/shopping-carts').push(obj);
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


  private async updateItemQuantity(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let itemRef = this.getItem(cartId, product.key);
    itemRef.snapshotChanges().pipe(take(1)).subscribe(item => {
      let quantity = ((Object(item.payload.val()).quantity) || 0) + change;
      if(quantity === 0) itemRef.remove();
      else
      itemRef.update({ product: product, quantity:quantity });
    });
  }
}
