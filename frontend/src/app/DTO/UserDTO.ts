import { LanguageDTO } from "./LanguageDTO";
import { NetworkDTO } from "./NetworkDTO";

export class UserDTO {
  _id?: string;
  password?: string;
  email?: string;
  name?: string;
  experienceLevel?: string;
  languages?: Array<LanguageDTO>;
  network?: Array<NetworkDTO>;
}
