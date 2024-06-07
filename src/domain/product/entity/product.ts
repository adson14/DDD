export default class Product {

  private _id: string;
  private _name: string;
  private _description: string = '';
  private _price: number;

  constructor(id: string, name: string, price: number) {
    this._id = id;
    this._name = name;
    this._price = price;
    this.validate();
  }

  addDescription(description: string) : void {
    this._description = description;
  }

  changeName(name: string) : void {
    this._name = name;
  }

  changeDescription(description: string) : void {
    this._description = description;
  }

  changePrice(price: number) : void {
    this.validate();
    this._price = price;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  get price(): number {
    return this._price;
  }

  validate(): boolean {
    if(this._id.length === 0) {
      throw new Error("Id is required");
    }

    if(this._name.length === 0) {
      throw new Error("Name is required");
    }

    if(this._price <= 0) {
      throw new Error("Price must be greater than zero");
    }

    return true;
  }
}