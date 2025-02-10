import MenuItem from './MenuItem';

export default class Menu {
  private items: MenuItem[] = [];

  public addItem(item: MenuItem): Menu {
    this.items.push(item);

    return this;
  }

  public getItems(): MenuItem[] {
    return this.items;
  }
}
