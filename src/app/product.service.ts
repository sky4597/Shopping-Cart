import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { map } from "rxjs/operators";
import { Product } from "./models/product";

@Injectable()
export class ProductService {
  constructor(private db: AngularFireDatabase) {}

  create(product) {
    return this.db.list("/products").push(product);
  }

  getAll() {
    let products: Product[] = [];
    return this.db
      .list("/products")
      .snapshotChanges()
      .pipe(
        map(i => {
          i.map(x => {
            products.push(<Product>{
              category: x.payload.val()["category"],
              imageUrl: x.payload.val()["imageUrl"],
              price: x.payload.val()["price"],
              title: x.payload.val()["title"],
              key: x.key
            });
          });
          return products;
        })
      );
  }

  get(productId) {
    return this.db.object("/products/" + productId);
  }

  update(productId, product) {
    return this.db.object("/products/" + productId).update(product);
  }

  delete(productId) {
    return this.db.object("/products/" + productId).remove();
  }
}
