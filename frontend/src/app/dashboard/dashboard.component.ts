import { Component, OnInit } from '@angular/core';
import { UserDTO } from '../DTO/UserDTO';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user!: UserDTO;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.checkUserActiveSession();
  }

  async checkUserActiveSession(): Promise<UserDTO> {
    const user = await this.authService.getCurrentSession();
    return this.user = user;
  }

  async logout() {
    await this.authService.logout(this.user);
  }
}
