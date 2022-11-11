import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { UserDTO } from '../DTO/UserDTO';
import { SharedDataService } from '../services/shared-data.service';
import { UsersService } from '../services/users.service';
import { EXPERIENCES, LANGUAGES } from '../../constants';
import { FriendRequestDTO } from '../DTO/FriendRequestDTO';
import { FriendRequestService } from '../services/friendrequest.service';

class viewToggleOptions {
  pendingRequestsView: boolean = false;
  testView: boolean = false;
  testViewTwo: boolean = false;
}

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
  pendingRequests: Array<FriendRequestDTO>;
  usersThatSentFriendRequest: Array<UserDTO>;
  @Input() toggleView: viewToggleOptions = new viewToggleOptions;

  constructor(private sharedDataService: SharedDataService, private formBuilder: FormBuilder, private usersService: UsersService, private friendRequestService: FriendRequestService) {
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
  }

  ngOnInit(): void {
    this.sharedDataService.getUserObs().subscribe(user => {
      if (user) {
        this.user = user;
        this.getFriendRequests();
      }
    });
  }

  private async getFriendRequests() {
    const friendRequests: Array<FriendRequestDTO> = await this.friendRequestService.getFriendRequestForUser(this.user._id);
    this.pendingRequests = friendRequests;
    const usersForRequests = await this.usersService.getUsersByMultipleIds(friendRequests.map(req => req.from));
    this.usersThatSentFriendRequest = usersForRequests; // USERS THAT MATCH SENT FROM USERS (SO THE USER SENDING THE INVITE)

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
