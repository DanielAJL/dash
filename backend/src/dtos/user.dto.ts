import { IsArray, IsEmail, IsNotEmptyObject, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { LanguageDTO } from './language.dto';
// import { LanguageDTO } from '@/DTOs/language.dto';
// type MyRef<T> = <T & { _id: Types.ObjectId }, Types.ObjectId & { _id: Types.ObjectId }>;
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
}
