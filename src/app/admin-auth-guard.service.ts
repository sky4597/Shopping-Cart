import { Injectable } from '@angular/core';
import { CanActivate, Router } from "@angular/router";
import { AuthService } from './auth.service';
import { map, switchMap } from 'rxjs/operators';
import { UserService } from './user.service';
import { AppUser } from './models/app-user';
import { Observable } from 'rxjs';

@Injectable()
export class AdminAuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private userService: UserService,private router: Router) { }

  canActivate(): Observable<boolean> {
   return this.auth.appUser$.pipe(
         map((res: AppUser) => {
           if(res.isAdmin) return true
           else{
             this.router.navigate(['/']);
             return false;
           }
         })
       );

  }
}
