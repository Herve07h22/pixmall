import { Shop } from "../model/Shop";

export interface IMallRepository {
  getShops: (mallId: string) => Promise<Shop[]>;
  saveShop: (mallId: string, shop: Shop) => Promise<Shop[]>;
}
