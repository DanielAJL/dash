import { Component, OnInit } from '@angular/core';
import { CreateUserDTO } from './DTO/CreateUserDTO';
import { UserDTO } from './DTO/UserDTO';
import { AuthService } from './services/auth.service';
import { NavigationEnd, Router } from '@angular/router';
import { SharedDataService } from './services/shared-data.service';
const { version: appVersion } = require('../../package.json')
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  appVersion: string;
  title = 'frontend';
  user!: UserDTO;
  isLoggedIn!: boolean;

  constructor(private authService: AuthService, private router: Router, private sharedDataService: SharedDataService) {

    // WRITE AN AUTH GUARD TO REPLACE THIS CODE.
    this.router.events.forEach(event => {
      if (event instanceof NavigationEnd) {
        this.checkUserActiveSession().then((res) => {
          if (res) {
            this.user = res as unknown as UserDTO;
            this.isLoggedIn = true;
            // Set user observable to the user response (BehaviourSubject):
            this.sharedDataService.setUserObs(this.user);
            this.appVersion = appVersion;
          } else {
            this.isLoggedIn = false;
          }
        });
      }
    });

  }

  async ngOnInit() {
    this.sharedDataService.getUserObs().subscribe(user => {
      this.user = user;
    });
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
