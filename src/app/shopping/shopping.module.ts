import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { OrderDetailsComponent } from 'shared/components/order-details/order-details.component';
import { AuthGuardService } from 'shared/services/auth-guard.service';

import { CheckOutComponent } from './components/check-out/check-out.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { ProductFilterComponent } from './components/products/product-filter/product-filter.component';
import { ProductsComponent } from './components/products/products.component';
import { ShippingFormComponent } from './components/shipping-form/shipping-form.component';
import { ShoppingCartSummaryComponent } from './components/shopping-cart-summary/shopping-cart-summary.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { SharedModule } from 'shared/shared.module';

const routes: Routes = [
  { path: 'products', component: ProductsComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent },
  { path: 'check-out', component: CheckOutComponent, canActivate:[AuthGuardService] },
  { path: 'order-success/:id', component: OrderSuccessComponent,canActivate:[AuthGuardService] },
  { path: 'my/orders', component: MyOrdersComponent, canActivate:[AuthGuardService] },
  { path: 'orders/:id', component: OrderDetailsComponent,canActivate:[AuthGuardService] }
]

@NgModule({
  declarations: [
    ShoppingCartComponent,
    ProductsComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    ProductFilterComponent,
    ShoppingCartSummaryComponent,
    ShippingFormComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class ShoppingModule { }
