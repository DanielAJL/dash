import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserDTO } from 'src/app/DTO/UserDTO';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'single-user',
  templateUrl: './single-user.component.html',
  styleUrls: ['./single-user.component.scss']
})
export class SingleUserComponent implements OnInit {
  userId: string;
  user: UserDTO;

  constructor(private route: ActivatedRoute, private usersService: UsersService) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.userId = params['id'];
        if (!this.userId) {
          // No USER ID found to grab data with, throw error!
          return;
        } else {
          if (this.userId.match(/^[0-9a-fA-F]{24}$/)) {
            // Yes, it's a valid ObjectId, proceed with `findById` call in backend.
            this.getUserFromQueryParams();
          } else {
            // IS NOT A VALID ObjectId for Mongoose User model, send to 404?!
          }
        }
      }
      );
  }

  async getUserFromQueryParams() {
    this.user = await this.usersService.getUser(this.userId);
  }

}
