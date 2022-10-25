import { Component, OnInit } from '@angular/core';
import { async } from 'rxjs';
import { UserDTO } from './DTO/UserDTO';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  users: UserDTO[] | undefined;

  constructor(private usersService: UsersService) {

  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  async getAllUsers() {
    // retrieve detailed user information
    await this.usersService.getUsers().then((res) => {
      console.log(res);
      this.users = res;
    }).catch((err) => {
      console.log(err);
    });
  }

}
