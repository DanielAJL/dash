import { model, Schema, Document } from 'mongoose';
import { FriendRequestInterface } from '@interfaces/friendrequest.interface';
import { FriendRequestStatus } from '@/enums/enumFriendRequest';

const friendRequestSchema: Schema = new Schema({
  to: {
    type: String,
    required: true,
    unique: true,
  },
  from: {
    type: String,
    required: true,
    unique: true,
  },
  message: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    enum: FriendRequestStatus,
    required: true,
  },
});

const friendRequestModel = model<FriendRequestInterface & Document>('FriendRequest', friendRequestSchema);

export default friendRequestModel;
