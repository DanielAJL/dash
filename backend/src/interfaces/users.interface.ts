import { LanguageDTO } from '@/DTOs/language.dto';

export interface User {
  _id: string;
  email: string;
  password: string;
  name: string;
  experienceLevel: string;
  languages: Array<LanguageDTO>;
  online: boolean;
}
