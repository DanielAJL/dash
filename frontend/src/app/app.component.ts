import { Component, OnInit } from '@angular/core';
import { UserDTO } from './DTO/UserDTO';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  user!: UserDTO;

  constructor(private authService: AuthService) {

  }

  async ngOnInit() {
  }

  async checkUserActiveSession(): Promise<UserDTO> {
    const user = await this.authService.getCurrentSession();
    return user;
  }

  async logout() {
    await this.authService.logout(this.user);
    // this.user = {};
  }
}
