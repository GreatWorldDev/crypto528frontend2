import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  public address: string = '';

  @IsString()
  public token: string = '';

  @IsString()
  public signature: string = '';
}
