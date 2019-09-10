import { Component } from '@angular/core';
import { CategoryService } from 'shared/services/category.service';
import { Observable } from 'rxjs';
import { ProductService } from 'shared/services/product.service'
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';





@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent  {
  categories$ : Observable<any>;
  product = {};
  id;
  isNewProd: Boolean = true;

  constructor(categoryService: CategoryService, private productService: ProductService, private router: Router, private route: ActivatedRoute) {
    this.categories$ = categoryService.getCategories();

    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id)
    {
      this.productService.get(this.id).valueChanges().pipe(take(1)).subscribe(p=>this.product=p);
      this.isNewProd = false;
    }

   }



  delete(){
    if(!confirm('Are you sure you want to delete this product?')) return
      this.productService.delete(this.id);
      this.router.navigate(['/admin/products']);
  }

  save(product){
    product.price = +product.price;
    if(this.id) this.productService.update(this.id,product)
    else this.productService.create(product);

    this.router.navigate(['/admin/products'])
  }
}
