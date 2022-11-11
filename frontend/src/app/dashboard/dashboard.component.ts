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
    this.sharedDataService.getUserObs().subscribe(user => {
      if (user) {
        this.user = user;
      }
    });
  }

  ngOnInit(): void {
    this.getFriendRequestsAndUsersThatSentThem();
  }

  private getFriendRequestsAndUsersThatSentThem() {
    this.friendRequestService.getFriendRequestForUser(this.user._id).then(async requests => {
      if (requests) {
        const usersForRequests = await this.usersService.getUsersByMultipleIds(requests.map(req => req.from));

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
        console.log(this.usersAndRequestData);


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
