import { LanguageDTO } from "./LanguageDTO";

export class UserDTO {
  _id?: string;
  password?: string;
  email?: string;
  name?: string;
  experienceLevel?: string;
  languages?: Array<LanguageDTO>;
}
