import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms'; import { UserDTO } from 'src/app/DTO/UserDTO';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
  ) {
    this.loginForm = this.formBuilder.group({
      // username: [
      //   null,
      //   [
      //     Validators.required,
      //     Validators.minLength(5),
      //     Validators.maxLength(30),
      //   ],
      // ],
      password: [
        null,
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(40),
        ],
      ],
      email: [
        null,
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50),
        ],
      ],
    });
  }

  ngOnInit(): void {
  }

  login() {
    if (this.formHasValidationErrors()) return;
    // const username = this.loginForm.get('username')?.value;
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    const user: UserDTO = {
      // username: username,
      password: password,
      email: email,
    };

    // Send User and Admin Log to API with service
    this.usersService.createUser(user);
  }

  formHasValidationErrors(): boolean {
    let errorCount: number = 0;
    Object.keys(this.loginForm.controls).forEach((key) => {
      const controlErrors: ValidationErrors | null | undefined =
        this.loginForm.get(key)?.errors;
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
