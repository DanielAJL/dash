import { IsEmail, IsString } from 'class-validator';
import { Types } from 'mongoose';
// type MyRef<T> = <T & { _id: Types.ObjectId }, Types.ObjectId & { _id: Types.ObjectId }>;
export class CreateUserDTO {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;

  // @IsString()
  // public name?: string;
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
}
