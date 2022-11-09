import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { FriendRequestDTO } from '@/DTOs/friendrequest.dto';
import { FriendRequestInterface } from '@/interfaces/friendrequest.interface';
import friendRequestModel from '@/models/friendrequest.model';

class FriendRequestService {
  public friendRequests = friendRequestModel;

  public async createFriendRequest(friendRequestData: FriendRequestDTO): Promise<FriendRequestInterface> {
    // if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const friendRequest: FriendRequestInterface = await this.friendRequests.findOne({ to: friendRequestData.to });
    // if(friendRequest)
    // found one already ..

    const friendRequestCreated: FriendRequestInterface = await this.friendRequests.create(friendRequestData);

    return friendRequestCreated;
  }
}

export default FriendRequestService;
