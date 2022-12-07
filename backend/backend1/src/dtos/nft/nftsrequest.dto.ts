export class NFTsRequestDto {
  public userId: string;
  public page: number;
  public size: number;

  constructor(userId: string, page: number, size: number) {
    this.userId = userId;
    this.page = page;
    this.size = size;
  }
}
