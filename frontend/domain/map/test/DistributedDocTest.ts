import { Shop } from "../model/Shop";
import { Shopper } from "../model/Shopper";
import { IDistributedDoc } from "../port/IDistributedDoc";

export class DistributedDocTest implements IDistributedDoc {
  private _shops: Shop[] = [];
  private _shoppers: Shopper[] = [];
  private _name: string = "";
  constructor() {}

  async init(name: string) {
    this._name = name;
  }
  findShopperByName(name: string) {
    return this._shoppers.find((shopper) => shopper.name === name);
  }
  allShoppers() {
    return this._shoppers;
  }
  addNewShopper(shopper: Shopper) {
    this._shoppers.push(shopper);
  }

  updateShopper(shopper: Shopper) {
    // Nothing to do since it's in-memory
  }
  addNewShop(shop: Shop) {
    this._shops.push(shop);
  }
}
