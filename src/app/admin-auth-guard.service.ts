import { Injectable } from '@angular/core';
import { CanActivate, Router } from "@angular/router";
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
import { AppUser } from './models/app-user';
import { Observable } from 'rxjs';

@Injectable()
export class AdminAuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(): Observable<boolean> {
   return this.auth.appUser$.pipe(
         map((res: AppUser) => {
           if(!res.isAdmin || !res) {
            this.router.navigate(['/']);
            return false;
           }
           else return true;
         })
       );

  }
}
