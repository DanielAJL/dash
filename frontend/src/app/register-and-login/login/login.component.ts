import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms'; import { UserDTO } from 'src/app/DTO/UserDTO';
import { UsersService } from 'src/app/services/users.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  user!: UserDTO;

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private authService: AuthService,
  ) {
    this.loginForm = this.formBuilder.group({
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

  async login() {
    if (this.formHasValidationErrors()) return;
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    const user: UserDTO = {
      password: password,
      email: email,
    };

    this.user = await this.authService.login(user);
  }

  async logout() {
    const result: UserDTO = await this.authService.logout(this.user);
    console.log(result);
  }

  async getCurrentUser() {
    const user = await this.authService.getCurrentSession();
    return user;
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
