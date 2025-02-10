export default class TransferOrder {
  public id: number;
  public uuid: string;
  public invoice_id?: number;
  public customer_email?: string;
  public address: string;
  public coin: string;
  public coins: number;
  public status: number;
  public created_at: Date;
  public log: string;

  public constructor(data: object) {
    for (const field in data) {
      this[field] = data[field];
    }
  }
}
