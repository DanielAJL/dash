import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import FriendRequestController from '@/controllers/friendrequest.controller';
import { FriendRequestDTO } from '@/DTOs/friendrequest.dto';
import validationMiddleware from '@middlewares/validation.middleware';

class FriendRequestRoute implements Routes {
  public path = '/api/friendrequests';
  public router = Router();
  public friendRequestController = new FriendRequestController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.friendRequestController.getFriendRequests);
    this.router.get(`${this.path}/:id`, this.friendRequestController.getPendingFriendRequestsById);
    this.router.post(`${this.path}`, this.friendRequestController.sendFriendRequest);
    // this.router.patch(`${this.path}/:id`, validationMiddleware(FriendRequestDTO, 'body', false, true, false), this.usersController.updateUser);
    // this.router.delete(`${this.path}/:id`, this.FriendRequestController.deleteUser);
  }
}

export default FriendRequestRoute;
