import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { UserDTO } from '../DTO/UserDTO';
import { SharedDataService } from '../services/shared-data.service';
import { UsersService } from '../services/users.service';
import { EXPERIENCES, LANGUAGES } from '../../constants';
import { FriendRequestDTO } from '../DTO/FriendRequestDTO';
import { FriendRequestService } from '../services/friendrequest.service';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { FriendRequestStatus } from '../enums/FriendRequestStatusEnum';

class viewToggleOptions {
  pendingRequestsView: boolean = false;
  friendsView: boolean = false;
  testViewTwo: boolean = false;
}

class userAndRequestDataInOne {
  user: UserDTO;
  friendReq: FriendRequestDTO;
};


@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user!: UserDTO;
  userBasicProfile: FormGroup;
  experiences = EXPERIENCES;
  languages = LANGUAGES;
  usersAndRequestData: userAndRequestDataInOne[] = [];
  friends: UserDTO[] = [];
  friendsRequestData: userAndRequestDataInOne[] = [];

  @Input() toggleView: viewToggleOptions = new viewToggleOptions;

  constructor(private sharedDataService: SharedDataService, private formBuilder: FormBuilder, private usersService: UsersService, private friendRequestService: FriendRequestService, private dialog: MatDialog) {
    this.userBasicProfile = this.formBuilder.group({
      name: [
        null,
        [
          Validators.required,
          Validators.minLength(2),
        ],
      ],
      experienceLevel: [
        null,
        [Validators.required]
      ],
      languages: [
        null,
        [Validators.required]
      ],
    });
    this.sharedDataService.getUserObs().subscribe(user => {
      if (user) {
        this.user = user;
      }
    });
  }

  ngOnInit(): void {
    this.getFriendRequestsAndUsersThatSentThem();
    this.getFriends();
  }

  private getFriendRequestsAndUsersThatSentThem() {
    this.friendRequestService.getFriendRequestForUser(this.user._id, 'pending').then(async requests => {
      if (requests) {
        const usersForRequests = await this.usersService.getUsersByMultipleIds(requests.map(req => req.from));

        /**
         * Match the users that sent a request with a specific request using the `from` key that matches their userId
         */
        for (let i = 0; i < usersForRequests.length; i++) {
          for (let j = 0; j < requests.length; j++) {
            if (usersForRequests[i]._id === requests[j].from) {
              let data = new userAndRequestDataInOne();
              data.user = usersForRequests[i];
              data.friendReq = requests[j];
              this.usersAndRequestData.push(data);
            }
          }
        }
      }
    });
  }

  private getFriends() {
    this.friendRequestService.getFriendRequestForUser(this.user._id, 'success').then(async friends => {
      if (friends) {
        const usersForRequests = await this.usersService.getUsersByMultipleIds(friends.map(friend => friend.from));

        /**
         * Match the users that sent a request with a specific request using the `from` key that matches their userId
         */
        for (let i = 0; i < usersForRequests.length; i++) {
          for (let j = 0; j < friends.length; j++) {
            if (usersForRequests[i]._id === friends[j].from) {
              let data = new userAndRequestDataInOne();
              data.user = usersForRequests[i];
              data.friendReq = friends[j];
              this.friendsRequestData.push(data);
            }
          }
        }
        console.log(friends);

      }
    });
  }

  public openDialog(freq: FriendRequestDTO) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.componentInstance.data = freq.message;
    dialogRef.componentInstance.title = 'Message';

    dialogRef.afterClosed().subscribe(async result => {
      if (result) {
        // modal result true (so confirmed action)
        freq.status = FriendRequestStatus.Success;
        await this.friendRequestService.updateFriendRequest(freq);
      } else {
        // modal cancelled
        console.log('fail: cancelled action');
      }

    });
  }

  public async updateProfile() {
    if (this.formHasValidationErrors()) return;
    this.user.name = this.userBasicProfile.get('name')?.value;
    this.user.experienceLevel = this.userBasicProfile.get('experienceLevel')?.value[0];
    this.user.languages = this.userBasicProfile.get('languages')?.value;
    this.usersService.updateUser(this.user._id!, this.user);
  }

  public updateViewVariables() {
    for (const viewVariable in this.toggleView) {
      if (Object.prototype.hasOwnProperty.call(this.toggleView, viewVariable)) {
        this.toggleView[viewVariable] = false;
      }
    }
  }

  private formHasValidationErrors(): boolean {
    let errorCount: number = 0;
    Object.keys(this.userBasicProfile.controls).forEach((key) => {
      const controlErrors: ValidationErrors | null | undefined =
        this.userBasicProfile.get(key)?.errors;
      if (controlErrors != null) {
        // Form group has errors
        Object.keys(controlErrors).forEach((keyError) => {
          errorCount += 1;
          // console.log(
          //   'Key control: ' + key + ', keyError: ' + keyError + ', err value: ',
          //   controlErrors[keyError]
          // );
          return true;
        });
      }
    });
    // Form is valid
    return false;
  }

}
