import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { UserDTO } from '../DTO/UserDTO';
import { SharedDataService } from '../services/shared-data.service';
import { UsersService } from '../services/users.service';
import { EXPERIENCES, LANGUAGES } from '../../constants';
import { LanguageDTO } from '../DTO/LanguageDTO';

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

  constructor(private sharedDataService: SharedDataService, private formBuilder: FormBuilder, private usersService: UsersService) {
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
      }
      // user is null here:
    });
  }

  private checkIfUserHasProfile() {
    if (this.user) {

    }
  }

  public async updateProfile() {
    if (this.formHasValidationErrors()) return;
    this.user.name = this.userBasicProfile.get('name')?.value;
    this.user.experienceLevel = this.userBasicProfile.get('experienceLevel')?.value[0];
    this.user.languages = this.userBasicProfile.get('languages')?.value;
    console.log(this.user);


    this.usersService.updateUser(this.user._id!, this.user);
  }
  onNgModelChange(event: Event) {
    console.log('On ngModelChange : ', event);
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
