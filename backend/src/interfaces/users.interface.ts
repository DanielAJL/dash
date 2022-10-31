import { LanguageDTO } from '@/DTOs/language.dto';
import { NetworkDTO } from '@/DTOs/network.dto';

export interface User {
  _id: string;
  email: string;
  password: string;
  name: string;
  experienceLevel: string;
  languages: Array<LanguageDTO>;
  network: Array<NetworkDTO>;
}
