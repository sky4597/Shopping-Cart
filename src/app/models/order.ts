import { ShoppingCart } from './shopping-cart';

export class Order{
  datePlaced: number;
  items: any[];

  /**
   *
   */
  constructor(public userId: string, public shipping: any, shoppingCart: ShoppingCart) {
    this.datePlaced = new Date().getTime();

    this.items = shoppingCart.items.map(i => {
      return {
        product: {
          title: i.product.title,
          imageUrl: i.product.imageUrl,
          price: i.product.price
        },
        quantity: i.quantity,
        totalPrice: i.totalPrice
      }
    })
  }


  get cartPrice(){
    let sum = 0;
    this.items.map(x=>sum+=x.totalprice);
    return sum;
  }
}
