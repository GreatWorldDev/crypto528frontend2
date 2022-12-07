import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateAuctionDto {
  @IsString()
  public tokenId: string = '';

  @IsString()
  public creatorAddress: string = '';

  @IsString()
  public type: string = '';

  @IsNumber()
  public length: number = 0;

  @IsDate()
  public startTime: Date = new Date();

  @IsNumber()
  public currentPrice: number = 0;
}
