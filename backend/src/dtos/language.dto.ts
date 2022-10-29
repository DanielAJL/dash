import { IsBoolean, IsString } from 'class-validator';

export class LanguageDTO {
  @IsString()
  public name: string;

  @IsBoolean()
  public isFramework: string;

  @IsBoolean()
  public isDatabase: string;

  @IsString()
  public area: string;

  @IsString()
  public icon: string;
}
