import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms'; import { UserDTO } from 'src/app/DTO/UserDTO';
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
          Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)
        ],
      ],
    });
  }

  ngOnInit(): void {
    this.checkUserActiveSession();
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
    console.log("logged out: ", result);
  }

  async checkUserActiveSession(): Promise<UserDTO> {
    const user = await this.authService.getCurrentSession();
    return this.user = user;
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
