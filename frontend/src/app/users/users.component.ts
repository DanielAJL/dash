import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from '../services/users.service';
import { UserDTO } from '../DTO/UserDTO';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { EXPERIENCES } from '../../constants';
import { SharedDataService } from '../services/shared-data.service';
import { FriendRequestService } from '../services/friendrequest.service';

class FilterOptions {
  name: string | null = '';
  experience: string | null = null;
  experienceOptions: Array<string> = EXPERIENCES;
}

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public users: Array<UserDTO>;
  public authUser: UserDTO;
  public usersDatasource: MatTableDataSource<UserDTO> = new MatTableDataSource();
  public displayedColumns: Array<string> = [
    '#',
    'name',
    'experienceLevel',
    'actions'
  ];

  public filterOptions: FilterOptions = new FilterOptions();
  constructor(private usersService: UsersService, private sharedDataService: SharedDataService, private friendRequestService: FriendRequestService) {
    this.sharedDataService.getUserObs().subscribe(res => {
      this.authUser = res;
    })
  }

  @ViewChild(MatPaginator) set paginator(value: MatPaginator) {
    this.usersDatasource.paginator = value;
  }

  ngOnInit(): void {
    this.getUsers();
  }

  private async getUsers() {
    this.users = await this.usersService.getUsers();
    this.usersDatasource.data = this.users;
  }

  public async getUserById(user: UserDTO) {
    const userProfile = await this.usersService.getUser(user._id);
    // console.log(userProfile);
  }

  public filterTheUsersTable() {
    let filteredUsers: Array<UserDTO> = [];

    this.users.forEach(user => {
      if (!this.filterOptions.experience || user.experienceLevel.toLowerCase() === this.filterOptions.experience.toLowerCase())
        filteredUsers.push(user);
      filteredUsers = filteredUsers.filter(filteredUser => filteredUser.name.toLowerCase().startsWith(this.filterOptions.name.toLowerCase()));
    })

    this.usersDatasource.data = filteredUsers;
  }

  public async sendUserInvitation(userId) {
    const friendRequest = await this.friendRequestService.sendFriendRequest(this.authUser._id, userId, "pls accept!");
    console.log(friendRequest);

  }
}
