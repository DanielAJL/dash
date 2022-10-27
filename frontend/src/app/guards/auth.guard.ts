import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from "@angular/router";
import { AuthService } from "../services/auth.service";
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { };
  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    console.log('CanActivate called');
    let isLoggedIn = this.authService.getCurrentSession();
    if (await isLoggedIn) {
      return true
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
