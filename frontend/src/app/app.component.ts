import { Component, OnInit } from '@angular/core';
import { UserDTO } from './DTO/UserDTO';
import { AuthService } from './services/auth.service';
import { NavigationEnd, Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  user!: UserDTO;
  isLoggedIn!: boolean;

  constructor(private authService: AuthService, private router: Router) {

    // WRITE AN AUTH GUARD TO REPLACE THIS CODE.
    this.router.events.forEach(event => {
      if (event instanceof NavigationEnd) {
        this.checkUserActiveSession().then((res) => {
          if (res) {
            this.user = res as UserDTO;
            this.isLoggedIn = true;
            // set user data
          } else {
            this.isLoggedIn = false;
          }
        });
      }
    });
  }

  async ngOnInit() {

  }

  async checkUserActiveSession(): Promise<boolean> {
    this.isLoggedIn = await this.authService.getCurrentSession();
    return this.isLoggedIn;

  }

  async logout() {
    await this.authService.logout(this.user).then(user => {
      if (user) {
        // logout success
        this.isLoggedIn = false;
      }
    });
  }

}
