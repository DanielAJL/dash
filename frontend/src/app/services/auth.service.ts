import { Injectable } from '@angular/core';
import { UserDTO } from '../DTO/UserDTO';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private apiService: ApiService) { }

  async login(user: UserDTO) {
    const response = await this.apiService.post('login', user);
    return response.data as UserDTO;
  }

  async logout(user: UserDTO) {
    const response = await this.apiService.post('logout', user);
    return response.data as UserDTO;
  }

  // async createUser() {
  //   const response = await this.apiService.post(`${this.API_PATH}`, user);
  //   return response.data as UserDTO;
  // }

  // async deleteUser(userId: string) {
  //   const response = await this.apiService.delete(`${this.API_PATH}/${userId}`);
  //   return response.data as UserDTO;
  // }

  // async updateUser(userId: string, user: UserDTO) {
  //   const response = await this.apiService.patch(`${this.API_PATH}/${userId}`, user);
  //   return response.data as UserDTO;
  // }

}
