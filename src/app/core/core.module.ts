import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'shared/shared.module';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavBarComponent } from './components/navbar/nav-bar.component';

@NgModule({
  declarations: [
    NavBarComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    SharedModule,
    NgbDropdownModule,
    RouterModule.forChild([])
  ],
  exports:[
    NavBarComponent
  ]
})
export class CoreModule { }
