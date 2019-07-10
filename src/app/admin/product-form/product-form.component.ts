import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/category.service';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$ : Observable<any>;

  constructor(categoryService: CategoryService) {
    this.categories$ = categoryService.getCategories();
    this.categories$.subscribe(res=>{
      res.map(iter=>iter.payload);
    });
   }

  ngOnInit() {
  }

  save(f: NgForm){
    console.log(f.value);
  }
}
