import { Injectable } from '@angular/core';
import { FriendRequestDTO } from '../DTO/FriendRequestDTO';
import { FriendRequestStatus } from '../enums/FriendRequestStatusEnum';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class FriendRequestService {
  private API_PATH = 'friendrequests';

  constructor(private apiService: ApiService) { }

  async getFriendRequests() {
    const response = await this.apiService.get(this.API_PATH)
    return response.data as FriendRequestDTO[];
  }

  async getFriendRequestForUser(userId: string) {
    const response = await this.apiService.get(`${this.API_PATH}/${userId}`).then(res => {
      if (res)
        return res.data as FriendRequestDTO[];
      return [];
    }).catch((err) => {
      console.log(err);
      return err;

    });
    return response as FriendRequestDTO[];
  }

  async sendFriendRequest(toUserId: string, fromUserId: string, message?: string) {
    const friendRequest = new FriendRequestDTO();
    friendRequest.to = toUserId;
    friendRequest.from = fromUserId;
    friendRequest.status = FriendRequestStatus.Pending;
    if (message)
      friendRequest.message = message;
    const response = await this.apiService.post(`${this.API_PATH}`, friendRequest);
    return response.data as FriendRequestDTO;
  }

  // async deleteUser(userId: string) {
  //   const response = await this.apiService.delete(`${this.API_PATH}/${userId}`);
  //   return response.data as UserDTO;
  // }

  // async updateUser(userId: string, user: UserDTO) {
  //   const response = await this.apiService.patch(`${this.API_PATH}/${userId}`, user);
  //   return response.data as UserDTO;
  // }

}
