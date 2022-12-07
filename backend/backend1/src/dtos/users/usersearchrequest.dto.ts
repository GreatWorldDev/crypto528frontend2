export class UserSearchRequest {
  public keyword: string;
  public sortType: string;
  public page: number;
  public size: number;

  constructor(keyword: string, sortType: string, page: number, size: number) {
    this.keyword = keyword || '';
    this.sortType = sortType;
    this.page = page;
    this.size = size;
  }
}
