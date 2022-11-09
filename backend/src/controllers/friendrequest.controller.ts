import { NextFunction, Request, Response } from 'express';
import userService from '@services/users.service';

// import friendRequestService
import { FriendRequestInterface } from '@/interfaces/friendrequest.interface';
import { FriendRequestDTO } from '@/DTOs/friendrequest.dto';
import FriendRequestService from '@/services/friendrequest.service';

class FriendRequestController {
  public friendRequestService = new FriendRequestService();

  public sendFriendRequest = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const friendRequestData: FriendRequestDTO = req.body;
      const friendRequest: FriendRequestInterface = await this.friendRequestService.createFriendRequest(friendRequestData);

      res.status(201).json({ data: friendRequest, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  // public updateFriendRequestById = async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const userId: string = req.params.id;
  //     const userData: UserDTO = req.body;
  //     const updateUserData: User = await this.userService.updateUser(userId, userData);

  //     res.status(200).json({ data: updateUserData, message: 'updated' });
  //   } catch (error) {
  //     next(error);
  //   }
  // };

  // public deleteFriendRequestById = async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const userId: string = req.params.id;
  //     const deleteUserData: User = await this.userService.deleteUser(userId);

  //     res.status(200).json({ data: deleteUserData, message: 'deleted' });
  //   } catch (error) {
  //     next(error);
  //   }
  // };
}

export default FriendRequestController;
