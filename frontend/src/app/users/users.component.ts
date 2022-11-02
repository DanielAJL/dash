import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from '../services/users.service';
import { UserDTO } from '../DTO/UserDTO';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { EXPERIENCES } from '../../constants';
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
  public usersDatasource: MatTableDataSource<UserDTO> = new MatTableDataSource();
  public displayedColumns: Array<string> = [
    '#',
    'name',
    'experienceLevel',
    'actions'
  ];

  public usersTableFilter: FilterOptions = new FilterOptions();
  constructor(private usersService: UsersService) { }

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
    console.log(userProfile);
  }

  public logger() {
    console.log(this.usersTableFilter);

  }
}
