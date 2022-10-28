import { IsEmail, IsString } from 'class-validator';

export class UserBackendDTO {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}
