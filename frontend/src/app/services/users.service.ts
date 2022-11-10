import { Injectable } from '@angular/core';
import { CreateUserDTO } from '../DTO/CreateUserDTO';
import { UserDTO } from '../DTO/UserDTO';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private API_PATH = 'users';

  constructor(private apiService: ApiService) { }

  async getUsers() {
    const response = await this.apiService.get(this.API_PATH)
    return response.data as UserDTO[];
  }

  async getUser(userId: string) {
    const response = await this.apiService.get(`${this.API_PATH}/${userId}`).then(res => {
      if (res)
        return res.data;

    }).catch((err) => {
      console.log(err);
      return err;

    });
    return response as UserDTO;
  }

  async getUsersByMultipleIds(userIds: Array<string>) {
    const response = await this.apiService.post(`${this.API_PATH}/friendrequests-pending`, userIds).then(res => {
      if (res)
        return res.data;

    }).catch((err) => {
      console.log(err);
      return err;

    });
    return response as UserDTO[];
  }

  async createUser(user: CreateUserDTO) {
    const response = await this.apiService.post(`${this.API_PATH}`, user);
    return response.data as CreateUserDTO;
  }

  async deleteUser(userId: string) {
    const response = await this.apiService.delete(`${this.API_PATH}/${userId}`);
    return response.data as UserDTO;
  }

  async updateUser(userId: string, user: UserDTO) {
    const response = await this.apiService.patch(`${this.API_PATH}/${userId}`, user);
    return response.data as UserDTO;
  }

}
