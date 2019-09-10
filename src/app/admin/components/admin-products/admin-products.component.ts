import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'shared/services/product.service';
import { Subscription } from 'rxjs';
import { Product } from 'shared/models/product';
import { DataTableResource } from 'angular7-data-table'

@Component({
  selector: "app-admin-products",
  templateUrl: "./admin-products.component.html",
  styleUrls: ["./admin-products.component.css"]
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  items: Product[] = [];
  limit: any;
  itemCount: number;
  filteredProducts: any[];
  subscription: Subscription;
  tableResource: DataTableResource<Product>;

  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAll().subscribe(products => {
      this.products = products;
      this.initializeTable(products, {limit:10});
    });
  }

  ngOnInit() {}

  filter(query: string) {
    let filteredProducts = query
      ? this.products.filter(p =>
          p.title.toLowerCase().includes(query.toLowerCase())
        )
      : this.products;

      if(!query)
      this.initializeTable(filteredProducts, { offset:0, limit: this.limit });
      else
      this.initializeTable(filteredProducts);
  }

  private initializeTable(products: Product[], params?: any) {
    let queryObj = { offset: 0 }
    if(params) queryObj['limit']= this.limit =params.limit;
    this.tableResource = new DataTableResource(products);
    this.tableResource.query(queryObj,()=>{return true}).then(items => (this.items = items));
    this.tableResource.count().then(count => (this.itemCount = count));
  }

  reloadItems(params: any){

    if(!this.tableResource) return
    if(params.limit)
    this.limit = params["limit"];
    this.tableResource.query(params).then(items => (this.items = items));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
