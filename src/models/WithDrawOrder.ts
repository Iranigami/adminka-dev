export default class WithDrawOrder {
  public coin: string;
  public coins: number;
  public satoshi: number;
  public created_at: Date;
  public status: number;

  public constructor(
    coin: string,
    coins: number,
    satoshi: number,
    created_at: Date,
    status: number
  ) {
    this.coin = coin;
    this.coins = coins;
    this.satoshi = satoshi;
    this.created_at = created_at;
    this.status = status;
  }
}
