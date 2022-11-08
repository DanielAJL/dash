import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from "@angular/router";
import { AuthService } from "../services/auth.service";
import { SharedDataService } from "../services/shared-data.service";
@Injectable()
export class AuthGuard implements CanActivate {
  isActiveSession: any;
  constructor(private authService: AuthService, private router: Router, private sharedDataService: SharedDataService) {
    this.sharedDataService.getUserObs().subscribe(res => {
      this.isActiveSession = res;
    })
  };
  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    const isLoggedIn = await this.authService.getCurrentSession();
    if (isLoggedIn) {
      this.sharedDataService.setUserObs(isLoggedIn);
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  async canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    if (!this.isActiveSession) {
      const isLoggedIn = await this.authService.getCurrentSession();
      if (isLoggedIn) {
        this.sharedDataService.setUserObs(isLoggedIn);
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    }
    return this.isActiveSession;
  }
}
