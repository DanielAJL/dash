import { hash } from 'bcrypt';
import { CreateUserDTO, UserDTO } from '@/DTOs/user.dto';
import { HttpException } from '@exceptions/HttpException';
import { User } from '@interfaces/users.interface';
import userModel from '@models/users.model';
import { isEmpty } from '@utils/util';

class UserService {
  public users = userModel;

  // Query all users that where 'name' field exists and value is not null or an empty string.
  public async findAllUser(): Promise<User[]> {
    const users: User[] = await this.users.find().where({ name: { $exists: true, $nin: [null, ''] } });
    return users;
  }

  // Query ONE user by uid/userId/_id.
  public async findUserById(userId: string): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, 'UserId is empty');

    const user: User = await this.users.findOne({ _id: userId });
    if (!user) {
      // throw new HttpException(409, "User doesn't exist");
    }

    return user;
  }

  // CREATE a new user as CreateUserDTO (only email & password).
  public async createUser(userData: CreateUserDTO): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const findUser: User = await this.users.findOne({ email: userData.email });
    if (findUser) throw new HttpException(409, `This email ${userData.email} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: User = await this.users.create({ ...userData, password: hashedPassword });

    return createUserData;
  }

  // UPDATE a new user as UserDTO (as per UserDTO props).
  public async updateUser(userId: string, userData: UserDTO): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const updateUserById: User = await this.users.findByIdAndUpdate(userId, userData, { returnDocument: 'after' });

    if (!updateUserById) throw new HttpException(409, "User doesn't exist");

    return updateUserById;
  }

  public async deleteUser(userId: string): Promise<User> {
    const deleteUserById: User = await this.users.findByIdAndDelete(userId);
    if (!deleteUserById) throw new HttpException(409, "User doesn't exist");

    return deleteUserById;
  }
}

export default UserService;
