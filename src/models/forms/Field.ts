import EInputTypes from './EInputTypes';
import Option from './Option';

export default class Field {
  private _label: string;
  private _key: string;
  private _type: string = EInputTypes.TEXT;
  private _placeholder?: string;
  private _min?: number;
  private _max?: number;
  private _isNullable: boolean = true;
  private _options?: Option[];
  private _step?: number;
  private _isRequired: boolean = true;
  private _isDisabled: boolean = false;
  private _dataHandlerFn?: (data: object) => string|number|object;
  private _isArea: boolean;

  public static New(): Field {
    return new Field();
  }

  public setDataHandler(_handlerFn: (data: object) => string|number|object): Field {
    this._dataHandlerFn = _handlerFn;

    return this;
  }

  public getDataHandler() {
    return this._dataHandlerFn;
  }

  public setIsArea(disabled: boolean): Field {
    this._isArea = disabled;

    return this;
  }

  public isArea(): boolean {
    return this._isArea;
  }

  public setDisabled(disabled: boolean): Field {
    this._isDisabled = disabled;

    return this;
  }

  public isDisabled(): boolean {
    return this._isDisabled;
  }

  public setOptions(options: Option[]): Field {
    this._options = options;

    return this;
  }

  public setRequired(_required: boolean): Field {
    this._isRequired = _required;

    return this;
  }

  public isRequired(): boolean {
    return this._isRequired;
  }

  public setStep(step: number): Field {
    this._step = step;

    return this;
  }

  public getStep(): number|undefined {
    return this._step;
  }

  public getOptions(): Option[] {
    return this._options || [];
  }

  public setLabel(label: string): Field {
    this._label = label;

    return this;
  }

  public getLabel(): string {
    return this._label;
  }

  public setNullable(isNullable: boolean): Field {
    this._isNullable = isNullable;

    return this;
  }

  public isNullable(): boolean {
    return this._isNullable;
  }

  public setRange(min?: number, max?: number): Field {
    this._min = min;
    this._max = max;

    return this;
  }

  public getMin(): number|undefined {
    return this._min;
  }

  public getMax(): number|undefined {
    return this._max;
  }

  public setKey(key: string): Field {
    this._key = key;

    return this;
  }

  public getKey(): string {
    return this._key;
  }

  public setType(type: string): Field {
    this._type = type;

    return this;
  }

  public getType(): string {
    return this._type;
  }

  public setPlaceholder(v?: string): Field {
    this._placeholder = v;

    return this;
  }

  public getPlaceholder(): string|null|undefined {
    return this._placeholder;
  }
}
