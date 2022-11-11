import { NextFunction, Request, Response } from 'express';
import userService from '@services/users.service';

// import friendRequestService
import { FriendRequestInterface } from '@/interfaces/friendrequest.interface';
import { FriendRequestDTO } from '@/DTOs/friendrequest.dto';
import FriendRequestService from '@/services/friendrequest.service';

class FriendRequestController {
  public friendRequestService = new FriendRequestService();

  public getFriendRequests = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllFriendRequestsData: FriendRequestInterface[] = await this.friendRequestService.findAllFriendRequests();
      res.status(200).json({ data: findAllFriendRequestsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getPendingFriendRequestsById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const findPendingFriendRequestsByIdData: FriendRequestInterface[] = await this.friendRequestService.findPendingFriendRequestsById(userId);
      res.status(200).json({ data: findPendingFriendRequestsByIdData, message: 'find' });
    } catch (error) {
      next(error);
    }
  };

  public sendFriendRequest = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const friendRequestData: FriendRequestDTO = req.body;
      const friendRequest: FriendRequestInterface = await this.friendRequestService.createFriendRequest(friendRequestData);

      res.status(201).json({ data: friendRequest, message: 'created' });
    } catch (error) {
      next(error);
    }
  };


  public updateFriendRequest = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const friendRequestData: FriendRequestDTO = req.body;
      const friendRequest: FriendRequestInterface = await this.friendRequestService.patchFriendRequest(friendRequestData);

      res.status(201).json({ data: friendRequest, message: 'patched' });
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
