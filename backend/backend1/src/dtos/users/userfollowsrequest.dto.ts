export class UserFollowsRequest {
  public id: string;
  public page: number;
  public size: number;

  constructor(id: string, page: number, size: number) {
    this.id = id;
    this.page = page;
    this.size = size;
  }
}
