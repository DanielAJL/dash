import { IsArray, IsString } from 'class-validator';

export class NetworkDTO {
  @IsString()
  public userId: string;

  @IsString()
  public name: string;

  @IsString()
  public experienceLevel: string;

  @IsArray()
  public category: Array<string>;
}
