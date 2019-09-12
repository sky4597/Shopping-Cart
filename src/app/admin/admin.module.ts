import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderDetailsComponent } from 'shared/components/order-details/order-details.component';
import { AuthGuardService } from 'shared/services/auth-guard.service';
import { SharedModule } from 'shared/shared.module';

import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { AdminAuthGuardService } from './services/admin-auth-guard.service';

const routes: Routes = [
  { path: 'admin/products/new', component: ProductFormComponent,canActivate:[AuthGuardService, AdminAuthGuardService] },
  { path: 'admin/products/:id', component: ProductFormComponent,canActivate:[AuthGuardService, AdminAuthGuardService] },
  { path: 'admin/products', component: AdminProductsComponent,canActivate:[AuthGuardService, AdminAuthGuardService] },
  { path: 'admin/orders', component: AdminOrdersComponent,canActivate:[AuthGuardService, AdminAuthGuardService ] },
  { path: 'admin/orders/:id', component: OrderDetailsComponent,canActivate:[AuthGuardService, AdminAuthGuardService ] }

];

@NgModule({
  declarations: [

    ProductFormComponent,
    AdminProductsComponent,
    AdminOrdersComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  providers:[
    AdminAuthGuardService
  ]
})
export class AdminModule { }
