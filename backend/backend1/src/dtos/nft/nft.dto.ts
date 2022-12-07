import { IsArray, IsNumber, IsString } from 'class-validator';

export class CreateNftDto {
  @IsString()
  public tokenId: string = '';

  @IsString()
  public creatorAddress: string = '';

  @IsString()
  public ownerAddress: string = '';

  @IsString()
  public title: string = '';

  @IsString()
  public image: string = '';

  @IsString()
  public tokenURI: string = '';

  @IsNumber()
  public price: number = 0.0;

  @IsString()
  public currencyType: string = '';

  @IsNumber()
  public isSale: number = 0;

  @IsString()
  public description: string = '';
}
