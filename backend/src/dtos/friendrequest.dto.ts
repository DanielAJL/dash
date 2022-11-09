import { IsEnum, IsString } from 'class-validator';
import { FriendRequestStatus } from '@/enums/enumFriendRequest';

export class FriendRequestDTO {
  @IsString()
  public to: string;

  @IsString()
  public from: string;

  @IsString()
  public message: string;

  @IsEnum(FriendRequestStatus)
  public status: FriendRequestStatus;
}
