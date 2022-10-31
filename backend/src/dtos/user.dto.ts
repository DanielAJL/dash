import { IsArray, IsEmail, IsString } from 'class-validator';
import { LanguageDTO } from './language.dto';
import { NetworkDTO } from './network.dto';
export class CreateUserDTO {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}

export class UserDTO {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;

  @IsString()
  public name?: string;

  @IsString()
  public experienceLevel?: string;

  @IsArray()
  public languages?: Array<LanguageDTO>;

  @IsArray()
  public network?: Array<NetworkDTO>;
}
