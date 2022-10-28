import { IsString } from 'class-validator';

export class LanguageDTO {
  @IsString()
  public language: string;
}
