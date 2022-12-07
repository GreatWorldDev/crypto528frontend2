import { IsString } from 'class-validator';

export class Trait {
  @IsString()
  public key: string = '';

  @IsString()
  public value: string = '';
}
