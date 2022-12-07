export class AuctionUpdateRequest {
  public tokenId: string;
  public address: string;
  public type: string;
  public amount: number;
  public status: string;

  constructor(tokenId: string, address: string, type: string, amount: number, status: string) {
    this.tokenId = tokenId;
    this.address = address;
    this.type = type;
    this.amount = amount;
    this.status = status;
  }
}
