export class AuctionSearchRequest {
  public keyword: string;
  public filter: string;
  public sortType: string;
  public page: number;
  public size: number;

  constructor(keyword: string, filter: string, sortType: string, page: number, size: number) {
    this.keyword = keyword;
    this.filter = filter;
    this.sortType = sortType;
    this.page = page;
    this.size = size;
  }
}
