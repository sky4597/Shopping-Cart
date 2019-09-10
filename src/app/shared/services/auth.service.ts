import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from "firebase";
import { Observable, of } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { AppUser } from 'shared/models/app-user';
import { UserService } from 'shared/services/user.service';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(public afAuth: AngularFireAuth, private route: ActivatedRoute, private router: Router, private userService: UserService) {
    this.user$ = this.afAuth.authState;
  }

  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get("returnUrl") || "/";
    localStorage.setItem("returnUrl", returnUrl);
    this.afAuth.auth.signInWithRedirect( new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  get appUser$() {
    return this.user$.pipe(
      switchMap(user=>{
        if(user) return this.userService.get(user.uid).valueChanges()
        return of(null);
      })
    )
  }
}
