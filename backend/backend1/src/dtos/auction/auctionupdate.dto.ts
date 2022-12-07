import { IsNumber, IsString } from 'class-validator';

export class UpdateAuctionDto {
  @IsString()
  public tokenId: string = '';

  @IsString()
  public creatorAddress: string = '';

  @IsString()
  public type: string = '';

  @IsNumber()
  public amount: number = 0;

  @IsString()
  public status: string = '';

  @IsNumber()
  public duration: number = 0;

  @IsString()
  public transaction: string = '';
}
