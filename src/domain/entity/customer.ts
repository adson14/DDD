//Entidade anêmica

import Address from "./address";

//Uma entidade sempre deve se autovalidar

export default class Customer {
  private _id: string;
  private _name: string;
  private _address!: Address;
  private _active: boolean = false;
  private _rewardPoints: number = 0;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
    this.validate();
  }

  get name(): string {
    return this._name;
  }

  get rewardPoints(): number {
    return this._rewardPoints;
  }

  get id(): string {
    return this._id;
  }

  validate() {

    if(this._name.length === 0) {
      throw new Error("Name is required");
    }
    if(this._id.length === 0) {
      throw new Error("ID is required");
    }
  }

  
  changeName(name: string) {
    this._name = name;
    this.validate();
  }
  

  activate() {
    if(this._address === undefined) {
      throw new Error("Address is required");
    }
    this._active = true;
  }

  isActive() {
    return this._active;
  }

  deactivate() {
    this._active = false;
  }

  addAddress(adress: Address){
    this._address = adress;
  }

  addPints(points: number) {
    this._rewardPoints += points;
  }
}
