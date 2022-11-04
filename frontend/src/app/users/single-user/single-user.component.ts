import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserDTO } from 'src/app/DTO/UserDTO';
import { UsersService } from 'src/app/services/users.service';
import { NavigationEnd, Router } from '@angular/router';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'single-user',
  templateUrl: './single-user.component.html',
  styleUrls: ['./single-user.component.scss']
})
export class SingleUserComponent implements OnInit {
  userId: string;
  user: UserDTO;
  authenticatedUser: UserDTO;

  constructor(private route: ActivatedRoute, private usersService: UsersService, private router: Router, private sharedDataService: SharedDataService) { }

  ngOnInit(): void {

    this.route.queryParams
      .subscribe(params => {
        this.userId = params['id'];
        if (!this.userId) {
          // No USER ID found to grab data with
          this.router.navigate(['404']);
          return;
        } else {
          if (this.userId.match(/^[0-9a-fA-F]{24}$/)) {
            // Yes, it's a valid ObjectId, proceed to `getUserFromQueryParams()`
            this.getUserFromQueryParams();
            console.log('test');

          } else {
            // Not valid ObjectId, so can never exist as id for user.
            this.router.navigate(['404']);
          }
        }
      }
      );


  }

  async getUserFromQueryParams() {
    this.user = await this.usersService.getUser(this.userId);
    if (!this.user) {
      // User not found, invalid key.
      this.router.navigate(['404']);
    } else {
      this.sharedDataService.getUserObs().subscribe(user => {
        if (user) {
          this.authenticatedUser = user;
        }
      });
    }
  }

  async addUserToNetwork() {

  }

}
