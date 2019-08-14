import { Product } from './models/product';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators'

@Injectable()
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }


  create(){
   return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    })
  }

  private getCart(cartId: string){
    return this.db.object('/shopping-carts/'+ cartId)
  }

  private async getOrCreateCartId(){
    let cartId = localStorage.getItem('cartId');
    if(cartId) return cartId

    let result = await this.create();
    localStorage.setItem('cartId',result.key);
    return result.key

  }

  private getItem(cartId: string, productId: string){
    return this.db.object('/shopping-carts/'+ cartId + '/items/' + productId);
  }

  async addToCart(product: Product){
    let cartId = await this.getOrCreateCartId();
    let itemRef = this.getItem(cartId,product.key);
    itemRef.snapshotChanges().pipe(take(1)).subscribe(item=>{
     itemRef.update({product:product,  quantity: ((Object(item.payload.val()).quantity) || 0)+1});
    });


  }
}
