export default class Balance {
  key: string;
  value: number;

  constructor(key: string, value: number) {
    this.key = key;
    this.value = value;
  }

  public getKey(): string {
    return this.key;
  }

  public getValue(): number {
    return this.value;
  }
}
