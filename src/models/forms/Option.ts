export default class Option {
  public value: string|number;
  public label: string;

  public constructor(value: string|number, label: string) {
    this.value = value;
    this.label = label;
  }
}