export class NFTTagRequestDto {
  public id: string;
  public tags: string[];

  constructor(id: string, tags: string[]) {
    this.id = id;
    this.tags = tags;
  }
}
