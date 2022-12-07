export class NFTSearchRequestDto {
  public sortType: string;
  public page: number;
  public size: number;
  public keyword?: string;
  public category?: string;
  public isSale?: number;
  public minPrice?: number;
  public maxPrice?: number;

  constructor(
    sortType: string,
    page: number,
    size: number,
    keyword?: string,
    category?: string,
    isSale?: number,
    minPrice?: number,
    maxPrice?: number,
  ) {
    this.sortType = sortType;
    this.page = page;
    this.size = size;
    this.keyword = keyword;
    this.category = category;
    this.isSale = isSale;
    this.minPrice = minPrice;
    this.maxPrice = maxPrice;
  }
}
