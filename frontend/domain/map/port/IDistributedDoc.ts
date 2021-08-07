// Interface to connect to a shared-type lib, like Yjs

import { Shop } from "../model/Shop";
import { Shopper } from "../model/Shopper";

// Distributed doc contains plain Javascript objects.
// It has no clue about the meaning of theses objects
export interface IDistributedDoc {
  init: (name: string) => void;
  findShopperByName: (name: string) => Shopper | undefined;
  allShoppers: () => Shopper[];
  addNewShopper: (shopper: Shopper) => void;
  updateShopper: (shopper: Shopper) => void;
  addNewShop: (shop: Shop) => void;
}
