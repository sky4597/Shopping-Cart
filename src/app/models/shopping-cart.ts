import { ProductCardComponent } from './../product-card/product-card.component';
import { ShoppingCartItem } from './shopping-cart-item';
import { Product } from './product';
export class ShoppingCart{
  items: ShoppingCartItem[] = [];
  /**
   *
   */
  constructor(private itemsMap: { [productId: string] : ShoppingCartItem }) {
    for(let productId in itemsMap){
      let item = itemsMap[productId]
      this.items.push(new ShoppingCartItem(item.product, item.quantity))
    }

  }

  getQuantity(product: Product) {
    // if(!this.shoppingCart || !this.shoppingCart.items) return 0;
    let item = this.itemsMap[product.key];
    return item ? item.quantity : 0;

  }


  get totalPrice(){
    let sum = 0;
    for(let productId in this.items){
      sum+= this.items[productId].totalPrice;
    }

    return sum;
  }

  get totalItemsCount(): number{
    let count = 0;
    for(let productId in this.itemsMap)
      count += this.itemsMap[productId].quantity
    return count;
  }

  // get productIds(){
  //   return Object.keys(this.itemsMap);
  // }
}
