import { Injectable } from "@angular/core";
import { CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "./auth.service";
import { map } from "rxjs/operators";
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private auth: AuthService, private router: Router, private userService: UserService) {}

  canActivate(route,state: RouterStateSnapshot): Observable<boolean> {
    return this.auth.user$.pipe(
      map(user => {
        if (user) return true;

        this.router.navigate(["/login"], {
          queryParams: { returnUrl: state.url }
        });
        return false;
      })
    );
  }


}
