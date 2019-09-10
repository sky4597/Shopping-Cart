import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { ShoppingCartService } from './shopping-cart.service';

@Injectable()
export class OrderService {

  constructor(
    private cartService: ShoppingCartService,
    private db: AngularFireDatabase) { }

  async placeOrder(order){
    let result = await this.db.list('/orders').push(order);
    this.cartService.clearCart();
    return result;
  }

  public getOrders(){
    return this.db.list('/orders/');
  }

  getOrdersByUser(userId: string) {
    return this.db.list('/orders',ref => ref.orderByChild('userId').equalTo(userId));
  }

}
