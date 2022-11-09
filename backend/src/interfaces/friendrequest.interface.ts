import { FriendRequestStatus } from '@/enums/enumFriendRequest';

export interface FriendRequestInterface {
  _id: string;
  to: string;
  from: string;
  message: string;
  status: FriendRequestStatus;
}
