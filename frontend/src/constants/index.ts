import { LanguageDTO } from "src/app/DTO/LanguageDTO";

export const STATUS_OK = 'OK';
export const STATUS_ERROR = 'error';

export const GET = 'GET';
export const POST = 'POST';
export const DELETE = 'DELETE';
export const PUT = 'PUT';
export const PATCH = 'PATCH';

export class INVITATION_STATUS {
  pending: 'pending';
  accepted: 'accepted';
  denied: 'denied';
};

export const EXPERIENCES: Array<string> = ["BEGINNER", "JUNIOR", "MEDIOR", "SENIOR"];
export const LANGUAGES: Array<LanguageDTO> = [
  {
    name: "JavaScript", // name of the language/framework
    isFramework: false,
    isDatabase: false,
    area: "Front-end", // front-end / back-end
    icon: "devicon-javascript-plain colored", // src should come from `assets` folder OR dev-icons (uses `i` element with class): https://devicon.dev/
  },
  {
    name: "TypeScript",
    isFramework: false,
    isDatabase: false,
    area: "Front-end",
    icon: "devicon-typescript-plain colored",
  },
  {
    name: "C",
    isFramework: false,
    isDatabase: false,
    area: "Back-end",
    icon: "devicon-c-plain colored",
  },
  {
    name: "C#",
    isFramework: false,
    isDatabase: false,
    area: "Back-end",
    icon: "devicon-csharp-plain colored",
  },
  {
    name: "Python",
    isFramework: false,
    isDatabase: false,
    area: "Back-end",
    icon: "devicon-python-plain colored",
  },

];
