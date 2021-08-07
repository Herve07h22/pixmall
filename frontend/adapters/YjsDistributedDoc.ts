import { Shop } from "../domain/map/model/Shop";
import { Shopper } from "../domain/map/model/Shopper";
import { IDistributedDoc } from "../domain/map/port/IDistributedDoc";

import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";

export class YjsDistributedDoc implements IDistributedDoc {
  private _doc: Y.Doc = new Y.Doc();
  private _connected: boolean = false;
  constructor() {}
  init(name: string) {
    const host = process.env.PIXMALL_HOST || "localhost";
    const wsProvider = new WebsocketProvider(
      `ws://${host}:1234`,
      name,
      this._doc
    );
    wsProvider.on("status", (event: any) => {
      console.log(event.status); // logs "connected" or "disconnected"
      this._connected = event && event.status && event.status === "connected";
    });
  }
  findShopperByName(name: string) {
    if (!this._connected) return undefined;
    const shoppers = this._doc.getMap("shoppers");
    return shoppers.get(name);
  }

  allShoppers() {
    if (!this._connected) return [];
    const shoppers = this._doc.getMap("shoppers");
    return [...shoppers.values()];
  }

  addNewShopper(shopper: Shopper) {
    if (!this._connected) return [];
    const shoppers = this._doc.getMap("shoppers");
    shoppers.set(shopper.name, shopper);
  }

  updateShopper(shopper: Shopper) {
    if (!this._connected) return [];
    const shoppers = this._doc.getMap("shoppers");
    shoppers.set(shopper.name, shopper);
  }

  addNewShop(shop: Shop) {
    if (!this._connected) return [];
    const shops = this._doc.getMap("shops");
    shops.set(shop.name, shop);
  }
}
