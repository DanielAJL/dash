import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { FriendRequestDTO } from '@/DTOs/friendrequest.dto';
import { FriendRequestInterface } from '@/interfaces/friendrequest.interface';
import friendRequestModel from '@/models/friendrequest.model';

class FriendRequestService {
  public friendRequests = friendRequestModel;

  // Query all users that where 'name' field exists and value is not null or an empty string.
  public async findAllFriendRequests(): Promise<FriendRequestInterface[]> {
    const friendRequests: FriendRequestInterface[] = await this.friendRequests.find();
    return friendRequests;
  }

  public async findPendingFriendRequestsById(userId: string, status: string): Promise<FriendRequestInterface[]> {
    if (status == 'pending') {
      const friendRequestsFound: FriendRequestInterface[] = await this.friendRequests.find({ to: userId, status: `${status}` });
      return friendRequestsFound;
    } else {
      const friendRequestsFound: FriendRequestInterface[] = await this.friendRequests.find({
        $or: [{ to: userId }, { from: userId }],
        status: `${status}`,
      });
      return friendRequestsFound;
    }
  }

  public async createFriendRequest(friendRequestData: FriendRequestDTO): Promise<FriendRequestInterface> {
    if (isEmpty(friendRequestData)) throw new HttpException(400, 'friendRequestData is empty');
    const friendRequestCreated: FriendRequestInterface = await this.friendRequests.create(friendRequestData);
    return friendRequestCreated;
  }

  public async patchFriendRequest(friendRequestData: FriendRequestInterface): Promise<FriendRequestInterface> {
    if (isEmpty(friendRequestData)) throw new HttpException(400, 'friendRequestData is empty');
    const friendRequestUpdated: FriendRequestInterface = await this.friendRequests.findByIdAndUpdate(friendRequestData._id, friendRequestData, {
      returnDocument: 'after',
    });
    return friendRequestUpdated;
  }
}

export default FriendRequestService;
