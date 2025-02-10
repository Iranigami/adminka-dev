export default class MenuItem {
  public isOpen: boolean;
  public isEnabled: boolean;
  public icon?: string;
  public label: string;
  public children?: MenuItem[];
  public role: number;
}
