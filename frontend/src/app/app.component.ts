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
    // this.router.events.forEach(event => {
    //   if (event instanceof NavigationEnd) {
    //     this.checkUserActiveSession().then((res) => {
    //       if (res) {
    //         console.log(res);

    //         this.isLoggedIn = true;
    //       } else {
    //         this.isLoggedIn = false;
    //       }
    //     });
    //   }
    // })

    this.checkUserActiveSession();
  }

  async ngOnInit() {
  }

  async checkUserActiveSession() {
    this.isLoggedIn = await this.authService.getCurrentSession();
  }

  async logout() {
    await this.authService.logout(this.user).then(user => {
      if (user) {
        this.isLoggedIn = false;
      }
    });

  }
}
