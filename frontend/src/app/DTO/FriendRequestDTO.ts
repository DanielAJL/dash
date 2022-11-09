import { FriendRequestStatus } from "../enums/FriendRequestStatusEnum";

export class FriendRequestDTO {
  _id?: string;
  to?: string;
  from?: string;
  message?: string;
  status?: FriendRequestStatus;
}
