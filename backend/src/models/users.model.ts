import { model, Schema, Document } from 'mongoose';
import { User } from '@interfaces/users.interface';
import { LanguageDTO } from '@/DTOs/language.dto';
import { NetworkDTO } from '@/DTOs/network.dto';

const userSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: false,
  },
  experienceLevel: {
    type: String,
    required: false,
  },
  languages: {
    type: Array<LanguageDTO>,
    required: false,
  },
  network: {
    type: Array<NetworkDTO>,
    required: false,
  },
});

const userModel = model<User & Document>('User', userSchema);

export default userModel;
